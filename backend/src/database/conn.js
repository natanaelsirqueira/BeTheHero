const knex = require('knex')
const config = require('../../knexfile')

const envConfig = process.env.NODE_ENV === 'test' ? config.test : config.development

const conn = knex(envConfig)

module.exports = conn
