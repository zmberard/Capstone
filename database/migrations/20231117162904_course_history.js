/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
    .createTable("coursehistory", function(table){
        table.increments("id", { primaryKey: true }).unsigned().notNullable();
        table.foreign("user_id").references("user.id")
        table.string("name",9).notNullable()
        table.smallint("hours").notNullable()
        table.smallint("grade").notNullable()
        table.smallint("semester").notNullable()
        table.boolean("complete").notNullable().defaultTo(false)
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.scheme
    .dropTableIfExists("coursehistory")
};
