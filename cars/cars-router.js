const express = require("express")
// an instance of knex connected to the database and ready to go 
const db = require("../data/config")

const router = express.Router()

router.post("/cars", async (req, res, next) => {
	try {
		const [id] = await db("car-dealer").insert(req.body)
		const newCar = await db("car-dealer").where({ id }).first()

		res.status(201).json(newCar)
	} catch(err) {
		next(err)
	}
})

router.get("/cars", async (req, res, next) => {
	try {
		res.json(await db("car-dealer"))
	} catch(err) {
		next(err)
	}
})

router.get("/cars/:id", async (req, res, next) => {
	try {
		const { id } = req.params
		const car = await db("car-dealer").where({ id }).first()
		
		res.json(car)
	} catch(err) {
		next(err)
	}
})

router.put("/cars/:id", async (req, res, next) => {
    try {
		// be specific with a payload object rather than passing
		// `req.body` directly to update, so the user doesn't try to
		// send data we are auto-generating in the database
		const payload = {
			VIN: req.body.VIN,
            make: req.body.make,
            model: req.body.model,
            mileage: req.body.mileage,
            transmission: req.body.transmission,
            titleStatus: req.body.titleStatus
		}

		if (!payload.VIN || !payload.make || !payload.model || !payload.mileage) {
			return res.status(400).json({
				message: "Need a VIN, make, model, and mileage.",
			})
		}

		// translates to `UPDATE messages SET name = ? AND budget = ? WHERE id = ?;`
		await db("car-dealer").where("id", req.params.id).update(payload)

		res.json(await getCarByID(req.params.id))
	} catch (err) {
		next(err)
	}
})

function getCarByID(id) {
	return db
		.first("*") // a shortcut for destructuring the array and limit 1
		.from("car-dealer")
		.where("id", id)
}

router.delete("/cars/:id", async (req, res, next) => {
    try {
        // tranlates to 'DELETE FROM accounts WHERE id = ?;'
        await db("car-dealer").where("id", req.params.id).del()

        // there is no longer a resource to return, but it was deleted successfully 
        // (204 means success but empty response)
        res.status(204).end()
    } catch (err) {
        next(err)
    }
})

module.exports = router