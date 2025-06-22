const User = require('../models/user')
const crearControladorCRUD = require('./crudController')

userController = crearControladorCRUD(User, ['nickname', 'email'])

//Seguir a un usuario
userController.seguirUsuario = async (req, res) => {
  const currentUserId = req.user.id
  const userToFollowId = req.params.id

  if (currentUserId === userToFollowId) {
    return res.status(400).json({ mensaje: "No podés seguirte a vos mismo." })
  }

  try {
    await User.findByIdAndUpdate(currentUserId, {
      $addToSet: { following: userToFollowId }
    })

    await User.findByIdAndUpdate(userToFollowId, {
      $addToSet: { followers: currentUserId }
    })

    res.json({ mensaje: 'Ahora seguís a este usuario.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

//Dejar de seguir
userController.dejarDeSeguirUsuario = async (req, res) => {
  const currentUserId = req.user.id
  const userToUnfollowId = req.params.id

  try {
    await User.findByIdAndUpdate(currentUserId, {
      $pull: { following: userToUnfollowId }
    })

    await User.findByIdAndUpdate(userToUnfollowId, {
      $pull: { followers: currentUserId }
    })

    res.json({ mensaje: 'Dejaste de seguir al usuario.' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

module.exports = userController