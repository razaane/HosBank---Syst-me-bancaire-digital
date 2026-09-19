class Beneficiaire {
  constructor({ id, client_id, nom, rib, banque, date_ajout }) {
    this.id = id;
    this.clientId = client_id;
    this.nom = nom;
    this.rib = rib;
    this.banque = banque;
    this.dateAjout = date_ajout;
  }
}

module.exports = Beneficiaire;