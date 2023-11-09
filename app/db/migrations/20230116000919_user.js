

//Run NPM command for migration to create tables and instances
exports.up = function(knex) {
    return knex.schema

      .createTable('notes', (table) => {
        table.increments('id');
        table.integer('user_id').references('id').inTable('user');
        table.string('title').notNullable();
        table.string('body').notNullable();
        table.boolean('status').notNullable().defaultTo(1);
        table.timestamps(true, true);
      });
};

exports.down = function(knex) {
    return knex.schema.dropTable('notes');
};