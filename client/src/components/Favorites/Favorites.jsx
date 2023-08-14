//Coomponents
import Cards from '../Home/Cards/Cards'
import Pagination from '../Home/Pagination/Pagination';
//Library components
import React, { useState } from "react";
import { useSelector } from "react-redux";
//Styles
import styles from './Favorites.module.css'

const Favorites = () => {

    const [currentPage, setCurrentPage] = useState(1);
    const [dogsPerPage] = useState(8);

    const favorites = useSelector((state) => state.favorites)

    //Paginate Logic
    const indexLast = currentPage * dogsPerPage
    const indexFirst =indexLast - dogsPerPage
    const currentDogs = favorites.slice(indexFirst, indexLast)

    const pageNumbers = []

    for (let i = 1; i <= Math.ceil(favorites.length / dogsPerPage); i++) {
        pageNumbers.push(i)
    }

    const paginate = (number) => {
        setCurrentPage(number);
        window.scrollTo({
            top:0,
            behavior:'smooth'
        })
    }
    const nextPage = () =>{
        if(currentPage < Math.ceil(favorites.length / dogsPerPage)){
            setCurrentPage(currentPage + 1)
            window.scrollTo({
                top:0,
                behavior:'smooth'
            })
        }
    }
    const prevPage = () =>{
        if(currentPage > 1) {
            setCurrentPage(currentPage - 1)
            window.scrollTo({
                top:0,
                behavior:'smooth'
            })
        }
    }

    return (
        <div className={styles.favoritesBox}>
            <h1>Your Favorites <span>Dogs</span></h1>
            {favorites.length === 0 ?
            <p>You haven't marked any <span>dogs</span> as favorites.</p>
            :
            <>
            <Cards
            dogs = {currentDogs}
            />
            <Pagination
                pageNumbers = {pageNumbers}
                paginate = {paginate}
                nextPage={nextPage}
                prevPage={prevPage}
                currentPage={currentPage}
            />
            </>
            }
            
        </div>
    )
}

export default Favorites;