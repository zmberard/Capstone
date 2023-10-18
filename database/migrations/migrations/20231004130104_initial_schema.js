// Copyright 2023 under MIT License
 
    /*
    * Currently all migrations, but will be split amongst more migration files after we plot a distribution for it
    * This migration just covers the initial DB schema
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
            table.text("notes").collate("utf8mb4_unicode_ci");
            table.string("semester", 191).collate("utf8mb4_unicode_ci").useNullAsDefault();
            table.text("dars").collate("utf8mb4_unicode_ci");
            table.foreign("user_id").references("users").inTable("id");
        } )
        .createTable("migrations", function(table){
            table.increments("id", { primaryKey: true }).unsigned().notNullable();
            table.string("migration", 191).collate("utf8mb4_unicode_ci").notNullable();
            table.integer("batch").notNullable(); 
        })
        .createTable("sentmails", function(table){
            table.increments("id", { primaryKey: true }).unsigned().notNullable();
            table.integer("user_id").unsigned().defaultTo(0).nullable();
            table.text("html").collate("utf8mb4_unicode_ci");
            table.text("text").collate("utf8mb4_unicode_ci");
            table.text("subject").collate("utf8mb4_unicode_ci");
            table.text("to").collate("utf8mb4_unicode_ci");
            table.text("cc").collate("utf8mb4_unicode_ci");
            table.text("bcc").collate("utf8mb4_unicode_ci");
            table.string("sent_by", 191).collate("utf8mb4_unicode_ci").nullable().useNullAsDefault();
            table.timestamp("created_at").nullable().useNullAsDefault();
            table.timestamp("updated_at").nullable().useNullAsDefault();
            table.foreign("user_id").references("users").inTable("id");
        })
        .createTable("settings", function(table){
            table.increments("id", { primaryKey: true }).unsigned().notNullable();
            table.string("key", 191).collate("utf8mb4_unicode_ci").notNullable().unique().index();
            table.text("value").collate("utf8mb4_unicode_ci").notNullable();
        })
        .createTable("templates", function(table){
            table.increments("id", { primaryKey: true }).unsigned().notNullable();
            table.string("name").collate("utf8mb4_unicode_ci").notNullable();
            table.text("content").collate("utf8mb4_unicode_ci").notNullable();
            table.timestamp("created_at").nullable().useNullAsDefault();
            table.timestamp("updated_at").nullable().useNullAsDefault();
        })
        .createTable("users", function(table){
            table.increments("id", { primaryKey: true }).unsigned().notNullable();
            table.string("eid", 191).collate("utf8mb4_unicode_ci").notNullable().unique();
            table.string("wid", 191).collate("utf8mb4_unicode_ci").notNullable();
            table.string("remember_token", 100).collate("utf8mb4_unicode_ci").nullable().useNullAsDefault();
            table.boolean("admin").notNullable().defaultTo(false);
            table.boolean("update_profile").notNullable().defaultTo(false);
            table.string("first_name", 191).collate("utf8mb4_unicode_ci").notNullable();
            table.string("last_name", 191).collate("utf8mb4_unicode_ci").notNullable();
            table.string("email", 191).collate("utf8mb4_unicode_ci").notNullable();
            table.timestamp("deleted_at").nullable().useNullAsDefault();
            table.timestamp("created_at").nullable().useNullAsDefault();
            table.timestamp("updated_at").nullable().useNullAsDefault();
        });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists("applications")
    .dropTableIfExists("migrations")
    .dropTableIfExists("sentmails")
    .dropTableIfExists("settings")
    .dropTableIfExists("templates")
    .dropTableIfExists("users");
};
