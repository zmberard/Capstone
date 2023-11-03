//https://github.com/russfeld/officehours-node/blob/main/models/user.js
//const Model = require('./base')
const crypto = ('crypto')
const jwt = require('jsonwebtoken')
const logger = require('../configs/logger')
const axios = require('axios')
// const { parseStringPromise } = require('xml2js')
const util = require('node:util')

class User extends Model {
    static get tableName() {
        return 'users'
    }

    static get idColumn(){
        return 'id'
    }

    static async findOrCreate(eid) {
        let user = await User.query().where('eid', eid).limit(1)
        // user not found - create user
        if (user.length === 0) {
          var name = eid
          try {
            logger.debug('Looking up ' + eid + ' in K-State directory')
            const response = await axios.get(
              'https://k-state.edu/People/filter/eid=' + eid
            )
            const jsonstring = await parseStringPromise(response.data)
            for (const result of jsonstring.results.result) {
              if (eid == result.eid) {
                name = result.fn + ' ' + result.ln
                logger.debug('Match Found! ' + name)
                break
              }
            }
          } catch (error) {
            logger.error('Unable to query name from K-State directory!')
            logger.error(util.inspect(error))
          }
          user = [
            await User.query().insert({
              eid: eid,
              name: name,
            }),
          ]
          logger.info('User ' + eid + ' created')
        }
        return user[0]
    }

    
}