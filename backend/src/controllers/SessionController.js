const conn = require('../database/conn')

module.exports = {
  async create(request, response) {
    const { id } = request.body

    const ong = await conn('ongs')
      .where('id', id)
      .select('name')
      .first()

    if (!ong)
      return response.status(400).json({ error: 'No ONG found with this ID.' })

    return response.json({ data: { name: ong.name } })
  }
}