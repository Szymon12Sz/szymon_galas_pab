import express from "express";
import mongoose from "mongoose";
const router = express.Router();

const Zamowienie = require("../models/zamowienie");

//Wyswietlanie listy wszystkich dań

router.get("/", async (req:any, res:any) => {
  try {
    const zamowienie = await Zamowienie.find();
    res.json(zamowienie);
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

//Wyswietlenie konkretnego dania

router.get("/:id", async (req:any, res:any) => {
  try {
    const zamowienie = await Zamowienie.findById(req.params.id);

    if (!zamowienie) throw Error("Zamowienie nie zostalo znalezione");
    res.status(200).json(zamowienie);

    console.log(`Zamowienie o podanym id:${req.params.id} zostalo zwrocone do bazy danych!`);
  } catch (error) {
    res.status(400).json({ message: error });
  }
});
router.get("/hello", async (req:any, res:any) => {
  try {
    const zamowienie = await Zamowienie.find({kategoria: "zupa"});

    if (!zamowienie) throw Error("Zamowienie nie zostalo znalezione");
    res.status(200).json(zamowienie);

    console.log(`Zamowienie o podanym id:${req.params.id} zostalo zwrocone do bazy danych!`);
  } catch (error) {
    res.status(400).json({ message: error });
  }
});


router.get("/table-raport/:id", async (req:any, res:any) => {
    try {
      const zamowienie = await Zamowienie.find({ stolik: req.params.id });
  
      if (!zamowienie) throw Error("No order found to this table!");
      res.status(200).json(zamowienie);
  
      console.log(`Orders returned from database!`);
    } catch (error) {
      res.status(400).json({ message: error });
    }
  });
  
  //Raport zamowien per kelner (jako parametr podane id pracownika)
  
  router.get("/waiter-raport/:id", async (req:any, res:any) => {
    try {
      const zamowienie = await Zamowienie.find({ pracownik: req.params.id });
  
      if (!zamowienie) throw Error("No order found to this waiter!");
      res.status(200).json(zamowienie);
  
      console.log(`Order id:${req.params.id} returned from database!`);
    } catch (error) {
      res.status(400).json({ message: error });
    }
  });


//Dodawanie dań do bazy danych

router.post("/", async (req:any, res:any) => {
    const NoweZamowienie = new Zamowienie({
        pracownik: new mongoose.Types.ObjectId(req.body.pracownik),
        pozycje: req.body.pozycje,
        statusZamowienia: req.body.statusZamowienia,
        stolik: new mongoose.Types.ObjectId(req.body.stolik),
        kwota: req.body.kwota,
    });
    const ZapiszZamowienie = await NoweZamowienie.save();
  
    try {
      res.status(200).json(ZapiszZamowienie);
    } catch (error) {
      res.status(400).json({ message: error });
    }
  });

//Usuwanie dania po ID

router.delete("/:id", async (req:any, res:any) => {
    try {
      const zamowienie = await Zamowienie.findByIdAndDelete(req.params.id);
  
      if (!zamowienie) throw Error("No dish found!");
      res.status(200).json({ success: true });
  
      console.log(`Zamowienie o podanym id:${req.params.id} usuniete z bazy danych!`);
    } catch (error) {
      res.status(400).json({ message: error });
    }
  });

//Usuwanie wszystkich dan

router.delete("/", async (req:any, res:any) => {
  try {
    const zamowienie = await Zamowienie.remove();

    if (!zamowienie) throw Error("Poane zamowienie nie zostalo znalezione!");
    res.status(200).json({ success: true });

    console.log(`Wszytskie dania zostaly pomsylnie usuniete!`);
  } catch (error) {
    res.status(400).json({ message: error });
  }
});
  
// Update dania po ID

router.put("/:id", async (req:any, res:any) => {
    try {
      const zamowienie = await Zamowienie.findByIdAndUpdate(
      );
  
      if (!zamowienie)
        throw Error("Nie udalo sie zaktualizowac podanego dania");
      res.status(200).json(req.body);
  
      console.log(`Zamowienie o id:${req.params.id} zaktualizowane!`);
    } catch (error) {
      res.status(400).json({ message: error });
    }
  });


module.exports = router;
