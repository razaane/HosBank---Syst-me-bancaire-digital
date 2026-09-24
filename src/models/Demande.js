class Demande {
  constructor({ id, client_id, charge_client_id, type_demande, statut, date_creation, date_traitement, donnees_specifiques }) {
    this.id = id;
    this.clientId = client_id;
    this.chargeClientId = charge_client_id;
    this.typeDemande = type_demande;
    this.statut = statut;
    this.dateCreation = date_creation;
    this.dateTraitement = date_traitement;
    this.donneesSpecifiques = donnees_specifiques;
  }
}
module.exports = Demande;