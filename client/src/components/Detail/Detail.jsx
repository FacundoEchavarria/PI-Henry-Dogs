//Styles
import axios from 'axios'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

//Components




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
        <div>
            {loading ?
            <p>cargando...</p>
            :
            <div>
                <h1>Detail</h1>
                <h2>{detailDog.name}</h2>
                <h2>Peso: {detailDog.peso}</h2>
                <h2>Altura: {detailDog.altura}</h2>
                <h2>esperanza de vida: {detailDog.life_span}</h2>
                <h2>temperamento: {detailDog.temperament}</h2>
                <img src={detailDog.imagen} alt={`imagen del ${detailDog.name}`}/>
            </div>
            
            }
            
        </div>
    )
}

export default Detail;