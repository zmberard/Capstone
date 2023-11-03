/* Run migrations and seeds
 * Wipe db after
 * Based on repo code here:
 * https://github.com/alt-cs-lab/coding-exam/blob/main/server/serverTestEntry.js
 * 
 * Copyright 2023 under MIT License 
 * 
*/

// Create the app
const knex = require( "knex" )

// Custom knexConfig for the test database
const knexConfig = {
	client: "postgresql",
	connection: {
		host: process.env.POSTGRES_HOST || "localhost",
		port: process.env.POSTGRES_PORT || 5432,
		user: 'postgres',
        password: 'postgres',
        database: 'postgres'
	},
}

async function setup() {
	const db = knex( knexConfig )

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

setup()