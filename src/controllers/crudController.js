function crearControladorCRUD(Modelo, populateFields = [], selectFields = null) {
  return {
    async obtenerTodos(req, res) {
      try {
        let query = Modelo.find().select(selectFields)
        populateFields.forEach(field => {
          query = query.populate(field)
        })
        const docs = await query
        res.status(200).json(docs)
      } catch (error) {
        res.status(500).json({ error: error.message })
      }
    },

    async obtenerUno(req, res) {
      try {
        let query = Modelo.findById(req.params.id).select(selectFields)
        populateFields.forEach(field => {
          query = query.populate(field)
        });
        const doc = await query;
        if (!doc) return res.status(404).json({ mensaje: 'No encontrado' })
        res.status(200).json(doc)
      } catch (error) {
        res.status(500).json({ error: error.message })
      }
    },

    async crear(req, res) {
      try {
        const nuevo = new Modelo(req.body)
        await nuevo.save()
        res.status(201).json(nuevo)
      } catch (error) {
        res.status(400).json({ error: error.message })
      }
    },

    async editar(req, res) {
      try {
        const actualizado = await Modelo.findByIdAndUpdate(req.params.id, req.body, {
          new: true,
          runValidators: true
        });
        if (!actualizado) return res.status(404).json({ mensaje: 'No encontrado' })
        res.json({ mensaje: 'Actualizado', doc: actualizado })
      } catch (error) {
        res.status(400).json({ error: error.message })
      }
    },

    async eliminar(req, res) {
      try {
        const eliminado = await Modelo.findByIdAndDelete(req.params.id)
        if (!eliminado) return res.status(404).json({ mensaje: 'No encontrado' })
        res.json({ mensaje: 'Eliminado', doc: eliminado })
      } catch (error) {
        res.status(500).json({ error: error.message })
      }
    }
  }
}

module.exports = crearControladorCRUD
