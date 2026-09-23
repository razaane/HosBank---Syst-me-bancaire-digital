const {getDashboardData}=require('../services/dashboardService')

const dashboardController= async (req,res)=>{


    try{

const userId=req.session.userId

const{comptes,user}=await getDashboardData(userId)

res.render('client/dashboard',{comptes,user})
    }catch (error) {

        
    console.error('Ddahsboard error', error.message)
   
     req.session.destroy(() => { res.redirect('/login') })
}
    }


module.exports={dashboardController}