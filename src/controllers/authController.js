import { register, login , verifyEmail } from '../services/authService.js'



export async function registerController(req, res) {

  try {

  await register(req.body)
    res.redirect('/login')

} 
  catch (error) {

    console.error('Registration error:', error.message);
  res.render('auth/register', { error: 'Registration failed' })
  }
}


export async function loginController(req, res) {
 
     try {
      
      const user = await login(req.body)

      req.session.userId = user.id
    
      req.session.role = user.roleUtilisateur

    res.redirect('/dashboard')

  } catch (error) {

    console.error('Login error:', error.message)
    res.render('/auth/login', { error: error.message })
  }
}

export async function verifyEmailController(req, res) {


  try {

    const { token } = req.params;
    await verifyEmail(token);
    
    res.redirect('/login?verified=true')
  } catch (error) {
    console.error('Email verification error:', error.message)
    res.status(400).render('auth/verify-error', { error: error.message })
  }
}