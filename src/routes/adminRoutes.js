const express = require('express')
const router = express.Router()

const { authMiddleware } = require('../middlewares/authMiddleware')
const { requireRole } = require('../middlewares/roleMiddleware')

const { 
    listUsers, 
    createUser, 
    updateUser, 
    toggleUser, 
    listCartes, 
    listDemandes,
    updateRole
} = require('../controllers/adminController')

router.get('/admin/utilisateurs', authMiddleware, requireRole('admin'), listUsers)
router.post('/admin/utilisateurs', authMiddleware, requireRole('admin'), createUser)
router.post('/admin/utilisateurs/:id', authMiddleware, requireRole('admin'), updateUser)
router.post('/admin/utilisateurs/:id/toggle-actif', authMiddleware, requireRole('admin'), toggleUser)
router.post('/admin/utilisateurs/:id/role', authMiddleware, requireRole('admin'), updateRole)

router.get('/admin/cartes', authMiddleware, requireRole('admin'), listCartes)
router.get('/admin/demandes', authMiddleware, requireRole('admin'), listDemandes)

module.exports = router