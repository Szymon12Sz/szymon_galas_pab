import mongoose from "mongoose";

const ModelStolik = new mongoose.Schema({
  nazwa: {
    type: String,
    required: true,
  },
  iloscOsob: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    default: 'wolny'
  },
});

const Stolik = mongoose.model('Stolik', ModelStolik)
module.exports = Stolik
