
const adminService = require('../services/adminService')

async function listUsers(req,res){

    try{

        const Users= await adminService.getUseres()
        res.render('admin/utilisateurs',{Users})
    
    }catch (error) {
    console.log(error)
    res.status(400).send('eroor in the func of listing users ')
  }
}


async function createUser(req, res) {
  try {
    await adminService.createUserAsAdmin(req.body)


    res.redirect('/admin/utilisateurs')

  } catch (error) {
    console.log(error)
    res.status(400).send('eroor in the func of createuser ')
  }
}

   async function updateUser(req, res) {
  try {

    await adminService.updateUser(req.params.id, req.body)

    res.redirect('/admin/utilisateurs')
  } catch (error) {
    console.error(error)
    res.status(400).send('Error in updating the user')
  }
}


 async function toggleUser(req, res) {
  try {
    if (req.params.id !== req.session.userId){

    await adminService.toggleUserActif(req.params.id) 
    return res.redirect('/admin/utilisateurs')
  }
      else {
        console.log('broatha who give him')
      }
  } catch (error) {
    console.error(error)
    res.status(400).send('Erreur during changing status')
  }
}

async function listCartes(req, res) {
  try {
    const cartes = await adminService.getAllCartes();
    res.render('admin/cartes', { cartes })

  } catch (error) {
    console.error(error)

    res.status(500).send('Err in rendring cards');
  }
}

async function listDemandes(req, res) {
  try {

    const demandes = await adminService.getAllDemandes()
    
    res.render('admin/demandes', { demandes })
  } catch (error) {
    console.error(error);
    res.status(500).send('Err in rendering the demand')
  }
}

async function updateRole(req, res) {
  try {

    await adminService.changeUserRole(req.params.id, req.body.role)

    res.redirect('/admin/utilisateurs')

  } catch (error) {
    console.error(error)
    res.status(400).send('Err in rendring roles')
  }
}


async function affecterClient(req, res) {
  try {
    const { clientId, chargeClientId } = req.body
    await adminService.affecterClient(clientId, chargeClientId)
    res.redirect('/admin/affectation')
  } catch (error) {
    console.error(error)
    res.status(400).send("Erreur lors de l'affectation.")
  }
}



async function listComptes(req, res) {
  try {
    const comptes = await adminService.getAllComptes()
    res.render('admin/comptes', { comptes })
  } catch (error) {
    console.error(error)
    res.status(500).send('Erreur.')
  }
}


async function updateCompte(req, res) {
  try {
    await adminService.updateCompteStatut(req.params.id, req.body.statut)

    res.redirect('/admin/comptes')

    } catch (error) {
      
      console.error(error)
      
      res.status(400).send('Error')
  
    }
  
  }


  
  async function updateCarte(req, res) {
    
    try {


    await adminService.updateCarteStatut(req.params.id, req.body.statut)
    res.redirect('/admin/cartes')

  } catch (error) {

    console.error(error)

    res.status(400).send('erer')
  }
}




async function listVirements(req, res) {
  
  try {
    
    const virements = await adminService.getAllVirements()
      
    res.render('admin/virements', { virements })
  }   catch (error) {
    
    console.error(error)
    res.status(500).send('error')
  }
}

async function getSupervision(req, res) {
  try {
    res.render('admin/supervision')

  } 
  catch (error) {
    console.error(error)
    res.status(500).send('eror')
  }
}

async function getAffectation(req, res) {
  try {
    res.render('admin/affectation')

  } catch (error)
   {
    console.error(error)

    res.status(500).send('er')
  }
}

async function getReclamations(req, res) {
  try {

    res.render('admin/reclamations')

  }
   catch (error) {

    console.error(error)

    res.status(500).send('err')

  }
}



    async function getStats(req, res) {

  try {
    res.render('admin/stats')

  }
   catch (error) {

    console.error(error)

    res.status(500).send('errrrrr')
  }
}

module.exports={
  listUsers,createUser,updateUser,toggleUser,updateRole,
  updateCarte,updateCompte,listComptes,listCartes,affecterClient,
  listDemandes,listVirements,getSupervision,
  getAffectation, getReclamations, getStats
}