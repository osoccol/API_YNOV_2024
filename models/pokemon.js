const mongoose = require('mongoose');

const pokemonSchema = mongoose.Schema({
    name: {type:String, required: true},
    type1: {type:String, required: true},
    type2: {type:String, required: false},
    stats: {type:Map, required: true},
    image: {type:String, required: false},
    creationDate: {type:Date, required: true},
    modificationDate: {type:Date, required: true},
    creationUser: {type:String, required: true},
    modificationUser: {type:String, required: true},
    active: {type:Boolean, required: true},
});

module.exports = mongoose.model('Pokemon', pokemonSchema);