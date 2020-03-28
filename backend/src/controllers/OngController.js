const conn = require('../database/conn')
const generateUniqueId = require('../utils/generateUniqueId')

module.exports = {
  async index(_request, response) {
    const ongs = await conn('ongs').select('*')

    return response.json({ ongs })
  },
  async create(request, response) {
    const { name, email, whatsapp, city, uf } = request.body

    const id = generateUniqueId()

    await conn('ongs').insert({
      id,
      name,
      email,
      whatsapp,
      city,
      uf
    })

    return response.json({ id })
  }
}
