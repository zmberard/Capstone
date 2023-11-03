// Copyright 2023 under MIT License
 
    /**
      * This migration adds dars to the applications table
      */

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema
    .alterTable("applications", function(table){
        table.text("dars").collate("utf8mb4_unicode_ci");
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
    .alterTable("applications", function(table){
        table.dropColumn("dars");
    });
};
