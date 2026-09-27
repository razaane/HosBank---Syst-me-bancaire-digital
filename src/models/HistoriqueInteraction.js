class HistoriqueInteraction {
  constructor({ id, client_id, charge_client_id, type_action, description, date_action }) {
    this.id = id;
    this.clientId = client_id;
    this.chargeClientId = charge_client_id;
    this.typeAction = type_action;
    this.description = description;
    this.dateAction = date_action;
  }
}
module.exports = HistoriqueInteraction;