
exports.up = function(knex) {
    return knex.schema.createTable('carModel', function(table) {
        
        table.integer('idCarModel').primary();

        table.integer("idFabricante").notNullable().references("idBrand")
            .inTable("carBrand").index();

        table.string('modelo').notNullable();
        table.string('imagem').notNullable();
        
        table.timestamp('userCreatedAt').notNullable().defaultTo(knex.fn.now());
        table.timestamp('userLastUpdate').defaultTo(knex.fn.now());     
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('carModel');
};
