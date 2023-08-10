//Actions type
import { SEARCH_DOG, 
    SEARCH_DOG_ERROR, 
    GET_ALL_DOGS, 
    GET_ALL_TEMP, 
    ORDER, 
    FILTER_BY_TEMP, 
    FILTER_BY_ORIGIN,
    EDIT_DOG,
} from "./action-type";

let initialState = {
    dogs: [],
    allDogs: [],
    temperament: [],
    searchError: false,
    orderAndFilter: {
        order: 'A',
        tempFilter: 'All',
        originFilter: 'all'
    },
    dogToEdit: null
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
            return {
                ...state, 
                searchError: true,
                dogs: [],
                allDogs:[]
            }


        case ORDER:
            let orderedDogs = [...state.dogs]
            let orderedAllDogs = [...state.allDogs]
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
                    orderedDogs?.sort((a, b) => {
                        let pesoA = a.peso?.split(' - ')
                        let pesoB = b.peso?.split(' - ')
                        
                        return parseInt(pesoA[0]) - parseInt(pesoB[0]) 
                    })
                    orderedAllDogs?.sort(((a, b) => {
                        let pesoA = a.peso?.split(' - ')
                        let pesoB = b.peso?.split(' - ')
                        
                        return parseInt(pesoA[0]) - parseInt(pesoB[0]) 
                    }))
                    break;
                case "maxWeight": 
                    orderedDogs?.sort(((a, b) => {
                        let pesoA = a.peso?.split(' - ')
                        let pesoB = b.peso?.split(' - ')

                        pesoA = pesoA.length > 1 ? pesoA[1] : pesoA[0]                      
                        pesoB = pesoB.length > 1 ? pesoB[1] : pesoB[0]                      
                        return parseInt(pesoB) - parseInt(pesoA) 
                    }))
                    orderedAllDogs?.sort(((a, b) => {
                        let pesoA = a.peso?.split(' - ')
                        let pesoB = b.peso?.split(' - ')

                        pesoA = pesoA.length > 1 ? pesoA[1] : pesoA[0]                      
                        pesoB = pesoB.length > 1 ? pesoB[1] : pesoB[0]                      
                        return parseInt(pesoB) - parseInt(pesoA) 
                    }))
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
                    },
                    searchError: state.allDogs.length > 0 ? false : true
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
                    },
                    searchError: state.allDogs.length > 0 ? false : true
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
            
        case EDIT_DOG:
            return{
                ...state,
                dogToEdit: payload
            }

        default:
            return {...state}
    }
}

export default reducer;