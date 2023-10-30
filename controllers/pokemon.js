const Pokemon = require('../models/pokemon');
const logger = require('../logger');

exports.createPokemon = (req, res) => {
    let pokemon = new Pokemon({
        name: req.body.name,
        type1: req.body.type1,
        type2: req.body.type2,
        stats: req.body.stats,
        image: req.body.image,
        creationDate: new Date(),
        modificationDate: new Date(),
        creationUser: 'admin',
        modificationUser: 'admin',
        active: true
    });

    pokemon.save().then((savedPokemon) => {
        res.status(200).json({ "message": "Création de Pokemon bien réalisée", "pokemon": savedPokemon });
        logger.info({ message: savedPokemon.name + ' bien créé'});
    }).catch((err) => {
        logger.error({ message: 'Erreur à la création du pokemon'});
        res.status(405).json({ "message": "Erreur lors de la création de Pokemon, vérifier le body", "err": err });
    });
}

exports.getPokemon = (req, res) => {
    const id = req.params.id;

    Pokemon.findById(id).then((pokemon) => {
        logger.info({ message: pokemon.name + ' bien renvoyé'});
        res.status(200).json(pokemon);
    }).catch((err) => {
        logger.error({ message: id + ' introuvable'});
        res.status(404).json({ "message": "Pas de Pokemon trouvé pour cet id", "err": err });
    });
}

exports.updatePokemon = (req, res) => {
    const id = req.params.id;

    req.body.modificationDate = new Date();
    Pokemon.updateOne({ _id: id }, req.body).then((updatedPokemon) => {
        if (updatedPokemon) {
            logger.info({ message: id + ' bien mis à jour'});
            res.status(200).json({ "message": "Modification de Pokemon bien réalisée", "pokemon": updatedPokemon });
        } else {
            logger.error({ message: id + ' introuvable (modification)'});
            res.status(405).json({ "message": "Erreur lors de la modification de Pokemon, vérifier le body", "err": err });
        }
    }).catch((err) => {
        logger.error({ message: 'Erreur lors de la modification de ' + id + '; ID inexistant'});
        res.status(405).json({ "message": "Erreur lors de la modification de Pokemon, vérifier l'id'", "err": err });
    });
}

exports.deletePokemon = (req, res) => {
    const id = req.params.id;

    Pokemon.findByIdAndDelete(id).then((result) => {
        if (result) {
            logger.info({ message: id + ' bien supprimé'});
            res.status(200).json({ "message": "Suppression de Pokemon bien réalisée" });
        } else {
            logger.error({ message: 'Erreur lors de la suppression de ' + id});
            res.status(404).json({ "message": "Ce pokemon n'existe pas" });
        }
    }).catch((err) => {
        res.status(404).json({ "message": "Erreur lors de la suppression de Pokemon", "err": err });
    });
}

exports.getPokemonList = (req, res) => {
    Pokemon.find().then((pokemonList) => {
        logger.info({ message: 'Liste de pokemons bien retournée'});
        res.status(200).json(pokemonList);
    }).catch((err) => {
        logger.error({ message: 'Pas de résultat pour la liste de pokemons'});
        res.status(404).json({ "message": "Pas de Pokemon", "err": err });
    });
}