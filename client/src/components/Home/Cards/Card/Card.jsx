//Styles
import styles from './Card.module.css'
//Library components
import React from "react"
import { NavLink } from 'react-router-dom'

const Card = ({id, name, weight, image, temperament}) => {

    temperament = temperament?.split(', ')

    return (
        <div className={styles.card}>
            <div className={styles.infoCard}>
                <p>Weight: </p>
                <p>{weight} Kg</p>
                <p>Temperament: </p>
                {temperament?.length > 0 ?
                <ul>
                    {temperament.map((temp, index) => (
                        <li key={index}>{temp}</li>
                    ))}
                </ul>
                :
                <p>Unknown</p>
                }
                {image ?
                <NavLink to={`/detail/${id}`} className={styles.navLink}> <button>More info</button></NavLink>
                :
                <p className={styles.navLink}>No hay mas info de este perro</p>
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