
exports.up = function(knex) {
    return knex.schema.createTable('bookingCheckin', function(table) {
        
        table.increments('idCheckin');

        table.integer("idBooking").notNullable().references("idBooking")
            .inTable("bookings").index();
        
        table.boolean("activeCheckin").defaultTo(false);
        table.timestamp('checkinCreatedAt').notNullable().defaultTo(knex.fn.now());
       
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('bookingCheckin');
};
