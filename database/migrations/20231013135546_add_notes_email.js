// Copyright 2023 under MIT License
 
    /**
      * This migration covers sent mail, and adds notes and semester to the applications table
      */

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
        .createTable("sentmails", function(table){
            table.increments("id", { primaryKey: true }).unsigned().notNullable();
            table.integer("user_id").unsigned().defaultTo(0).nullable();
            table.text("html").collate("utf8mb4_unicode_ci");
            table.text("text").collate("utf8mb4_unicode_ci");
            table.text("subject").collate("utf8mb4_unicode_ci");
            table.text("to").collate("utf8mb4_unicode_ci");
            table.text("cc").collate("utf8mb4_unicode_ci");
            table.text("bcc").collate("utf8mb4_unicode_ci");
            table.string("sent_by").collate("utf8mb4_unicode_ci").nullable().useNullAsDefault();
            table.timestamp("created_at").nullable().useNullAsDefault();
            table.timestamp("updated_at").nullable().useNullAsDefault();
            table.foreign("user_id").references("users").inTable("id");
        })
        .alterTable("applications", function(table){
            table.text("notes").collate("utf8mb4_unicode_ci");
            table.string("semester").collate("utf8mb4_unicode_ci").useNullAsDefault();
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
    .dropTableIfExists("sentmails")
    .alterTable("applications", function(table){
        table.dropColumn("notes");
        table.dropColumn("semester");
    });
};
