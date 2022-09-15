import express from "express";
import mongoose from "mongoose";
const router = express.Router();

const Rezerwacje = require("../models/rezerwacja");
const Stolik = require("../models/stolik")

//Wyswietlanie listy wszystkich dań

router.get("/", async (req:any, res:any) => {
  try {
    const rezerwacje = await Rezerwacje.find();
    res.json(rezerwacje);
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

//Wyswietlenie konkretnego dania

router.get("/:id", async (req:any, res:any) => {
  try {
    const rezerwacje = await Rezerwacje.findById(req.params.id);

    if (!rezerwacje) throw Error("Rezerwacje nie zostalo znalezione");
    res.status(200).json(rezerwacje);

    console.log(`Rezerwacje o podanym id:${req.params.id} zostalo zwrocone do bazy danych!`);
  } catch (error) {
    res.status(400).json({ message: error });
  }
});


//Dodawanie dań do bazy danych

router.post("/", async (req:any, res:any) => {
    const NoweRezerwacje = new Rezerwacje({
        stolik: new mongoose.Types.ObjectId(req.body.stolik),
        odKiedy: req.body.odKiedy,
        doKiedy: req.body.doKiedy,
        klient: req.body.klient
    });
    const ZapiszRezerwacje = await NoweRezerwacje.save();
  
    try {
      res.status(200).json(ZapiszRezerwacje);
    } catch (error) {
      res.status(400).json({ message: error });
    }
  });

  router.post("/free", async(req:any,res:any) =>{
    const stolik = await Stolik.find({status: "wolny",iloscOsob: req.body.iloscOsob});
    const rezerwacje = await Rezerwacje.find({start: req.body.start, _id: stolik._id});
    if(rezerwacje.length == 0)
      res.json(stolik)
    else
      res.send('Te stoliki sa wolne')
  });

//Usuwanie dania po ID

router.delete("/:id", async (req:any, res:any) => {
    try {
      const rezerwacje = await Rezerwacje.findByIdAndDelete(req.params.id);
  
      if (!rezerwacje) throw Error("No dish found!");
      res.status(200).json({ success: true });
  
      console.log(`Rezerwacje o podanym id:${req.params.id} usuniete z bazy danych!`);
    } catch (error) {
      res.status(400).json({ message: error });
    }
  });

//Usuwanie wszystkich dan

router.delete("/", async (req:any, res:any) => {
  try {
    const rezerwacje = await Rezerwacje.remove();

    if (!rezerwacje) throw Error("Poane rezerwacje nie zostalo znalezione!");
    res.status(200).json({ success: true });

    console.log(`Wszytskie dania zostaly pomsylnie usuniete!`);
  } catch (error) {
    res.status(400).json({ message: error });
  }
});
  
// Update dania po ID

router.put("/:id", async (req:any, res:any) => {
    try {
      const rezerwacje = await Rezerwacje.findByIdAndUpdate(
        req.params.id,
        req.body
      );
  
      if (!rezerwacje)
        throw Error("Nie udalo sie zaktualizowac podanego dania");
      res.status(200).json(req.body);
  
      console.log(`Rezerwacje o id:${req.params.id} zaktualizowane!`);
    } catch (error) {
      res.status(400).json({ message: error });
    }
  }); 


module.exports = router;
