# CLONE PROJECT
depuis un dossier choisi, taper la commande suivante
git clone "lien du clone"

# SE RENDRE DANS LE REPO CLONé
cd API_YNOV_2024

# INSTALLER DEPENDANCES 
npm install

# CREER UN REPO "environment" A LA RACINE DU PROJET

# CREER UN FICHIER environment.js DANS LE DOSSIER ENVIRONMENT
const ENV = {
    RANDOM_TOKEN_SECRET: 'xxxxxxxxx',
    PORT: 9999999,
    DB_ID: 'xxxxxxxxxx',
    DB_PW: 'xxxxxxxxxx',
}

module.exports = ENV

# REMPLACER LES VALEURS AVEC VOTRE PROPRE CONFIG

# DANS LE FICHIER app.js, ADAPTER LA BDD AVEC LA PHRASE DONNéE par MongoDB DANS DATABASE > CONNECT

# LANCER LE SERVER 
nodemon server.js
