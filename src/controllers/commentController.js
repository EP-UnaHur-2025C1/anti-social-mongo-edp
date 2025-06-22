const Comment = require('../models/comment')
const crearControladorCRUD = require('./crudController')

module.exports = crearControladorCRUD(Comment, ['user', 'post'])
