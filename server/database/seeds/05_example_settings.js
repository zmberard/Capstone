// Copyright 2023 under MIT License
/**
 * Sample settings
 */

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex("settings").del()
  await knex("settings").insert([
    {id: 3, key: "disabled", value: 0}
  ]);
};
