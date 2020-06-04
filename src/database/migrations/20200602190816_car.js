
exports.up = function(knex) {
    return knex.schema.createTable('cars', function(table) {
        
        table.integer('id').unique();
        table.integer('idUnidade').notNullable();

        table.integer("idModelo").notNullable().references("idCarModel")
            .inTable("carModel").index();

        table.string('placa').notNullable().unique();
        table.string('cor').notNullable();
        
        table.timestamp('userCreatedAt').notNullable().defaultTo(knex.fn.now());
        table.timestamp('userLastUpdate').defaultTo(knex.fn.now());     
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('cars');
};
