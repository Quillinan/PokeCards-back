import { MongoClient } from "mongodb";
import "dotenv/config";

let databaseUrl;
const deploy = process.env.DEPLOY_DATABASE_URL;
const databaseName = process.env.DATABASE_NAME;
const databaseUrlPrefix = process.env.DATABASE_URL_PREFIX;

if (deploy) {
  databaseUrl = deploy;
} else {
  databaseUrl = `${databaseUrlPrefix}${databaseName}`;
}

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
