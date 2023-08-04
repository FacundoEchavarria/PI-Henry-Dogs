//Styles
import styles from './Card.module.css'
//Library components
import React from "react"
import { NavLink } from 'react-router-dom'

const Card = ({id, name, weight, image, temperament}) => {


    return (
        <div className={styles.card}>
            <div className={styles.infoCard}>
                <h2>Weight: {weight}</h2>
                <h2>Temperament: {temperament}</h2>
                {image ?
                <NavLink to={`/detail/${id}`}> <button>info</button></NavLink>
                :
                <p>No hay mas info de este perro</p>
            }
            </div>
            <div className={styles.cardImg}>
                <img src={image} alt={`imagen del ${name}`}/>
                <h2>{name}</h2>
            </div>
        </div>
    )
}

export default Card