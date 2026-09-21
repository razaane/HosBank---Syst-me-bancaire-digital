import express from 'express'

import { registerController, verifyEmailController ,loginController } from '../controllers/authController.js '


const router = express.Router()

router.get('/register', (req, res) => res.render('auth/register'))

router.get('/login', (req, res) => res.render('auth/login',{verified: req.query.verified}))


router.post('/register', registerController)

router.post('/login', loginController)

router.get('/verify/:token', verifyEmailController)
;


export default router