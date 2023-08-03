//Library components
import axios from "axios";
//Actions type
import { SEARCH_DOG,SEARCH_DOG_ERROR, SEARCH_DOG_ERROR_NAME, GET_ALL_DOGS, GET_ALL_TEMP, ORDER, FILTER_BY_TEMP } from "./action-type";

const URL = 'http://localhost:3001'

export const searchDog = (name) => {
    return  async(dispatch) =>{
        try {
            if(name){
                const {data} = await axios(`${URL}/dogs/s/name?q=${name}`)
                return dispatch({
                    type: SEARCH_DOG,
                    payload: data
                })
            }else{
                const {data} = await axios(`${URL}/dogs/`)
                return dispatch({
                    type: GET_ALL_DOGS,
                    payload: data
                })
            }
        } catch (error) {
            return dispatch({
                type: SEARCH_DOG_ERROR,
            })
        }
    }
}

export const getAllDogs = () =>{
    return async(dispatch) =>{
        const {data} = await axios(`${URL}/dogs/`)
        return dispatch({
            type: GET_ALL_DOGS,
            payload: data
        })
    }
}
export const getAllTemp = () =>{
    return async(dispatch) =>{
        const {data} = await axios(`${URL}/temperament/`)
        return dispatch({
            type: GET_ALL_TEMP,
            payload: data
        })
    }
}
export const orderDogs = (order) =>{
    return (dispatch) =>{
        return dispatch({
            type: ORDER,
            payload: order
        })
    }
}
export const filterByTemper = (temp) =>{
    return (dispatch) =>{
        return dispatch({
            type: FILTER_BY_TEMP,
            payload: temp
        })
    }
}