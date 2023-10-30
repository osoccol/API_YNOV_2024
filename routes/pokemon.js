const express = require('express');
const router = express.Router(); // router intégré au framework Express
const pokemonController = require('../controllers/pokemon');
const logger = require('../middlewares/logger');
const auth = require('../middlewares/auth');

// Routes CRUD
router.get('/:id', [logger], pokemonController.getPokemon); // GET = READ = LECTURE
router.get('/', [logger], pokemonController.getPokemonList);

router.post('/', [logger, auth], pokemonController.createPokemon); // POST = CREATE = CREATION
router.put('/:id', [logger, auth], pokemonController.updatePokemon); // PUT = UPDATE = MODIFICATION
router.delete('/:id', [logger, auth], pokemonController.deletePokemon); // DELETE = DELETE = SUPPRESSION


module.exports = router;