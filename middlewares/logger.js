const logger = require('../logger');

module.exports = (req, res, next) => { // next() sert à passer le relai aux autres middlewares et fonctions.
    try {
        logger.warning({message: req.method + ' ' + req.baseUrl + req.path})
        next();
    } catch {
        res.status(501).json({message: 'Erreur au niveau du logger'})
    }
}