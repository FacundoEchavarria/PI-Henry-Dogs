//Library components
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { editDog } from "../../../redux/actions";
import Styles from './EditList.module.css'



const EditList = () => {

    const [createdDogs, setCreatedDogs] = useState([]);
    const [aux, setAux] = useState(false);
    const dispatch = useDispatch()

    useEffect(() => {
        const axiosGetCreated = async() => {
            let {data} = await axios(`http://localhost:3001/dogs/created`);
            setCreatedDogs(data)
        }
        axiosGetCreated();
    }, [aux]);

    const handleDelete = async(id) => {
        await axios.delete(`http://localhost:3001/dogs/${id}`)
        setCreatedDogs(createdDogs.filter(dog => dog.id !== id))
    }

    const handleRecharge = () => {
        setAux(!aux)
    }

    const handleEdit = (dog) =>{
        dispatch(editDog(dog))
    }

    return (
        <div>
            <div className={Styles.table}>
                <div className={Styles.tableIndex}>
                    <p>Name</p>
                    <p>weight</p>
                    <p>Height</p>
                    <p>Life Span</p>
                    <p>Edit</p>
                    <p>Delete</p>
                    <button onClick={handleRecharge}>Re</button>
                </div>
            {createdDogs.length > 0 ?
                createdDogs.map((elem) => (
                    <div key={elem.id} className={Styles.tableInfo}>
                        <p>{elem.name}</p>
                        <p>{elem.peso}</p>
                        <p>{elem.altura}</p>
                        <p>{elem.life_span}</p>
                        <div>
                            <NavLink to={'/edit'}><button onClick={() => handleEdit(elem)}>editar</button></NavLink>
                        </div>
                        <div>
                            <button onClick={() => handleDelete(elem.id)}>eliminar</button>
                        </div>
                    </div>
                ))
                :
                null
                }
            </div>
            <hr />
            
        </div>
    )
}

export default EditList