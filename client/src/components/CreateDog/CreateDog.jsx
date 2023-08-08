//Library components
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
//stles
import Styles from './CreateDog.module.css'
//Validation
import validation from "./validations";



const CreateDog = ({dog}) => {

    //Trae el estado global donde estan todos los temperamentos
    const temperament = useSelector((state) => state.temperament)

    //Creo los estados locales donde voy a gguardar lo que escribo en los forms y los errores de los mismos
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
    const [errors, setErrors] = useState({})

    const ChargeDogToEdit = () => {
        if (dog) {

            let height = dog.altura.split('-')
            let weight = dog.peso.split('-')
            let life_span = dog.life_span.split('-')
            let temperaments = dog.temperament.split(', ')
            
            const checkboxes = document.querySelectorAll("input[type='checkbox']");
            checkboxes.forEach((checkbox) => {
                if(temperaments.includes(checkbox.name)){
                    checkbox.checked = true;
                }
            });

            let dogToEdit = {
                name: dog.name,
                imagen: dog.imagen,
                altura_1: parseInt(height[0]),
                altura_2: parseInt(height[1]),
                peso_1: parseInt(weight[0]),
                peso_2: parseInt(weight[1]),
                life_span_1: parseInt(life_span[0]),
                life_span_2: parseInt(life_span[1]),
                temperament: dog.temperament.split(', '),
            }
            
            setNewDog(dogToEdit)
        }
    }
    
    useEffect(() => {
        ChargeDogToEdit()
    }, [])


    //La funcion que se ejecuta cada vez que cambio algo de los estados
    const handleChange = (event) => {
        setNewDog({
            ...newDog,
            [event.target.name]: event.target.value
        })
        setErrors(validation({...newDog, [event.target.name]: event.target.value}))
    }
    //la funcion que se encarga de la logica de los temperamentos en los checkboxs
    const handleTemp = (event) => {
        let inputValue =  event.target.value
        let checked =  event.target.checked

        if(!checked) {
            setNewDog({
                ...newDog,
                temperament: newDog.temperament.filter(temp => temp !== inputValue)
            })
            setErrors(validation({...newDog, temperament: newDog.temperament.filter(temp => temp !== inputValue)}))
        }
        else {
            setNewDog({
                ...newDog,
                temperament:[...newDog.temperament, inputValue]
            })
            setErrors(validation({...newDog, temperament:[...newDog.temperament, inputValue]}))
        }
    }
    
    const clearCheckboxes = () => {
        const checkboxes = document.querySelectorAll("input[type='checkbox']");
        checkboxes.forEach((checkbox) => {
            checkbox.checked = false;
        });
    };

    //la funcion que ttiene la logica cada vez que hago un submit
    const handleSubmit = async(event) =>{
        event.preventDefault();
        
        errors.incomplete === undefined ? errors.incomplete = true : errors.incomplete = errors.incomplete

        if(!errors.incomplete && Object.keys(errors).length === 1) {

            let postDog = {
            name: newDog.name,
            imagen: newDog.imagen,
            peso: `${newDog.peso_1} - ${newDog.peso_2}`,
            altura: `${newDog.altura_1} - ${newDog.altura_2}`,
            life_span: `${newDog.life_span_1} - ${newDog.life_span_2} years`,
            temperament: newDog.temperament.join(', '),
        }
        
            await axios.post('http://localhost:3001/dogs/', postDog)
            setNewDog({
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
            clearCheckboxes()
            window.scrollTo({
                top:0,
                behavior:'smooth'
            })
        }
        else alert('Faltan datos') 
    }


    return (
        <div className={Styles.createDogBox}>
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
                    {errors.name ? <p>{errors.name}</p> : null}
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
                    {errors.peso ? <p>{errors.peso}</p> : null}
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
                    {errors.altura ? <p>{errors.altura}</p> : null}
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
                    {errors.life_span ? <p>{errors.life_span}</p> : null}
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
                    {errors.imagen ? <p>{errors.imagen}</p> : null}
                </div>
                <div>
                    <label>temperament:</label>
                    {temperament.map((temp) => (
                        <div key={temp.id}>
                            <label>{temp.nombre}</label>
                            <input
                            type="checkbox"
                            name={temp.nombre}
                            value={temp.id}
                            onChange={handleTemp}
                            />
                        </div>
                    ))}
                    {errors.temperament ? <p>{errors.temperament}</p> : null}
                </div>
                <input type="submit" value='Create' onClick={handleSubmit}/>
            </form>
        </div>
    )
}

export default CreateDog;