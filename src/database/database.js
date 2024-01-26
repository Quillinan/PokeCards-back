import { MongoClient } from "mongodb";
import "dotenv/config";

export const mongoClient = new MongoClient(process.env.DATABASE_URL);

const connectToDatabase = async () => {
  try {
    await mongoClient.connect();
    console.log("MongoDB conectado!");
  } catch (err) {
    console.error("Erro ao conectar ao MongoDB:", err.message);
  }
};

connectToDatabase();
