class Reclamation {
  constructor({ id, client_id, charge_client_id, sujet, description, statut, date_creation, date_traitement }) {
    this.id = id;
    this.clientId = client_id;
    this.chargeClientId = charge_client_id;
    this.sujet = sujet;
    this.description = description;
    this.statut = statut;
    this.dateCreation = date_creation;
    this.dateTraitement = date_traitement;
  }
}
module.exports = Reclamation;