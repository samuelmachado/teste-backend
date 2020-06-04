exports.up = function(knex) {
    return knex.schema.createTable('bookings', function(table) {
        
        table.increments('idBooking').primary();
        
        table.integer('idCar').notNullable().references('id')
            .inTable('cars').index();
        
        table.string('nameClient').notNullable();
        table.string('idClient').notNullable();

        table.integer('daysBookings').notNullable();
        table.date('startBooking').notNullable();
        table.date('endBooking').notNullable();

        table.date('bookingCreatedAt').notNullable().defaultTo(knex.fn.now());
        table.date('bookingLastUpdate').defaultTo(knex.fn.now());     
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('bookings');
};