import mongoose from "mongoose";



const ModelProdukt = new mongoose.Schema({
  nazwa: {
    type: String,
    required: true,
  },
  cena: Number,
  ilosc: Number,
  jednostkaMiary: {
    type: String,
    
  },
});

module.exports = mongoose.model('Produkt1', ModelProdukt)
