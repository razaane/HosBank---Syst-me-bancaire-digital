class Utilisateur {
  constructor({ id, nom, prenom, email, mot_de_passe, role, email_verifie, actif, date_creation }) {
    this.id = id;
    this.nom = nom;
    this.prenom = prenom;
    this.email = email;
    this.motDePasse = mot_de_passe;
    this.role = role;
    this.emailVerifie = email_verifie;
    this.actif = actif;
    this.dateCreation = date_creation;
  }
}

module.exports = Utilisateur;