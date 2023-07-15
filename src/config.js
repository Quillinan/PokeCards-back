import fs from "fs";
import { v4 as uuid } from "uuid";

const secretKeyFilePath = "secretKey.txt";

let savedSecretKey;

try {
  savedSecretKey = fs.readFileSync(secretKeyFilePath, "utf8");
  console.log("Secret key loaded from file");
} catch (error) {
  savedSecretKey = uuid();
  fs.writeFileSync(secretKeyFilePath, savedSecretKey, "utf8");
  console.log("Secret key generated and saved to file");
}

export const secretKey = savedSecretKey;
