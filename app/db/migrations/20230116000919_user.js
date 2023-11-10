

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
      })
      .createTable('shared_notes', (table) => {
        table.increments('id');
        table.integer('shared_by').references('id').inTable('user');
        table.integer('shared_to').references('id').inTable('user');
        table.integer('notes_id').references('id').inTable('notes');
        table.boolean('status').notNullable().defaultTo(1);
        table.timestamps(true, true);
      });
};

exports.down = function(knex) {
    return knex.schema.dropTable('notes').dropTable('shared_notes');
};