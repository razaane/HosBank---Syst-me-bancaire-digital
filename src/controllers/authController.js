const { register, login, verifyEmail } = require('../services/authService');

async function registerController(req, res) {
  try {
    await register(req.body);
    res.redirect('/login');
  } catch (error) {
    console.error('Registration error:', error.message);
    res.render('auth/register', { error: "Échec de l'inscription." });
  }
}

async function loginController(req, res) {
  try {
    const user = await login(req.body);
    req.session.userId = user.id;
    req.session.role = user.role;
    res.redirect('/dashboard');
  } catch (error) {
    console.error('Login error:', error.message);
    res.render('auth/login', { error: error.message });
  }
}

async function verifyEmailController(req, res) {
  try {
    const { token } = req.params;
    await verifyEmail(token);
    res.redirect('/login?verified=true');
  } catch (error) {
    console.error('Email verification error:', error.message);
    res.status(400).render('auth/verify-error', { error: error.message });
  }
}

module.exports = { registerController, loginController, verifyEmailController };