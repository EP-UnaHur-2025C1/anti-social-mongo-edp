const User = require('../models/user')
const crearControladorCRUD = require('./crudController')

module.exports = crearControladorCRUD(User, ['nickname', 'email'])
