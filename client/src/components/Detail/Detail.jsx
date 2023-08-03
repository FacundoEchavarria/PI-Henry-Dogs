//Styles
import { useState } from 'react';
import axios from 'axios'
import styles from './Home.module.css'
//Components
import Cards from '../Home/Cards/Cards';



const Detail = () =>{
    let response = {}
    const [dogs, setDogs] = useState([])
    const handleClick = async() =>{
        const {data} = await axios("http://localhost:3001/dogs/1")
        response = data
        if(response?.reference_image_id){
            let image = await axios(`https://api.thedogapi.com/v1/images/${response.reference_image_id}`)
            image = image.data
            response.imagen = image?.url
            console.log(response);
        }
        setDogs([...dogs, response])
    }

    return (
        <div>
            <h1>Home</h1>
            <button onClick={handleClick}>hola</button>
            <Cards
            dogs = {dogs}
            numItems = {8}
            />
        </div>
    )
}

export default Detail;