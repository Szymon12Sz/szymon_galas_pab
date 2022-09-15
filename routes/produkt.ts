import express from "express";
const router = express.Router();

const Produkt = require("../models/produkt");

//Wyswietlenie listy wszystkich produktow z sortowanieowaniem i paginacją "?page=1&limit=2" - paginacja "?page=1&limit=2&sortowanie=1" - paginacja i sortowanieowanie

router.get("/", async (req:any, res:any) => {

    const page = req.query.page
    const limit = req.query.limit
    const sortowanie = req.query.sortowanie

    try {
      //const produkt = await Produkt.find();
      const produkt1 = await Produkt.find().skip((page-1)*limit).limit(limit).sortowanie({ "nazwa": sortowanie });
      //res.json(produkt);
      res.json(produkt1);
    } catch (error) {
      res.status(400).json({ message: error });
    }
  });

//Wyswietlenie konkretnego produktu

router.get("/:id", async (req:any, res:any) => {
  try {
    const produkt = await Produkt.findById(req.params.id);

    if (!produkt) throw Error("Produkt nie zostal znaleziony!");
    res.status(200).json(produkt);

    console.log(`Produkt o podanym id:${req.params.id} zostal zwrocony do bazy danych!`);
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

//Dodawanie produktów do bazy danych

router.post("/", async (req:any, res:any) => {
    const NowyProdukt = new Produkt({
      nazwa: req.body.nazwa,
      cena: req.body.cena,
      ilosc: req.body.ilosc,
      jednostkaMiary: req.body.jednostkaMiary
    });
    const ZapiszProdukt = await NowyProdukt.save();
  
    try {
      res.status(200).json(ZapiszProdukt);
    } catch (error) {
      res.status(400).json({ message: error });
    }
  });

//Zglaszanie zapotrzebowania na produkty

router.post("/kupic", async (req:any, res:any) => {
  const NowyProdukt = new Produkt({
    nazwa: req.body.nazwa,
    cena: req.body.cena,
    ilosc: req.body.ilosc,
    jednostkaMiary: req.body.jednostkaMiary
  });
  const ZapiszProdukt = await NowyProdukt.save();

  try {
    res.status(200).json(ZapiszProdukt);
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

//Usuwanie produktu po ID

router.delete("/:id", async (req:any, res:any) => {
    try {
      const produkt = await Produkt.findByIdAndDelete(req.params.id);
  
      if (!produkt) throw Error("Nie znaleziono takiego produktu!");
      res.status(200).json({ success: true });
  
      console.log(`Produkt o podanym id :${req.params.id} zostal usuniety z bazy danych!`);
    } catch (error) {
      res.status(400).json({ message: error });
    }
  });
  
//Usuwanie wszystkich produktów

router.delete("/", async (req:any, res:any) => {
  try {
    const produkt = await Produkt.remove();

    if (!produkt) throw Error("Produkt nie zostal znaleziony!");
    res.status(200).json({ success: true });

    console.log(`Wszystkie produkty zostali usunieci z bazy danych!`);
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

// Update produktu po ID

router.put("/:id", async (req:any, res:any) => {
    try {
      const produkt = await Produkt.findByIdAndUpdate(
        req.params.id,
        req.body
      );
  
      if (!produkt)
        throw Error("Cos nie wyszlo podczas aktualizowania produktow!");
      res.status(200).json(req.body);
  
      console.log(`Produkt o podanym id:${req.params.id} zostal zaktualizowany!`);
    } catch (error) {
      res.status(400).json({ message: error });
    }
  });

module.exports = router;
