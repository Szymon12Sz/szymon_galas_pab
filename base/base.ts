import mongoose from "mongoose";

const connString = `mongodb+srv://Mongo:Mongo@cluster0.llvas7c.mongodb.net/?retryWrites=true&w=majority`;

export async function database() {
  console.log("Laczenie z mongo");
  const database = await mongoose.connect(connString);
  console.log("Mongo polaczone!");
}


