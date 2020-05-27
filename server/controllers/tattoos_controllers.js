// my_tattoo_collection/server/controllers/tattoos-controller.js

// Import database
const knex = require('../db_interface')

// Retrieve all tattoos
exports.tattoosAll = async (req, res) => {
  // Get all tattoos from database
  knex
    .select('*') // select all records
    .from('tattoos') // from 'tattoos' table
    .then(userData => {
      // Send tattoos extracted from database in response
      res.json(userData)
    })
    .catch(err => {
      // Send a error message in response
      res.json({ message: `There was an error retrieving tattoos: ${err}` })
    })
}

// Create new tattoo
exports.tattoosCreate = async (req, res) => {
  // Add new tattoo to database
  knex('tattoos')
    .insert({ // insert new record, a tattoo
      'reference': req.body.reference,
      'title': req.body.title,
      'wheniwant': req.body.wheniwant,
      'desirelevel': req.body.desirelevel
    })
    .then(() => {
      // Send a success message in response
      res.json({ message: `tattoo \'${req.body.title}\' by ${req.body.reference} created.` })
    })
    .catch(err => {
      // Send a error message in response
      res.json({ message: `There was an error creating ${req.body.title} tattoo: ${err}` })
    })
}

// Remove specific tattoo
exports.tattoosDelete = async (req, res) => {
  // Find specific tattoo in the database and remove it
  knex('tattoos')
    .where('id', req.body.id) // find correct record based on id
    .del() // delete the record
    .then(() => {
      // Send a success message in response
      res.json({ message: `tattoo ${req.body.id} deleted.` })
    })
    .catch(err => {
      // Send a error message in response
      res.json({ message: `There was an error deleting ${req.body.id} tattoo: ${err}` })
    })
}

// Remove all tattoos on the list
exports.tattoosReset = async (req, res) => {
  // Remove all tattoos from database
  knex
    .select('*') // select all records
    .from('tattoos') // from 'tattoos' table
    .truncate() // remove the selection
    .then(() => {
      // Send a success message in response
      res.json({ message: 'tattoo list cleared.' })
    })
    .catch(err => {
      // Send a error message in response
      res.json({ message: `There was an error resetting tattoo list: ${err}.` })
    })
}