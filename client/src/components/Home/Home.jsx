//Styles
import styles from './Home.module.css'

//Components
import Cards from './Cards/Cards';
import SideBar from './SideBar/SideBar';
import SearchBar from './SearchBar/SearchBar';
import Pagination from './Pagination/Pagination';

//Library components
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

//Actions
import { clearAllDogs, getAllDogs, getAllTemp } from '../../redux/actions';



const Home = () =>{

    const searchError = useSelector((state) => state.searchError);
    const dogs = useSelector((state) => state.dogs);

    const dispatch = useDispatch();

    //Local State
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [dogsPerPage, setDogsPerPage] = useState(8);

    useEffect(()=>{
        setLoading(true)
        const getDogs = async() =>{
            dispatch(getAllDogs())
            dispatch(getAllTemp())
            setCurrentPage(1) 
            setLoading(false) 
        }
        getDogs()

        return () => {
            dispatch(clearAllDogs())
        }
    }, [dispatch])


    //Paginate Logic
    
    const indexLast = currentPage * dogsPerPage
    const indexFirst =indexLast - dogsPerPage
    const currentDogs = dogs.slice(indexFirst, indexLast)

    const pageNumbers = []

    for (let i = 1; i <= Math.ceil(dogs.length / dogsPerPage); i++) {
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
        if(currentPage < Math.ceil(dogs.length / dogsPerPage))setCurrentPage(currentPage + 1)
    }
    const prevPage = () =>{
        if(currentPage > 1) setCurrentPage(currentPage - 1)
    }
    
    return (
        <div className={styles.home}>
            <h1>Home</h1>
            <SearchBar
            setCurrentPage={setCurrentPage}
            loading={loading}
            setLoading={setLoading}
            />
            <SideBar
            setCurrentPage={setCurrentPage}
            />
            {
            loading?
            <p>Cargando...</p>
            :
            (searchError ?
            <h2>No se encontro ese perro</h2>
            :
            <Cards
            dogs={currentDogs}
            />)
            }
            <Pagination
            pageNumbers = {pageNumbers}
            paginate = {paginate}
            nextPage={nextPage}
            prevPage={prevPage}
            />
        </div>
    )
}

export default Home;