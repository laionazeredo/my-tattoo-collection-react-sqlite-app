// my_tattoo_collection/server/routes/tattoos-routes.js

// Import express
const express = require('express')

// Import tattoos_controller
const tattoosRoutes = require('./../controllers/tattoos_controllers.js')

// Create router
const router = express.Router()

// Add route for GET request to retrieve all tattoo
// In server.js, tattoos route is specified as '/tattoos'
// this means that '/all' translates to '/tattoos/all'
router.get('/all', tattoosRoutes.tattoosAll)

// Add route for POST request to create new tattoo
// In server.js, tattoos route is specified as '/tattoos'
// this means that '/create' translates to '/tattoos/create'
router.post('/create', tattoosRoutes.tattoosCreate)

// Add route for PUT request to delete specific tattoo
// In server.js, tattoos route is specified as '/tattoos'
// this means that '/delete' translates to '/tattoos/delete'
router.put('/delete', tattoosRoutes.tattoosDelete)

// Add route for PUT request to reset tattoo collection list
// In server.js, tattoos route is specified as '/tattoos'
// this means that '/reset' translates to '/tattoos/reset'
router.put('/reset', tattoosRoutes.tattoosReset)

// Export router
module.exports = router