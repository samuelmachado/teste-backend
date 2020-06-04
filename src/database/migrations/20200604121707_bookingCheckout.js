
exports.up = function(knex) {
    return knex.schema.createTable('bookingCheckout', function(table) {
        
        table.increments('idCheckout');

        table.integer("idBooking").notNullable().references("idBooking")
            .inTable("bookings").index();
        
        table.boolean("activeCheckout").defaultTo(false);
        table.timestamp('checkoutCreatedAt').notNullable().defaultTo(knex.fn.now());    
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('bookingCheckout');
};
