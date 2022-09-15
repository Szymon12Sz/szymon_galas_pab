import express from "express";
const router = express.Router();

const Danie = require("../models/danie");

//Wyswietlanie listy wszystkich dań

router.get("/", async (req:any, res:any) => {
  try {
    const danie = await Danie.find();
    res.json(danie);
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

//Wyswietlenie konkretnego dania

router.get("/:id", async (req:any, res:any) => {
  try {
    const danie = await Danie.findById(req.params.id);

    if (!danie) throw Error("Danie nie zostalo znalezione");
    res.status(200).json(danie);

    console.log(`Danie o podanym id:${req.params.id} zostalo zwrocone do bazy danych!`);
  } catch (error) {
    res.status(400).json({ message: error });
  }
});
router.get("/hello", async (req:any, res:any) => {
  try {
    const danie = await Danie.find({kategoria: "zupa"});

    if (!danie) throw Error("Danie nie zostalo znalezione");
    res.status(200).json(danie);

    console.log(`Danie o podanym id:${req.params.id} zostalo zwrocone do bazy danych!`);
  } catch (error) {
    res.status(400).json({ message: error });
  }
});


//Dodawanie dań do bazy danych

router.post("/", async (req:any, res:any) => {
    const NoweDanie = new Danie({
      nazwa: req.body.nazwa,
      cena: req.body.cena,
      kategoria: req.body.kategoria
    });
    const ZapiszDanie = await NoweDanie.save();
  
    try {
      res.status(200).json(ZapiszDanie);
    } catch (error) {
      res.status(400).json({ message: error });
    }
  });

//Usuwanie dania po ID

router.delete("/:id", async (req:any, res:any) => {
    try {
      const danie = await Danie.findByIdAndDelete(req.params.id);
  
      if (!danie) throw Error("No dish found!");
      res.status(200).json({ success: true });
  
      console.log(`Danie o podanym id:${req.params.id} usuniete z bazy danych!`);
    } catch (error) {
      res.status(400).json({ message: error });
    }
  });

//Usuwanie wszystkich dan

router.delete("/", async (req:any, res:any) => {
  try {
    const danie = await Danie.remove();

    if (!danie) throw Error("Poane danie nie zostalo znalezione!");
    res.status(200).json({ success: true });

    console.log(`Wszytskie dania zostaly pomsylnie usuniete!`);
  } catch (error) {
    res.status(400).json({ message: error });
  }
});
  
// Update dania po ID

router.put("/:id", async (req:any, res:any) => {
    try {
      const danie = await Danie.findByIdAndUpdate(
      );
  
      if (!danie)
        throw Error("Nie udalo sie zaktualizowac podanego dania");
      res.status(200).json(req.body);
  
      console.log(`Danie o id:${req.params.id} zaktualizowane!`);
    } catch (error) {
      res.status(400).json({ message: error });
    }
  });


module.exports = router;
