//Actions type
import { SEARCH_DOG, SEARCH_DOG_ERROR, GET_ALL_DOGS, GET_ALL_TEMP, ORDER, FILTER_BY_TEMP } from "./action-type";

let initialState = {
    dogs: [],
    allDogs: [],
    temperament: [],
    searchError: false,
    orderAndFilter: {
        order: 'A',
        tempFilter: 'All'
    }
}


const reducer = (state = initialState, action) => {
    const { payload, type } = action
    switch (type) {
        case SEARCH_DOG:
            return {
                ...state, 
                dogs: payload,
                allDogs: payload,
                searchError:false,
                orderAndFilter:{
                    order: 'A',
                    tempFilter: 'All'
                }
            }

        case GET_ALL_DOGS:
            return {
                ...state,
                allDogs: payload,
                dogs: payload,
                searchError:false,
                orderAndFilter:{
                    order: 'A',
                    tempFilter: 'All'
                }
            }

        case GET_ALL_TEMP:
            return {...state, temperament: payload}

        case SEARCH_DOG_ERROR:
            return {...state, searchError: true}


        case ORDER:
            let orderedAllDogs = state.dogs.slice()
            switch (payload) {
                case "A":
                    orderedAllDogs?.sort((a, b) => a.name.localeCompare(b.name))
                    break;
                case "D":
                    orderedAllDogs?.sort((a, b) => b.name.localeCompare(a.name))
                    break;
                case "minWeight":
                    orderedAllDogs?.sort((a, b) => a.peso?.split('-')[0] - b.peso?.split('-')[0])
                    break;
                case "maxWeight": 
                    orderedAllDogs?.sort((a, b) => b.peso?.split('-')[1] - a.peso?.split('-')[1])
                    break;
                
                default:
                    break;
            }
            return {
                ...state, 
                dogs: orderedAllDogs,
                orderAndFilter:{
                    ...state.orderAndFilter,
                    order: payload ? payload : 'A',
                },
            }
        
        case FILTER_BY_TEMP:
            if(payload === 'All') {
                return{
                    ...state,
                    dog: state.allDogs,
                    orderAndFilter: {
                        ...state.orderAndFilter,
                        filter:payload
                    }
                }
            }else{

                let filteredDogs = state.allDogs.filter((dog) => dog?.temperament?.includes(payload))
                
                return{
                    ...state,
                    dogs: filteredDogs,
                    orderAndFilter: {
                        ...state.orderAndFilter,
                        filter:payload
                    },
                    searchError: filteredDogs.length ? false : true
                }
            }
    
        default:
            return {...state}
    }
}

export default reducer;