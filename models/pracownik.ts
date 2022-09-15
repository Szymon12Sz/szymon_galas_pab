import mongoose from "mongoose";

const ModelPracownik = new mongoose.Schema({
  imie: {
    type: String,
    require: true,
  },
  nazwisko: {
    type: String,
    require: true,
  },
  stanowisko: {
    type: String,
    enum: ["kelner", "wlasciciel", "menager", "barman"],
    required: true,
    

  }
});


const Pracownik = mongoose.model('Pracownik', ModelPracownik)
module.exports = Pracownik

