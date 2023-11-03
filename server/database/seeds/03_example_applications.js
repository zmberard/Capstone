// Copyright 2023 under MIT License
/**
 * Sample applications
 */

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex("applications").del()
  await knex("applications").insert([
    {id: 1, user_id: 1, application: '{\"courses\":{\"cis015\":{\"name\":\"CIS 015\",\"status\":\"in-progress\",\"grade\":\"n\\/a\",\"hours\":0},\"cis115\":{\"name\":\"CIS 115\",\"status\":\"in-progress\",\"grade\":\"n\\/a\",\"hours\":3},\"cis200\":{\"name\":\"CIS 200\",\"status\":\"in-progress\",\"grade\":\"n\\/a\",\"hours\":4},\"cis300\":{\"name\":\"CIS 300\",\"status\":\"in-progress\",\"grade\":\"n\\/a\",\"hours\":3},\"cis301\":{\"name\":\"CIS 301\",\"status\":\"in-progress\",\"grade\":\"n\\/a\",\"hours\":3},\"ece241\":{\"name\":\"ECE 241\",\"status\":\"in-progress\",\"grade\":\"n\\/a\",\"hours\":3},\"math220\":{\"name\":\"MATH 220\",\"status\":\"in-progress\",\"grade\":\"n\\/a\",\"hours\":4},\"math221\":{\"name\":\"MATH 221\",\"status\":\"in-progress\",\"grade\":\"n\\/a\",\"hours\":4}},\"waiverRequested\":false,\"waiverText\":\"Test123\"}', approved: NULL, deleted_at: NULL, created_at: '2018-11-30 00:00:00', updated_at: '2021-12-14 16:30:50', notes: 'Notes Tes', semester: 'Fall 2018', dars: 'nnlk'}
  ]);
};