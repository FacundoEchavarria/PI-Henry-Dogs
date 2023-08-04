const axios = require('axios')
const {Temperament} = require('../db');
const { API_KEY } = process.env;

const getAllTemperaments = async() =>{
    let allTemperaments = [];
    let temperamentRepeat = new Set();
    try {
        if( await Temperament.count() === 0){
            let apiResponse = await axios(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
            apiResponse = apiResponse.data
            
            apiResponse.forEach(dog =>{
                let {temperament} = dog;
                if(temperament){
                    temperament = temperament.split(',');
                    temperament.forEach((elem) => {
                        elem = elem.trim();
                        if(!temperamentRepeat.has(elem)){ 
                            allTemperaments.push({nombre:elem})
                            temperamentRepeat.add(elem)
                        }
                    })
                    allTemperaments = allTemperaments?.sort((a, b) => a.nombre.localeCompare(b.nombre))

                }
            })
            await Temperament.bulkCreate(allTemperaments)
        }
        const aux = await Temperament.findAll()
        return aux
    } catch (error) {
        throw new Error(error.message)
    }
}


module.exports = {
    getAllTemperaments
}