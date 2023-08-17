//Librery components
import { useDispatch, useSelector } from "react-redux";
//Actions
import { orderDogs, filterByTemper, filterByOrigin } from "../../../redux/actions";
//style
import style from './SideBar.module.css'


const SideBar = ({setCurrentPage}) =>{


    const dispatch = useDispatch();
    const temperament = useSelector((state) => state.temperament)
    const order = useSelector((state) => state.orderAndFilter.order)
    const tempFilter = useSelector((state) => state.orderAndFilter.tempFilter)
    const originFilter = useSelector((state) => state.orderAndFilter.originFilter)

    const handleOrder = (event) =>{
        setCurrentPage(1)
        dispatch(orderDogs(event.target.value))
    }
    const handleFilterByTemp = (event) =>{
        setCurrentPage(1)
        dispatch(filterByTemper(event.target.value))
    }
    const handleFilterByOrigin = (event) =>{
        setCurrentPage(1)
        dispatch(filterByOrigin(event.target.value))
    }

    return (
        <div className={style.sideBarBox}>
            <select name="order" value={order} onChange={handleOrder}>
                    <option value="A">A-Z</option>
                    <option value="D">Z-A</option>
                    <option value="maxWeight">Mas Pesados</option>
                    <option value="minWeight">Menos pesados</option>
                </select>
                <select name="filterTemp" value={tempFilter} onChange={handleFilterByTemp}>
                    <option value="All">All</option>
                    {temperament.map((temp) => {
                        return (
                            <option value={temp.nombre} key={temp.id}>{temp.nombre}</option>
                        )
                    })}
                </select> 
                <select name="filterOrigin" value={originFilter} onChange={handleFilterByOrigin}>
                    <option value="all">All</option>
                    <option value="real">Real</option>
                    <option value="created">Created</option>
                </select> 
        </div>
    )
}

export default SideBar