const multer = require('multer')
const path = require('path')

// Configuración de almacenamiento
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname)
    cb(null, Date.now() + ext)
  }
})

const upload = multer({ storage })
module.exports = upload
