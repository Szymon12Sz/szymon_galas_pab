import express from "express";
import mongoose from "mongoose";
import { database } from "./base/base";
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());


//IMPORT ROUTES
const DanieRout = require("./routes/danie");
app.use("/danie", DanieRout);

const RestRout = require("./routes/restauracje");
app.use("/restauracja", RestRout);

const StolikRoute = require("./routes/stolik");
app.use("/stolik", StolikRoute);

const PracownikRoute = require("./routes/pracownik");
app.use("/pracownik", PracownikRoute);

const ZamowienieRoute = require("./routes/zamowienie");
app.use("/zamowienie", ZamowienieRoute);

const ProduktRoute = require("./routes/produkt");
app.use("/produkt", ProduktRoute);

const RezerwacjaRoute = require("./routes/rezerwacje");
app.use("/rezerwacja", RezerwacjaRoute);

//DATABASE CONNECTION
database();


app.listen(3005, () => console.log("Server dziala!"));
