import express from "express";
const router = express.Router();

const Restauracje = require("../models/restauracje");

//Wyswietlanie listy wszystkich dań

router.get("/", async (req:any, res:any) => {
  try {
    const restauracje = await Restauracje.find();
    res.json(restauracje);
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

//Wyswietlenie konkretnego dania

router.get("/:id", async (req:any, res:any) => {
  try {
    const restauracje = await Restauracje.findById(req.params.id);

    if (!restauracje) throw Error("Restauracje nie zostalo znalezione");
    res.status(200).json(restauracje);

    console.log(`Restauracje o podanym id:${req.params.id} zostalo zwrocone do bazy danych!`);
  } catch (error) {
    res.status(400).json({ message: error });
  }
});


//Dodawanie dań do bazy danych

router.post("/", async (req:any, res:any) => {
    const NoweRestauracje = new Restauracje({
        nazwa: req.body.nazwa,
        adres: req.body.adres,
        telefon: req.body.telefon,
        NIP: req.body.NIP,
        email: req.body.email,
        www: req.body.www,
    });
    const ZapiszRestauracje = await NoweRestauracje.save();
  
    try {
      res.status(200).json(ZapiszRestauracje);
    } catch (error) {
      res.status(400).json({ message: error });
    }
  });

//Usuwanie dania po ID

router.delete("/:id", async (req:any, res:any) => {
    try {
      const restauracje = await Restauracje.findByIdAndDelete(req.params.id);
  
      if (!restauracje) throw Error("No dish found!");
      res.status(200).json({ success: true });
  
      console.log(`Restauracje o podanym id:${req.params.id} usuniete z bazy danych!`);
    } catch (error) {
      res.status(400).json({ message: error });
    }
  });

//Usuwanie wszystkich dan

router.delete("/", async (req:any, res:any) => {
  try {
    const restauracje = await Restauracje.remove();

    if (!restauracje) throw Error("Poane restauracje nie zostalo znalezione!");
    res.status(200).json({ success: true });

    console.log(`Wszytskie dania zostaly pomsylnie usuniete!`);
  } catch (error) {
    res.status(400).json({ message: error });
  }
});
  
// Update dania po ID

router.put("/:id", async (req:any, res:any) => {
    try {
      const restauracje = await Restauracje.findByIdAndUpdate(
        req.params.id,
        req.body
      );
  
      if (!restauracje)
        throw Error("Nie udalo sie zaktualizowac podanego dania");
      res.status(200).json(req.body);
  
      console.log(`Restauracje o id:${req.params.id} zaktualizowane!`);
    } catch (error) {
      res.status(400).json({ message: error });
    }
  });


module.exports = router;
