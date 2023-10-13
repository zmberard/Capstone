// Copyright 2023 under MIT License
 
    /**
     *  This migration covers the email templates table
     */

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema
    .createTable("templates", function(table){
        table.increments("id", { primaryKey: true }).unsigned().notNullable();
        table.string("name").collate("utf8mb4_unicode_ci").notNullable();
        table.text("content").collate("utf8mb4_unicode_ci").notNullable();
        table.timestamp("created_at").nullable().useNullAsDefault();
        table.timestamp("updated_at").nullable().useNullAsDefault();
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
    .dropTableIfExists("templates");
};
