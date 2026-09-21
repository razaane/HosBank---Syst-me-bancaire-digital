class Virement {
  constructor({ id, compte_source_id, beneficiaire_id, compte_destination_id, montant, motif, date_virement, statut }) {
    this.id = id;
    this.compteId = compte_source_id;
    this.beneficiaireId = beneficiaire_id;
    this.compteDestinationId = compte_destination_id;
    this.montant = montant;
    this.motif = motif;
    this.dateVirement = date_virement;
    this.statut = statut;
  }
}

module.exports = Virement;