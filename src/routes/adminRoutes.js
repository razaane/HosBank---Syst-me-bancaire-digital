const express = require('express')
const router = express.Router()

const { authMiddleware } = require('../middlewares/authMiddleware')
const { requireRole } = require('../middlewares/roleMiddleware')

const { listUsers,  createUser,  updateUser, toggleUser, listCartes, listDemandes,updateRole, listComptes, listVirements, updateCarte, updateCompte, getSupervision, getAffectation, getReclamations, getStats ,affecterClientRoute }= require('../controllers/adminController')

router.get('/admin/utilisateurs', authMiddleware, requireRole('admin'), listUsers)

router.post('/admin/utilisateurs', authMiddleware, requireRole('admin'), createUser)

router.post('/admin/utilisateurs/:id', authMiddleware, requireRole('admin'), updateUser)

router.post('/admin/utilisateurs/:id/toggle-actif', authMiddleware, requireRole('admin'), toggleUser)

router.post('/admin/utilisateurs/:id/role', authMiddleware, requireRole('admin'), updateRole)

router.get('/admin/cartes', authMiddleware, requireRole('admin'), listCartes)

router.get('/admin/demandes', authMiddleware, requireRole('admin'), listDemandes)


router.post('/admin/cartes/:id/statut', authMiddleware, requireRole('admin'), updateCarte)

router.get('/admin/comptes', authMiddleware, requireRole('admin'), listComptes)
router.post('/admin/comptes/:id/statut', authMiddleware, requireRole('admin'), updateCompte)

router.get('/admin/virements', authMiddleware, requireRole('admin'), listVirements)
router.get('/admin/supervision', authMiddleware, requireRole('admin'), getSupervision)

router.get('/admin/affectation', authMiddleware, requireRole('admin'), getAffectation)
router.get('/admin/reclamations', authMiddleware, requireRole('admin'), getReclamations)
router.get('/admin/stats', authMiddleware, requireRole('admin'), getStats)
router.post('/admin/affectation', authMiddleware, requireRole('admin'), affecterClientRoute);

module.exports = router

