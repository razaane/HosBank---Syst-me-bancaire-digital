class Compte{

    constructor({id, client_id, numero_compte, type_compte, solde, statut, date_ouverture, rib }){
        this.id=id
        this.client_id=client_id

        this.numero_compte=numero_compte

        this.type_compte=type_compte

        this.solde=solde 

        this.statut=statut

        this.date_ouverture=date_ouverture

        this.rib=rib
    }
}

module.exports=Compte