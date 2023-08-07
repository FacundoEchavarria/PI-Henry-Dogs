//Library componets
import React, { useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import searchIcon from '../../../multimedia/searchIcon.svg'
//Actions
import { filterByTemper, orderDogs, searchDog } from "../../../redux/actions"
//styles
import styles from './SearchBar.module.css'


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
        <div className={styles.searchBarBox}>
            <input type='search' value={searchValue} onChange={handleChange} className={styles.searchBar} placeholder="Search"/>
            <button onClick={handleClick} className={styles.searchBarButton}><img src={searchIcon} alt='logo'/></button>
        </div>
    )
}

export default SearchBar