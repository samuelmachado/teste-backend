
exports.up = function(knex) {
    return knex.schema.createTable('carBrand', function(table) {
        
        table.integer('idBrand').primary().notNullable();
        table.string('nomeBrand').notNullable();
        
        table.timestamp('userCreatedAt').notNullable().defaultTo(knex.fn.now());
        table.timestamp('userLastUpdate').defaultTo(knex.fn.now());     
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('carBrand');
};
