import { db } from "../app.js";
import jwt from "jsonwebtoken";

const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: "Token não fornecido" });
  }

  try {
    const decodedToken = jwt.verify(token, secretKey);
    const userId = decodedToken.userId;

    const Users = db.collection("users");
    const user = await Users.findOne({ _id: userId });

    if (!user) {
      return res.status(401).json({ error: "Usuário inválido" });
    }

    req.userId = userId;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Token inválido" });
  }
};

export default verifyToken;
