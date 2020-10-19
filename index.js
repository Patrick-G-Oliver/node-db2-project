// Project Procedures Summary:
// Step 1: Set up server in index.js.
// Step 2: Set up knexfile.js.
// Step 3: Set up data/config.js.
// Step 4: Set up migrations folder with: npx knex migrate:make car-dealer
// Step 5: Build data table in migration file created in step 4. 
// Step 6: Create cars.db3 data-table file by running: npx knex migrate:latest
// Step 7: Check out the newly-created table on TablePlus (SQL connection).
// Step 8: Set up a seed data file to populate the table and test the soon-to-be-created
// 		   router endpoints (on Insomnia) with: npx knex seed:make cars 
//	       (this creates the cars.js file in the seeds folder).
// Step 9: Write up the seed data (as appears in seeds/cars.js).
// Step 10: Populate the car-dealer table with seed file data by running:
//          npx knex seed:run
// Step 11: Check out the now-populated table in TablePlus.
// Step 12: Set up the router (cars/cars-router.js) to perform CRUD operations 
//          and test out on Insomnia. 

const express = require("express")
const welcomeRouter = require("./welcome/welcome-router")
const carsRouter = require("./cars/cars-router")

const server = express()
const port = process.env.PORT || 5000

server.use(express.json())

server.use(welcomeRouter)
server.use(carsRouter)

server.use((err, req, res, next) => {
	console.log(err)
	res.status(500).json({
		message: "Something went wrong",
	})
})

server.listen(port, () => {
	console.log(`Running at http://localhost:${port}`)
})