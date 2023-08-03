//Styles
import styles from './Cards.module.css'
//Library Components
import React from "react"
//Components
import Card from "./Card/Card"


const Cards = ({dogs, numItems}) => {

    return (
        <div className={styles.card}>
            {dogs.map((elem) =>{

                let weight = undefined

                if(elem?.weight) weight = elem?.weight?.metric
                else weight = elem.peso

                return <Card
                key={elem?.id}
                id={elem?.id}
                name={elem?.name}
                weight={weight}
                image={elem?.imagen}
                temperament={elem?.temperament}
                />
            })
            }
        </div>
    )
}

export default Cards