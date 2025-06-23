const User = require('../models/user')
const crearControladorCRUD = require('./crudController')

userController = crearControladorCRUD(User, ['nickname', 'email'])


//Seguir a un usuario
userController.seguirUsuario = async (req, res) => {
  const currentUserId = req.user?.id
  const targetUserId = req.params.id

  console.log("Usuario autenticado:", currentUserId)
  console.log("Usuario a seguir:", targetUserId)
  if (!currentUserId || !targetUserId) {
    return res.status(400).json({ mensaje: "IDs no válidos" })
  }
  if (currentUserId === targetUserId) {
    return res.status(400).json({ mensaje: "No podés seguirte a vos mismo." })
  }

  try {
    await User.findByIdAndUpdate(currentUserId, {
      $addToSet: { following: targetUserId }
    })

    await User.findByIdAndUpdate(targetUserId, {
      $addToSet: { followers: currentUserId }
    })

    res.status(200).json({ mensaje: "Ahora seguís a este usuario." })
  } catch (error) {
    console.error("Error al seguir:", error)
    res.status(500).json({ mensaje: "Error en el servidor", error: error.message })
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