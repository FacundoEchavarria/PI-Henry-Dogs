//Styles
import styles from './Card.module.css'
//Library components
import React from "react"
import { NavLink } from 'react-router-dom'

const Card = ({id, name, weight, image, temperament}) => {


    return (
        <div className={styles.card}>
            <h2>{name}</h2>
            <h2>Peso: {weight}</h2>
            <h2>temperamento: {temperament}</h2>
            <img src={image} alt={`imagen del ${name}`}/>
            {image ?
            <NavLink to={`/detail/${id}`}> <button>info</button></NavLink>
            :
            <p>No hay mas info de este perro</p>
            }
            
        </div>
    )
}

export default Card