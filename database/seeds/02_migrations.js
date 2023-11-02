// Copyright 2023 under MIT License
/**
 * Migration file names and when they need to be called
 */

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex("migrations").del()
  await knex("migrations").insert([
    {id: 1, migration: "20231013133650_create_users_table", batch: 1},
    {id: 2, migration: "20231013134016_data", batch: 1},
    {id: 3, migration: "20231013134504_create_settings_table", batch: 1},
    {id: 4, migration: "20231013134832_email_templates", batch: 1},
    {id: 5, migration: "20231013135546_add_notes_email", batch: 1},
    {id: 6, migration: "20231013140823_add_dars", batch: 2}
  ]);
};