// Copyright 2023 under MIT License
 
    /**
      * This migration just covers the users table
      */

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
    .createTable("users", function(table){
        table.increments("id", { primaryKey: true }).unsigned().notNullable();
        table.string("eid").collate("utf8mb4_unicode_ci").notNullable().unique();
        table.string("wid").collate("utf8mb4_unicode_ci").notNullable();
        table.string("remember_token", 100).collate("utf8mb4_unicode_ci").nullable().useNullAsDefault();
        table.boolean("admin").notNullable().defaultTo(false);
        table.boolean("update_profile").notNullable().defaultTo(false);
        table.string("first_name").collate("utf8mb4_unicode_ci").notNullable();
        table.string("last_name").collate("utf8mb4_unicode_ci").notNullable();
        table.string("email").collate("utf8mb4_unicode_ci").notNullable();
        table.timestamp("deleted_at").nullable().useNullAsDefault();
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
  return knex.scheme
    .dropTableIfExists("users");
};
