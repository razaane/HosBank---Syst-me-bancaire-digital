

function requireRole(...rolesAutorises) {


  return (req, res, next) => {

    if (rolesAutorises.includes(req.session.role)) {

    
      return next() }


          return res.status(403).send('access denied')
    }
}


module.exports = { requireRole };