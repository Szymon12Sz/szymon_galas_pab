import mongoose from "mongoose";

const ModelRestauracja = new mongoose.Schema({
    nazwa: {
        type: String,
        require: true,
    },
    adres: {
        type: String,
        require: true,
    },
    telefon: {
        type: String,
        require: true,
    },
    email: String,
    www: String,

})

module.exports = mongoose.model('Restauracja', ModelRestauracja)
