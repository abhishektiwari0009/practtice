const express = require('express')
const router = express.Router()
const {createUser, getAllUser, getUserById,deleteUser, updateUser} = require('../controller/userController')
router.post('/createuser', createUser)
router.get('/getAlluser', getAllUser)
router.put('/updateUser/:id', updateUser)
router.get('/getUserById/:id', getUserById)
router.delete('/deleteUser/:id', deleteUser)
module.exports = router;