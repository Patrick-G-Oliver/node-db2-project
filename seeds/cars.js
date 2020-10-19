
exports.seed = async function(knex) {
  // clears out the table so we can start fresh
  // truncate does more than .del(), like resetting the autoincrement counts
  await knex("car-dealer").truncate()
  await knex("car-dealer").insert([
    { VIN: "1G8ZH1270SZ355887", make: "Chevrolet", model: "Astro", mileage: 40000, transmission: "automatic", titleStatus: "clean" },
    { VIN: "SALME1D48CA365300", make: "Triumph", model: "Spitfire", mileage: 55000, transmission: "manual", titleStatus: "salvage" },
    { VIN: "1HD1PDC392Y952267", make: "Chevrolet", model: "Spark", mileage: 5500, transmission: "automatic", titleStatus: "clean" },
  ])
};

