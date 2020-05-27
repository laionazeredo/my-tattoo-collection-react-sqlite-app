// my_tattoo_collection/server/db_interface.js

// Import path module
const path = require('path')

// Get the location of database.sqlite file
const dbPath = path.resolve(__dirname, 'db/database.sqlite')

// Create connection to SQLite database
const knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: dbPath,
  },
  useNullAsDefault: true
})

// Create a table in the database called "tattoos"
knex.schema
  // Make sure no "tattoos" table exists
  // before trying to create new
  .hasTable('tattoos')
    .then((exists) => {
      if (!exists) {
        // If no "tattoos" table exists
        // create new, with "id", "reference", "title",
        // "wheniwant" and "desirelevel" columns
        // and use "id" as a primary identification
        // and increment "id" with every new record (tattoo)
        return knex.schema.createTable('tattoos', (table)  => {
          table.increments('id').primary()
          table.integer('reference')
          table.string('title')
          table.string('wheniwant')
          table.integer('desirelevel')
        })
        .then(() => {
          // Log success message
          console.log('Table \'Tattoos\' created')
        })
        .catch((error) => {
          console.error(`There was an error creating table: ${error}`)
        })
      }
    })
    .then(() => {
      // Log success message
      console.log('done')
    })
    .catch((error) => {
      console.error(`There was an error setting up the database: ${error}`)
    })

// Just for debugging purposes:
// Log all data in "tattoos" table
knex.select('*').from('tattoos')
  .then(data => console.log('data:', data))
  .catch(err => console.log(err))
  
// Export the database
module.exports = knex 