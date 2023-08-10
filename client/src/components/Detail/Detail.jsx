//Styles
import Styles from './Detail.module.css'
//Components
import axios from 'axios'
import { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';





const Detail = () =>{

    let {id} = useParams()
    const [detailDog, setDetailDog] = useState({})
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const getDetail = async() => {
            setLoading(true)
            const {data} = await axios(`http://localhost:3001/dogs/${id}`)
            setDetailDog(data)
            setLoading(false)
        }
            getDetail()
            return setDetailDog({});
    }, [id]);

    return (
        <div className={Styles.detailPage}>
            <div className={Styles.tittleNButton}>
                <NavLink to={'/home'} ><button>{'<-'}</button></NavLink>
                <h1>Detail <span>Dog</span></h1>
            </div>
            <div className={Styles.detailDog}>
                {loading ?
                <p>Loading...</p>
                :
                <div className={Styles.insideDetailDog}>
                    <div className={Styles.imgBox}>
                        <img src={detailDog.imagen} alt={`imagen del ${detailDog.name}`}/>  
                    </div>

                    <div className={Styles.infoBox}>
                        <div className={Styles.insideInfoBox}>
                            <h3>{detailDog.name}</h3>
                            <h2>Weight: {detailDog.peso} Kg</h2>
                            <h2>Height: {detailDog.altura} Cm</h2>
                            <h2>Life Span: {detailDog.life_span}</h2>
                            <h2>temperament: {detailDog.temperament}</h2>
                        </div>
                    </div>
                </div>
                }
            </div>
            
        </div>
    )
}

export default Detail;