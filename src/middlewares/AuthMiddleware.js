import { db } from "../app.js";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { ObjectId } from "mongodb";

const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ error: "Token não fornecido" });
  }

  try {
    const decodedId = jwt.verify(token, process.env.SECRET_KEY);
    const id = new ObjectId(decodedId.id);

    const Users = db.collection("users");
    const user = await Users.findOne({ _id: id });

    if (!user) {
      return res.status(401).json({ error: "Usuário inválido" });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Token inválido" });
  }
};

export default verifyToken;
