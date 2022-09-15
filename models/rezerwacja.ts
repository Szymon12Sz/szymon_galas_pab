import mongoose from "mongoose";


const ModelRezerwacja = new mongoose.Schema({
  stolik: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Table',
  },
  odKiedy: {
    type: Date,
    default: Date.now(),
  },
  doKiedy: Date,
  klient: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Rezerwacja', ModelRezerwacja)
