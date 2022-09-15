const express = require("express");
const router = express.Router();

const Pracownik = require("../models/pracownik");

//Wyswietlenie listy pracownikow

router.get("/", async (req:any, res:any) => {
  try {
    const pracownik = await Pracownik.find();
    res.json(pracownik);
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

//Wyswietlenie konkretnego pracownika

router.get("/:id", async (req:any, res:any) => {
    try {
      const pracownik = await Pracownik.findById(req.params.id);
  
      if (!pracownik) throw Error("Pracownik nie zostal znaleziony!");
      res.status(200).json(pracownik);
  
      console.log(`Pracownik o podanym id:${req.params.id} zostal zwrocony do bazy danych!`);
    } catch (error) {
      res.status(400).json({ message: error });
    }
  });

//Dodawanie pracownika do bazy danych

router.post("/", async (req:any, res:any) => {
  const NowyPracownik = new Pracownik({
    imie: req.body.imie,
    nazwisko: req.body.nazwisko,
    stanowisko: req.body.stanowisko
  });
  const ZapiszPracownik = await NowyPracownik.save();

  try {
    res.status(200).json(ZapiszPracownik);
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

//Usuwanie pracownika po ID

router.delete("/:id", async (req:any, res:any) => {
    try {
      const pracownik = await Pracownik.findByIdAndDelete(req.params.id);
  
      if (!pracownik) throw Error("Nie znaleziono takiego pracownika!");
      res.status(200).json({ success: true });
  
      console.log(`Pracownik o podanym id :${req.params.id} zostal usuniety z bazy danych!`);
    } catch (error) {
      res.status(400).json({ message: error });
    }
  });

//Usuwanie wszystkich pracowników

  router.delete("/", async (req:any, res:any) => {
    try {
      const pracownik = await Pracownik.remove();
  
      if (!pracownik) throw Error("Pracownik nie zostal znaleziony!");
      res.status(200).json({ success: true });
  
      console.log(`Wszyscy pracownicy zostali usunieci z bazy danych!`);
    } catch (error) {
      res.status(400).json({ message: error });
    }
  });

// Update pracownika po ID

router.put("/:id", async (req:any, res:any) => {
    try {
      const pracownik = await Pracownik.findByIdAndUpdate(
        req.params.id,
        req.body
      );
  
      if (!pracownik)
        throw Error("Cos nie wyszlo podczas aktualizowania pracownikow!");
      res.status(200).json(req.body);
  
      console.log(`Pracownik o podanym id:${req.params.id} zostal zaktualizowany!`);
    } catch (error) {
      res.status(400).json({ message: error });
    }
  });

module.exports = router;
