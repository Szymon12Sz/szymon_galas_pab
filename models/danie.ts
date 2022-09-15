import mongoose from "mongoose";

const ModelDanie = new mongoose.Schema({
  nazwa: {
    type: String,
    required: true,
  },
  cena: Number,
  kategoria: {
    type: String,
    enum: ["sniadanie", "danie glowne", "zupa", "deser", "napoj", "kolacja"]
  }
});

const Danie = mongoose.model('Danie', ModelDanie)
module.exports = Danie
