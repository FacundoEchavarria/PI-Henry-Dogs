//Library components
import axios from "axios";
import React, { useEffect, useState } from "react";


const EditList = () => {

    const [createdDogs, setCreatedDogs] = useState([]);
    const [aux, setAux] = useState(false);

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

    return (
        <div>
            <div>
                <div>
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
                    <div key={elem.id}>
                        <p>{elem.name}</p>
                        <p>{elem.peso}</p>
                        <p>{elem.altura}</p>
                        <p>{elem.life_span}</p>
                        <div>
                            <button>editar</button>
                        </div>
                        <div>
                            <button onClick={() => handleDelete(elem.id)}>eliminar</button>
                        </div>
                    </div>
                ))
                :
                null
                }
                <div>a</div>
            </div>
            
        </div>
    )
}

export default EditList