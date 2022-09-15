import express from "express";
const router = express.Router();

const Stolik = require("../models/stolik");

//Wyswietlanie listy wszystkich dań

router.get("/", async (req:any, res:any) => {
  try {
    const stolik = await Stolik.find();
    res.json(stolik);
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

//Wyswietlenie konkretnego dania

router.get("/:id", async (req:any, res:any) => {
  try {
    const stolik = await Stolik.findById(req.params.id);

    if (!stolik) throw Error("Stolik nie zostalo znalezione");
    res.status(200).json(stolik);

    console.log(`Stolik o podanym id:${req.params.id} zostalo zwrocone do bazy danych!`);
  } catch (error) {
    res.status(400).json({ message: error });
  }
});


//Dodawanie dań do bazy danych

router.post("/", async (req:any, res:any) => {
    const NoweStolik = new Stolik({
        nazwa: req.body.nazwa,
        iloscOsob: req.body.iloscOsob,
        status: req.body.status,
    });
    const ZapiszStolik = await NoweStolik.save();
  
    try {
      res.status(200).json(ZapiszStolik);
    } catch (error) {
      res.status(400).json({ message: error });
    }
  });

//Usuwanie dania po ID

router.delete("/:id", async (req:any, res:any) => {
    try {
      const stolik = await Stolik.findByIdAndDelete(req.params.id);
  
      if (!stolik) throw Error("No dish found!");
      res.status(200).json({ success: true });
  
      console.log(`Stolik o podanym id:${req.params.id} usuniete z bazy danych!`);
    } catch (error) {
      res.status(400).json({ message: error });
    }
  });

//Usuwanie wszystkich dan

router.delete("/", async (req:any, res:any) => {
  try {
    const stolik = await Stolik.remove();

    if (!stolik) throw Error("Poane stolik nie zostalo znalezione!");
    res.status(200).json({ success: true });

    console.log(`Wszytskie dania zostaly pomsylnie usuniete!`);
  } catch (error) {
    res.status(400).json({ message: error });
  }
});
  
// Update dania po ID

router.put("/:id", async (req:any, res:any) => {
    try {
      const stolik = await Stolik.findByIdAndUpdate(
        req.params.id,
        req.body
      );
  
      if (!stolik)
        throw Error("Nie udalo sie zaktualizowac podanego dania");
      res.status(200).json(req.body);
  
      console.log(`Stolik o id:${req.params.id} zaktualizowane!`);
    } catch (error) {
      res.status(400).json({ message: error });
    }
  });


module.exports = router;
