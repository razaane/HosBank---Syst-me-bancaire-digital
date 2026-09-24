require('dotenv').config();
const bcrypt = require('bcrypt');
const db = require('./src/config/connexion');

async function seed() {
  try {
    console.log('🌱 Démarrage du seed...');

    // 1. Utilisateurs
    const motDePasse = await bcrypt.hash('password123', 10);

    const [u1] = await db.query(
      `INSERT INTO utilisateurs (nom, prenom, email, mot_de_passe, role, email_verifie, actif)
       VALUES ('Bennani', 'Yassine', 'yassine@test.com', ?, 'client', TRUE, TRUE)`,
      [motDePasse]
    );
    const [u2] = await db.query(
      `INSERT INTO utilisateurs (nom, prenom, email, mot_de_passe, role, email_verifie, actif)
       VALUES ('Alami', 'Salma', 'salma@test.com', ?, 'client', TRUE, TRUE)`,
      [motDePasse]
    );
    const [u3] = await db.query(
      `INSERT INTO utilisateurs (nom, prenom, email, mot_de_passe, role, email_verifie, actif)
       VALUES ('Tazi', 'Amine', 'amine.charge@test.com', ?, 'charge_client', TRUE, TRUE)`,
      [motDePasse]
    );

    const clientId1 = u1.insertId;
    const clientId2 = u2.insertId;
    const chargeId = u3.insertId;
    console.log(`✅ Utilisateurs créés (ids: ${clientId1}, ${clientId2}, ${chargeId})`);

    // 2. Charge_client + clients
    await db.query(`INSERT INTO charge_clients (id, matricule) VALUES (?, 'CC-001')`, [chargeId]);
    await db.query(
      `INSERT INTO clients (id, charge_client_id, adresse, date_naissance, cin) VALUES (?, ?, 'Casablanca', '1990-05-12', 'AB123456')`,
      [clientId1, chargeId]
    );
    await db.query(
      `INSERT INTO clients (id, charge_client_id, adresse, date_naissance, cin) VALUES (?, ?, 'Rabat', '1988-11-03', 'CD654321')`,
      [clientId2, chargeId]
    );
    console.log('✅ Clients créés');

    // 3. Comptes bancaires
    const [c1] = await db.query(
      `INSERT INTO comptes_bancaires (client_id, numero_compte, type_compte, solde, statut, rib)
       VALUES (?, 'CPT-0001', 'courant', 142850.00, 'actif', '011780000012345678901234')`,
      [clientId1]
    );
    const [c2] = await db.query(
      `INSERT INTO comptes_bancaires (client_id, numero_compte, type_compte, solde, statut, rib)
       VALUES (?, 'CPT-0002', 'epargne', 385400.00, 'actif', '011780000098765432109876')`,
      [clientId1]
    );
    const [c3] = await db.query(
      `INSERT INTO comptes_bancaires (client_id, numero_compte, type_compte, solde, statut, rib)
       VALUES (?, 'CPT-0003', 'courant', 52300.00, 'actif', '011780000011223344556677')`,
      [clientId2]
    );
    console.log('✅ Comptes créés');

    // 4. Cartes
    const [carte1] = await db.query(
      `INSERT INTO cartes (compte_id, numero_carte, type_carte, statut, date_expiration) VALUES (?, '4402XXXXXXXX4402', 'physique', 'active', '2027-08-01')`,
      [c1.insertId]
    );
    const [carte2] = await db.query(
      `INSERT INTO cartes (compte_id, numero_carte, type_carte, statut, date_expiration) VALUES (?, '9104XXXXXXXX9104', 'virtuelle', 'active', '2026-11-01')`,
      [c2.insertId]
    );
    await db.query(
      `INSERT INTO cartes (compte_id, numero_carte, type_carte, statut, date_expiration) VALUES (?, '7788XXXXXXXX7788', 'physique', 'active', '2027-03-01')`,
      [c3.insertId]
    );
    console.log('✅ Cartes créées');

    // 5. Bénéficiaires
    const [b1] = await db.query(
      `INSERT INTO beneficiaires (client_id, nom, rib, banque) VALUES (?, 'Cabinet Dr. Mehdi Tazi', '011780000011122233344455', 'BMCE Bank')`,
      [clientId1]
    );
    await db.query(
      `INSERT INTO beneficiaires (client_id, nom, rib, banque) VALUES (?, 'Salma Bennani', '011780000055566677788899', 'Attijariwafa')`,
      [clientId1]
    );
    console.log('✅ Bénéficiaires créés');

    // 6. Virements (depuis le compte courant c1, vers le bénéficiaire b1)
    await db.query(
      `INSERT INTO virements (compte_source_id, beneficiaire_id, montant, motif, statut) VALUES (?, ?, 6500.00, 'Honoraires consultation', 'valide')`,
      [c1.insertId, b1.insertId]
    );
    await db.query(
      `INSERT INTO virements (compte_source_id, beneficiaire_id, montant, motif, statut) VALUES (?, ?, 1200.00, 'Remboursement', 'en_attente')`,
      [c1.insertId, b1.insertId]
    );
    console.log('✅ Virements créés');

    // 7. Demandes (les 3 types, statuts variés)
    await db.query(
      `INSERT INTO demandes (client_id, type_demande, statut, donnees_specifiques) VALUES (?, 'carte_virtuelle', 'en_attente', '{}')`,
      [clientId1]
    );
    await db.query(
      `INSERT INTO demandes (client_id, type_demande, statut, donnees_specifiques) VALUES (?, 'opposition_carte', 'validee', ?)`,
      [clientId1, JSON.stringify({ carteId: carte1.insertId })]
    );
    await db.query(
      `INSERT INTO demandes (client_id, type_demande, statut, donnees_specifiques) VALUES (?, 'renouvellement_pin', 'en_attente', ?)`,
      [clientId1, JSON.stringify({ carteId: carte2.insertId })]
    );
    console.log('✅ Demandes créées');

    console.log('🎉 Seed terminé avec succès !');
    console.log(`Login de test: yassine@test.com / password123`);
    process.exit(0);
  } catch (err) {
    console.error('❌ Erreur seed:', err);
    process.exit(1);
  }
}

seed();