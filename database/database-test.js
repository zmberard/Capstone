/* Run migrations and seeds
 * Wipe db after
 * Based on repo code here:
 * https://github.com/alt-cs-lab/coding-exam/blob/main/server/serverTestEntry.js
 * 
 * Copyright 2023 under MIT License 
 * 
*/

// Create the app
const app = require( "./app" )
const knex = require( "knex" )

// Custom knexConfig for the test database
const knexConfig = {
	client: "pg",
	connection: {
		host: process.env.POSTGRES_HOST || "localhost",
		port: 5432,
		user: 'postgres',
        password: 'postgres',
        database: 'postgres'
	},
	pool: {
		min: 2,
		max: 10
	},
	migrations: {
		tableName: "migrations"
	}
}

async function setup() {
	const db = knex( knexConfig )
	app.set( "db", db )

	// Migrate Database on Startup
	const version = await db.migrate.currentVersion()
	//console.log( "Database Migration Version: " + version )
	if ( version == "none" ) {
		console.log( "Database Empty - Migrating and Seeding" )
		await db.migrate.latest()
		await db.seed.run()
		console.log( "Done" )
	} else {
		console.log( "Database Exists - Migrating" )
		await db.migrate.latest()
		console.log( "Migrations Complete!" )
	}
}

async function startServer() {
	await setup()
	// Start listening for requests on port 9000
	app.listen( 9000, () => console.log( "Listening on port 9000" ) )
}

startServer()

module.exports = app