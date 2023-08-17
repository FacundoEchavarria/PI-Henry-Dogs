//Styles
import styles from './Card.module.css'
//Library components
import React, { useEffect, useState } from "react"
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { addFav, deleteFav } from '../../../../redux/actions';

const Card = ({id, name, weight, image, temperament}) => {

    const [isFav, setIsFav] = useState(false);
    const dispatch = useDispatch();
    const favorites = useSelector(state => state.favorites);

    temperament = temperament?.split(', ');

    useEffect(() => {
        favorites.forEach((fav) => {
            if (fav.id === id) {
            setIsFav(true);
            }
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [favorites])
    
    const handleFavorite = (dog) => {
        if(isFav) {
            setIsFav(false);
            dispatch(deleteFav(id))
        } 
        else {
            setIsFav(true);
            dispatch(addFav({
                id: id, 
                name: name, 
                imagen: image, 
                peso: weight, 
                temperament: temperament?.length > 0 ? temperament.join(', ') : 'unkown',
            }))
        } 
    }
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
                {isFav ? 
                <button onClick={handleFavorite} className={styles.favButton}>💛</button>
                :
                <button onClick={handleFavorite} className={styles.favButton}>🤍</button>
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