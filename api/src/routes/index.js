const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const dogsRoutes = require('./Dogs/DogsRoute')
const temperamentRoutes = require('./Termperament/TemperamentRoutes')

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/dogs', dogsRoutes)
router.use('/temperament', temperamentRoutes)


module.exports = router;
