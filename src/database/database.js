import { MongoClient } from "mongodb";
import "dotenv/config";

const databaseName = process.env.DATABASE_NAME;
const databaseUrlPrefix = process.env.DATABASE_URL_PREFIX;
const databaseUrl = `${databaseUrlPrefix}${databaseName}`;

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
