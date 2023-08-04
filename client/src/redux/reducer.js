//Actions type
import { SEARCH_DOG, 
    SEARCH_DOG_ERROR, 
    GET_ALL_DOGS, 
    GET_ALL_TEMP, 
    ORDER, 
    FILTER_BY_TEMP, 
    FILTER_BY_ORIGIN } from "./action-type";

let initialState = {
    dogs: [],
    allDogs: [],
    temperament: [],
    searchError: false,
    orderAndFilter: {
        order: 'A',
        tempFilter: 'All',
        originFilter: ''
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
                    tempFilter: 'All',
                    originFilter: 'all'
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
                    tempFilter: 'All',
                    originFilter: 'all'
                }
            }
        case 'CLEAR_ALL_DOGS':
            return {
                ...state,
                allDogs: [],
                dogs: [],
                searchError:false,
                orderAndFilter:{
                    order: 'A',
                    tempFilter: 'All',
                    originFilter: 'all'
                }
            }

        case GET_ALL_TEMP:
            return {...state, temperament: payload}

        case SEARCH_DOG_ERROR:
            return {...state, searchError: true}


        case ORDER:
            let orderedDogs = state.dogs.slice()
            let orderedAllDogs = state.allDogs.slice()
            switch (payload) {
                case "A":
                    orderedDogs?.sort((a, b) => a.name.localeCompare(b.name))
                    orderedAllDogs?.sort((a, b) => a.name.localeCompare(b.name))
                    break;
                case "D":
                    orderedDogs?.sort((a, b) => b.name.localeCompare(a.name))
                    orderedAllDogs?.sort((a, b) => b.name.localeCompare(a.name))
                    break;
                case "minWeight":
                    orderedDogs?.sort((a, b) => a.peso?.split('-')[0] - b.peso?.split('-')[0])
                    orderedAllDogs?.sort((a, b) => a.peso?.split('-')[0] - b.peso?.split('-')[0])
                    break;
                case "maxWeight": 
                    orderedDogs?.sort((a, b) => b.peso?.split('-')[1] - a.peso?.split('-')[1])
                    orderedAllDogs?.sort((a, b) => b.peso?.split('-')[1] - a.peso?.split('-')[1])
                    break;
                
                default:
                    break;
            }
            return {
                ...state, 
                dogs: orderedDogs,
                allDogs: orderedAllDogs,
                orderAndFilter:{
                    ...state.orderAndFilter,
                    order: payload ? payload : 'A',
                },
            }
        
        case FILTER_BY_TEMP:
            if(payload === 'All') {
                return{
                    ...state,
                    dogs: state.allDogs,
                    orderAndFilter: {
                        ...state.orderAndFilter,
                        tempFilter:payload,

                    }
                }
            }else{
                let filteredDogs = state.allDogs.filter((dog) => dog?.temperament?.includes(payload))
                
                return{
                    ...state,
                    dogs: filteredDogs,
                    orderAndFilter: {
                        ...state.orderAndFilter,
                        tempFilter:payload,
                        originFilter:'all',

                    },
                    searchError: filteredDogs.length ? false : true
                }
            }
        case FILTER_BY_ORIGIN:
            if(payload === 'all') {
                return{
                    ...state,
                    dogs: state.allDogs,
                    orderAndFilter: {
                        ...state.orderAndFilter,
                        originFilter: payload,

                    }
                }
            }else{
                let filteredDogs = []
                if(payload === 'real') filteredDogs = state.allDogs.filter((dog) => typeof(dog?.id) === 'number')
                else if(payload === 'created') filteredDogs = state.allDogs.filter((dog) => typeof(dog?.id) === 'string')
                
                return{
                    ...state,
                    dogs: filteredDogs,
                    orderAndFilter: {
                        ...state.orderAndFilter,
                        originFilter:payload,
                        tempFilter: 'All',

                    },
                    searchError: filteredDogs.length ? false : true
                }
            }
    
        default:
            return {...state}
    }
}

export default reducer;