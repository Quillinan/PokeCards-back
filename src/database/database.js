import { MongoClient } from "mongodb";
import "dotenv/config";

const databaseUrl = process.env.DATABASE_URL;

console.log(databaseUrl);
export const mongoClient = new MongoClient(databaseUrl);

const connectToDatabase = async () => {
  try {
    await mongoClient.connect();
    console.log("MongoDB conectado!");
  } catch (err) {
    console.error("Erro ao conectar ao MongoDB:", err.message);
  }
};

connectToDatabase();
