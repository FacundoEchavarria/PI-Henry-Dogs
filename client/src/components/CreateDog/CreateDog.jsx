//Library components
import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const CreateDog = () => {

    const temperament = useSelector((state) => state.temperament)

    const [newDog, setNewDog] = useState({
        name: '',
        imagen: '',
        altura_1: '',
        altura_2: '',
        peso_1: '',
        peso_2: '',
        life_span_1: '',
        life_span_2: '',
        temperament: [],
    })

    
    const handleChange = (event) => {
        setNewDog({
            ...newDog,
            [event.target.name]: event.target.value
        })
    }
    const handleTemp = (event) => {
        let inputValue =  event.target.value
        let checked =  event.target.checked

        if(!checked) setNewDog({
            ...newDog,
            temperament: newDog.temperament.filter(temp => temp !== inputValue)
        })
        else setNewDog({
            ...newDog,
            temperament:[...newDog.temperament, inputValue]
        })

    }
    const handleSubmit = async(event) =>{
        event.preventDefault();
        let postDog = {
            name: newDog.name,
            imagen: newDog.imagen,
            peso: `${newDog.peso_1} - ${newDog.peso_2}`,
            altura: `${newDog.altura_1} - ${newDog.altura_2}`,
            life_span: `${newDog.life_span_1} - ${newDog.life_span_2} years`,
            temperament: newDog.temperament.join(', '),
        }
        await axios.post('http://localhost:3001/dogs/', postDog)
    }


    return (
        <div>
            <form>
                <div>
                    <label>Name:</label>
                    <input
                    key= '1'
                    type="text"
                    name="name"
                    placeholder="Enter the dog´s name"
                    value={newDog.name}
                    onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Weight:</label>
                    <input
                    key= '2'
                    type="number"
                    name="peso_1"
                    placeholder="Enter the dog´s min weight"
                    value={newDog.peso_1}
                    onChange={handleChange}
                    />
                    <input
                    key= '3'
                    type="number"
                    name="peso_2"
                    placeholder="Enter the dog´s max weight"
                    value={newDog.peso_2}
                    onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Height:</label>
                    <input
                    key= '4'
                    type="number"
                    name="altura_1"
                    placeholder="Enter the dog´s min height"
                    value={newDog.altura_1}
                    onChange={handleChange}
                    />
                    <input
                    key= '5'
                    type="number"
                    name="altura_2"
                    placeholder="Enter the dog´s max height"
                    value={newDog.altura_2}
                    onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Life span:</label>
                    <input
                    key= '6'
                    type="number"
                    name="life_span_1"
                    placeholder="Enter the dog´s min life span"
                    value={newDog.life_span_1}
                    onChange={handleChange}
                    />
                    <input
                    key= '7'
                    type="number"
                    name="life_span_2"
                    placeholder="Enter the dog´s max life span"
                    value={newDog.life_span_2}
                    onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Image:</label>
                    <input
                    key= '8'
                    type="text"
                    name="imagen"
                    placeholder="Enter the dog´s image url"
                    value={newDog.imagen}
                    onChange={handleChange}
                    />
                </div>
                <div>
                    <label>temperament:</label>
                    {temperament.map((temp) => (
                        <div key={temp.id}>
                            <label>{temp.nombre}</label>
                            <input
                            
                            type="checkbox"
                            name={temp.nombre}
                            value={temp.nombre}
                            onChange={handleTemp}
                            />
                        </div>
                    ))}
                <input type="submit" value='Create' onClick={handleSubmit}/>
                </div>
            </form>
        </div>
    )
}

export default CreateDog;