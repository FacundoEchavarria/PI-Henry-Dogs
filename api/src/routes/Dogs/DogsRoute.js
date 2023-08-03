const express = require('express');
const router = express.Router();
const dogsController = require('../../controllers/DogsController');

router.get('/', async(req, res) =>{
    try {
        const response = await dogsController.getAllDogs()
        return res.status(200).json(response)
    } catch (error) {
        return res.status(400).json({error: error.message})
    }
})
router.get('/:id', async(req, res) =>{
    const {id} = req.params
    try {
        const response = await dogsController.dogDetail(id)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({error: error.message})
    }
})
router.get('/s/name', async(req, res) =>{
    const {q} = req.query    
    try {
        const response = await dogsController.dogByName(q)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({message: error.message})
    }
})
router.post('/', async(req, res) =>{
    const perro = req.body
    try {
        const dog = await dogsController.addDog(perro)
        return res.status(200).json(dog)
    } catch (error) {
        return res.status(400).json(error.message)
    }
})

module.exports = router;
