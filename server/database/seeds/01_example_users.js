// Copyright 2023 under MIT License
/**
 * Seeds the db with some test users
 */

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex("users").del()
  await knex("users").insert([
    {id: 1, eid: 'testcas', wid: '000112222', remember_token: 'UVDMYXiWm3z7XRpwRRh1ZzzjOdhpDbndViWpUpE7umI547jTMi9jI0gFZqcq', admin: 0, update_profile: 1, first_name: 'Test', last_name: 'User', email: 'testcas@ksu.edu', deleted_at: NULL, created_at: NULL, updated_at: '2021-12-14 16:10:31'},
    {id: 2, eid: 'russfeld', wid: '000112222', remember_token: 'z8wS70ywKWxpYVG7gM0UOHgRKCxXy3dGKyFm58dOB8wXrhXwbr1nTolczWpn', admin: 1, update_profile: 1, first_name: 'Russell', last_name: 'Feldhausen', email: 'russfeld@ksu.edu', deleted_at: NULL, created_at: NULL, updated_at: '2023-09-25 11:08:41'},
    {id: 3, eid: 'nhbean', wid: '000112222', remember_token: '9yunuDQ27qBiYLO0kYzRk4abRkrwuy3hVlL7jKZWNAlzMZSBhVBQ2oew0ptO', admin: 1, update_profile: 1, first_name: 'Nathan', last_name: 'Bean', email: 'nhbean@ksu.edu', deleted_at: NULL, created_at: NULL, updated_at: '2021-03-15 14:48:09'},
    {id: 4, eid: 'dlang1', wid: '000112222', remember_token: NULL, admin: 1, update_profile: 0, first_name: 'Dennis', last_name: 'Lang', email: 'dlang1@ksu.edu', deleted_at: NULL, created_at: NULL, updated_at: NULL},
    {id: 5, eid: 'juliet', wid: '000112222', remember_token: NULL, admin: 1, update_profile: 0, first_name: 'Julie', last_name: 'Thornton', email: 'juliet@ksu.edu', deleted_at: NULL, created_at: NULL, updated_at: NULL},
    {id: 6, eid: 'weeser', wid: '000112222', remember_token: NULL, admin: 1, update_profile: 0, first_name: 'Josh', last_name: 'Weese', email:'weeser@ksu.edu', deleted_at: NULL, created_at: NULL, updated_at: NULL},
    {id: 7, eid: 'jvalenzu', wid:'000112222', remember_token: NULL, admin: 1, update_profile: 0, first_name: 'Jorge', last_name: 'Valenzuela', email: 'jvalenzu@ksu.edu', deleted_at: NULL, created_at: NULL, updated_at: NULL},
    {id: 8, eid: 'rhowell', wid: '000112222', remember_token: NULL, admin: 1, update_profile: 0, first_name: 'Rod', last_name: 'Howell', email:'rhowell@ksu.edu', deleted_at:NULL, created_at:NULL, updated_at:NULL},
    {id: 9, eid: 'cornell', wid: '000111222', remember_token: 'ohW5aNOLdQhnAGzcxcmWzEWvJVwX4MY04Ew3XlLz6JCUkYXBixCZoPGJLs6E', admin:0, update_profile: 1, first_name: 'cornell', last_name: 'cornell', email: 'cornell@ksu.edu', deleted_at: NULL, created_at: '2021-09-29 10:41:40',updated_at: '2021-09-29 10:41:43'},
    {id: 10, eid: 'russfield', wid: '000111222', remember_token: NULL, admin: 0, update_profile: 0, first_name: 'russfield', last_name: 'russfield', email: 'russfield@ksu.edu', deleted_at: NULL, created_at:'2021-09-29 10:46:35', updated_at:'2021-09-29 10:46:35'},
    {id: 11, eid:'hruskanen', wid: '000111222', remember_token: NULL, admin: 0, update_profile: 1, first_name: 'Hunter', last_name: 'Ruskanen', email: 'hruskanen@ksu.edu', deleted_at: NULL, created_at: '2021-09-29 14:37:24', updated_at: '2021-09-29 14:37:42'}
  ]);
};
