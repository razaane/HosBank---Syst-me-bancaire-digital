class Commentaire {
  constructor({ id, demande_id, auteur_id, contenu, date_creation }) {
    this.id = id;
    this.demandeId = demande_id;
    this.auteurId = auteur_id;
    this.contenu = contenu;
    this.dateCreation = date_creation;
  }
}
module.exports = Commentaire;