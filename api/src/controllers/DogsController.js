const axios = require('axios')
const {Dog} = require('../db');
const { Op } = require('sequelize');
const { API_KEY } = process.env;

const getAllDogs = async () =>{
    let allDogs = []
    try {
        let {data} = await axios(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)

        const apiDogs = data.map((dog) => {
            return({
                id: dog.id,
                name: dog.name,
                imagen: dog.image?.url,
                altura: dog.height.metric,
                peso: dog.weight.metric,
                life_span: dog.life_span,
                temperament: dog?.temperament 
            })
        })

        const dbDogs = await Dog.findAll()
        allDogs = [...dbDogs, ...apiDogs]
        return allDogs
    } catch (error) {
        throw new Error(error.message)
    }
} 

const dogDetail = async (id) =>{
    try {
        let apiResponse = await getAllDogs()

        let result = apiResponse.filter(dog => dog.id == id)
        if(result.length > 0) return result[0]

        throw new Error('No se encontro ese perro')

    } catch (error) {
        throw new Error(error.message)
    }
}

const dogByName = async (name) =>{
    if(!name) throw new Error('Faltan datos')

    try {
        let response = await axios(`https://api.thedogapi.com/v1/breeds/search?q=${name}&api_key=${API_KEY}`)
        
        response = response.data
        
        const imageRequests = response.map(async (elem) => {
            let imageId = elem?.reference_image_id;
            if(imageId) {
                let res = await axios(`https://api.thedogapi.com/v1/images/${imageId}`);
                return res.data.url;
            }else return undefined
        });
        const imageResponses = await Promise.all(imageRequests);

        let dbRespose = await Dog.findAll({
            where:{
                name:{
                    [Op.iLike]: `%${name}%`
                }
            }
        })
        
        let result = response.map((dog, index) => ({
            ...dog,
            imagen: imageResponses[index],
            peso: dog.weight?.metric,
            altura: dog.height?.metric
        }))

        let allSearchedDogs = [...dbRespose, ...result]
        if (allSearchedDogs.length === 0) {
            throw new Error('No hay perros con ese nombre')
        }
        return allSearchedDogs
    } catch (error) {
        throw new Error(error)
    }
}
const addDog = async(dog) =>{
    if(!dog.name || !dog.imagen || !dog.peso || !dog.altura || !dog.life_span) throw new Error('Faltan datos')
    try {
        await Dog.create(dog)
        const allDogs = await Dog.findAll()
        return allDogs
    } catch (error) {
        throw new Error('No se pudo crear el perro')
    }
}

module.exports = {
    getAllDogs,
    dogDetail,
    dogByName,
    addDog
}