const userRepository=require('../repositories/userRepository')

const carteRepository = require('../repositories/carteRepository')

const demandeRepository = require('../repositories/demandeRepository')

const virementRepository = require('../repositories/virementRepository')




async function getUseres(){

  return userRepository.findAll()

}

 async function updateUser(id,data){

    
  return await  userRepository.updateUser(id, data)
}



async function createUserAsAdmin({ nom, prenom, email, motDePasse, telephone, role })
    {
    const bcrypt = require('bcrypt')

      const hashedPassword = await bcrypt.hash(motDePasse, 10)

    const userId = await userRepository.createUser({nom,prenom,email,telephone,

    motDePasse: hashedPassword,
    role,
    tokenVerification: null

  })
  if (role === 'client') {
    await userRepository.createClient(userId);
  }
  return userId;
}

async function toggleUserActif(id) {
  return userRepository.toggleActif(id)
}


async function getAllCartes() {
  return await carteRepository.findAllCartes();
}

async function getAllDemandes() {
  return await demandeRepository.findAllDemandes();
}

async function updateCarteStatut(carteId, statut) {
  return carteRepository.updateStatut(carteId, statut)
}

async function getAllVirements() {
  return virementRepository.findAll()
}



module.exports={getUseres,updateUser,createUserAsAdmin,toggleUserActif,getAllCartes,getAllDemandes,updateCarteStatut,getAllVirements}
