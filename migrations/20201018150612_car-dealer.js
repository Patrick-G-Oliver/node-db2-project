
exports.up = async function(knex) {
    await knex.schema.createTable("car-dealer", (table) => {
        // translates to '"id" INTEGER NOT NULL UNIQUE PRIMARY KEY'
        //table.integer("id").notNull().unique().primary()

        // or, a shortcut for the above...
        table.increments("id")
        table.text("VIN").notNull().unique()
        table.text("make").notNull()
        table.text("model").notNull()
        table.integer("mileage").notNull()
        table.text("transmission")
        table.text("titleStatus")
    })
};

exports.down = async function(knex) {
    await knex.schema.dropTableIfExists("car-dealer")
};
