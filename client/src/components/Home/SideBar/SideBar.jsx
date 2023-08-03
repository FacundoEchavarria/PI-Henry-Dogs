//Librery components
import { useDispatch, useSelector } from "react-redux";
//Actions
import { orderDogs, filterByTemper } from "../../../redux/actions";


const SideBar = () =>{


    const dispatch = useDispatch();
    const temperament = useSelector((state) => state.temperament)
    const order = useSelector((state) => state.orderAndFilter.order)
    const filter = useSelector((state) => state.orderAndFilter.filter)

    const handleOrder = (event) =>{
        dispatch(orderDogs(event.target.value))
    }
    const handleFilterByTemp = (event) =>{
        dispatch(filterByTemper(event.target.value))
    }

    return (
        <div>
            <select name="order" value={order} onChange={handleOrder}>
                    <option value="A">A-Z</option>
                    <option value="D">Z-A</option>
                    <option value="maxWeight">Mas Pesados</option>
                    <option value="minWeight">Menos pesados</option>
                </select>

                <select name="filterTemp" value={filter} onChange={handleFilterByTemp}>
                    <option value="All">All</option>
                    {temperament.map((temp) => {
                        return (
                            <option value={temp.nombre} key={temp.id}>{temp.nombre}</option>
                        )
                    })}
                </select> 
        </div>
    )
}

export default SideBar