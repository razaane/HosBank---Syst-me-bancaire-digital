const compteRepository =require('../repositories/compteRepository')

const userRepository=require('../repositories/userRepository')

async function getDashboardData(userId){
    const  user = await userRepository.findById(userId)
    const comptes = await compteRepository.findByClientId(userId)
if (!user) {
    throw new Error('user not found')}
    return {comptes,user}
}

module.exports={getDashboardData} 