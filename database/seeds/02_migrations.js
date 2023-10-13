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

//(1,'2014_10_12_000000_create_users_table',1),(2,'2017_10_03_102312_data',1),(3,'2018_11_05_141606_create_settings_table',1),(4,'2018_11_30_142215_email_templates',1),(5,'2019_01_10_103805_add_notes_email',1),(6,'2021_05_07_130922_adddars',2);
