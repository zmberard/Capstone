// https://github.com/russfeld/officehours-node/blob/main/models/base.js

const Model = require('objection').Model
Model.knex(db)

class BaseModel extends Model {
  // Adding timestamps before inserts and updates
  $beforeInsert() {
    this.created_at = new Date().toISOString().slice(0, 19).replace('T', ' ')
  }

  $beforeUpdate() {
    this.updated_at = new Date().toISOString().slice(0, 19).replace('T', ' ')
  }

  static get useLimitInFirst() {
    return true
  }
}

module.exports = BaseModel
