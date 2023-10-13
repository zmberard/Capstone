// Copyright 2023 under MIT License
 
    /**
      * This migration covers the applications table
      */

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
        .createTable("applications", function(table){
            table.increments("id", { primaryKey: true }).unsigned().notNullable();
            table.integer("user_id").unsigned().defaultTo(0).nullable().unique({indexName:'user_unique_id'});
            table.integer("approved").defaultTo(0).nullable();
            table.text("application").collate("utf8mb4_unicode_ci");
            table.timestamp("deleted_at").nullable().useNullAsDefault();
            table.timestamp("created_at").nullable().useNullAsDefault();
            table.timestamp("updated_at").nullable().useNullAsDefault();
            table.text("dars").collate("utf8mb4_unicode_ci");
            table.foreign("user_id").references("users").inTable("id");
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
    .dropTableIfExists("applications");
};
