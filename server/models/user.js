//https://github.com/russfeld/officehours-node/blob/main/models/user.js
//const Model = require('./base')
const crypto = ('crypto')
const jwt = require('jsonwebtoken')
const logger = require('../configs/logger')
const axios = require('axios')
const { parseStringPromise } = require('xml2js')
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

    static async findByRefreshToken(token) {
      let user = await User.query().where('refresh_token', token).limit(1)
      if (user.length === 0) {
        return null
      }
      return user[0]
    }

    async updateRefreshToken() {
      var token = this.refresh_token
      if (!token) {
        token = crypto.randomBytes(32).toString('hex')
        await this.$query().patch({
          refresh_token: token,
        })
      }
      const refresh_token = jwt.sign(
        {
          refresh_token: token,
        },
        process.env.TOKEN_SECRET,
        {
          expiresIn: '6h',
        }
      )
      return refresh_token
    }

    async is_admin(){
      const roles = await this.$relatedQuery('roles').for(this.id).select('name')
      return roles.some((r) => r.name === 'admin')
    }

    static async getToken(id) {
      //const refresh_token = await User.updateRefreshToken(id)
      let user = await User.query().findById(id)
      const refresh_token = await user.updateRefreshToken()
      const is_admin = await user.is_admin()
      const token = jwt.sign(
        {
          user_id: id,
          eid: user.eid,
          is_admin: is_admin,
          refresh_token: refresh_token,
        },
        process.env.TOKEN_SECRET,
        {
          expiresIn: '30m',
        }
      )
      return token
    }
  
    static async clearRefreshToken(id) {
      await User.query().findById(id).patch({
        refresh_token: null,
      })
    }

    
}

module.exports = User