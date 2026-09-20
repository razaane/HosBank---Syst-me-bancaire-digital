const virementService = require("../services/virementService");

async function list(req,res) {
    try{
        const compteId =req.session.compteId;
        const virements=await virementService.listerVirements(compteId);
        res.render("client/virement/list",{virements});
    }catch(err){
        console.error(err);
        res.status(500).send("Erreur lors du chargement des virements")
    }
}


async function showAddForm(req,res){
    res.render("client/virement/effectuer");
}

async function add(req,res){
    try{
        const { compteId, beneficiaireId, montant, motif } =req.body;
        await virementService.ajouterVirement({ compteId, beneficiaireId, montant, motif });
        res.redirect("/virements?compteId=" + compteId);
    }catch(err){
        res.status(400).send(err.message)
    }
}

module.exports={
    list,
    showAddForm,
    add
}