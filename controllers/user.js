const User = require('../models/user');
const bcrpyt = require('bcrypt');
const jwt = require('jsonwebtoken');
const ENV = require('../environment/environment');

exports.createUser = (req, res) => {
    bcrpyt.hash(req.body.password, 10)
        .then((hash) => {
            let user = new User({
                name: req.body.name,
                email: req.body.email,
                password: hash,
                creationDate: new Date(),
                modificationDate: new Date(),
                creationUser: 'admin',
                modificationUser: 'admin',
                active: true
            });

            user.save().then((savedUser) => {
                res.status(200).json({ "message": "Création de User bien réalisée", "user": savedUser });
            }).catch((err) => {
                res.status(405).json({ "message": "Erreur lors de la création de User, vérifier le body", "err": err });
            });
        }).catch(() => {
            res.status(500).json({ "message": "Erreur lors du chiffrement, vérifier le body", "err": err });
        })
}

exports.login = (req, res) => {
    User.findOne({ email: req.body.email })
        .then((user) => {
            bcrpyt.compare(req.body.password, user.password)
                .then((valid) => {
                    if (valid) {
                        const token = jwt.sign({ user: user }, ENV.RANDOM_TOKEN_SECRET, { expiresIn: '24h' });
                        res.status(200).json({ token: token });
                    } else {
                        res.status(401).json({ "message": "Bad credentials" });
                    }
                })
                .catch((err) => {
                    res.status(500).json({ "message": "Error with bcrypt ", "err": err });
                })


        }).catch(() => {
            res.status(404).json({ "message": "User not found" });
        })
}

exports.getUser = (req, res) => {
    const id = req.params.id;

    User.findById(id).then((user) => {
        res.status(200).json(user);
    }).catch((err) => {
        res.status(404).json({ "message": "Pas de User trouvé pour cet id", "err": err });
    });
}

exports.updateUser = (req, res) => {
    const id = req.params.id;

    req.body.modificationDate = new Date();
    User.updateOne({ _id: id }, req.body).then((updatedUser) => {
        res.status(200).json({ "message": "Modification de User bien réalisée", "user": updatedUser });
    }).catch((err) => {
        res.status(405).json({ "message": "Erreur lors de la modification de User, vérifier le body", "err": err });
    });
}

exports.deleteUser = (req, res) => {
    const id = req.params.id;

    User.findByIdAndDelete(id).then((result) => {
        if (result) {
            res.status(200).json({ "message": "Suppression de User bien réalisée" });
        } else {
            res.status(404).json({ "message": "Ce user n'existe pas" });
        }
    }).catch((err) => {
        res.status(404).json({ "message": "Erreur lors de la suppression de User", "err": err });
    });
}