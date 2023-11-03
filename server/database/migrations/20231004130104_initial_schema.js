// Copyright 2023 under MIT License
 
    /**
      * This migration just covers the migrations table
      * Might be vestigial, may delete later
      */

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
        .createTable("migrations", function(table){
            table.increments("id", { primaryKey: true }).unsigned().notNullable();
            table.string("migration").collate("utf8mb4_unicode_ci").notNullable();
            table.integer("batch").notNullable(); 
        });
};

/**
 * Reverse the migration
 * 
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists("migrations");
};
