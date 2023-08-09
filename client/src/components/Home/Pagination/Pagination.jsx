//Styles
import styles from './Pagination.module.css'
//Library Components
import React from "react"


const Pagination = ({pageNumbers, paginate, nextPage, prevPage}) => {

    return (
        <div className={styles.paginationBox}>
            <ul>
                <li><button type='button' onClick={() => prevPage()}>anterior</button></li>
                {pageNumbers.map(number =>(
                    <li key={number}>
                        <button type='button' onClick={() => paginate(number)}>{number}</button>
                    </li>
                ))}
                <li><button type='button' onClick={() =>nextPage()}>siguiente</button></li>
            </ul>
        </div>
    )
}

export default Pagination