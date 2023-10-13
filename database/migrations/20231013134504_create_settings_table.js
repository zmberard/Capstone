// Copyright 2023 under MIT License
 
    /**
      * This migration covers the settings table
      */

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema
    .createTable("settings", function(table){
        table.increments("id", { primaryKey: true }).unsigned().notNullable();
        table.string("key").collate("utf8mb4_unicode_ci").notNullable().unique().index();
        table.text("value").collate("utf8mb4_unicode_ci").notNullable();
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
    .dropTableIfExists("settings");
};
