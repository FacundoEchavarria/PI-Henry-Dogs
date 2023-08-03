//Library componets
import React, { useState } from "react"
import { useDispatch, useSelector } from 'react-redux'

import { filterByTemper, orderDogs, searchDog } from "../../../redux/actions"


const SearchBar = ({setCurrentPage, setLoading}) => {

    const [searchValue, setSearchValue] = useState('')
    const dispatch = useDispatch();
    const order = useSelector((state) => state.orderAndFilter.order)

    const handleChange = (event) =>{
        setSearchValue(event.target.value)
    }
    const handleClick = async(event) =>{
        setLoading(true)
        await dispatch(searchDog(searchValue))
        setCurrentPage(1)
        dispatch(orderDogs(order))
        dispatch(filterByTemper('All'))
        setLoading(false)
    }

    return (
        <div>
            <input type='search' value={searchValue} onChange={handleChange}/>
            <button onClick={handleClick}>Buscar</button>
        </div>
    )
}

export default SearchBar