import { db } from "../app.js";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { ObjectId } from "mongodb";
import { invalidDataError } from "../errors/invalidDataError.js";

const verifyToken = async (req, _res, next) => {
  try {
    const token = req.headers.authorization?.replace("Bearer ", "");

    if (!token) {
      throw invalidDataError("Token não encontrado");
    }

    const decodedId = jwt.verify(token, process.env.SECRET_KEY);
    const id = new ObjectId(decodedId.id);

    const Users = db.collection("users");
    const user = await Users.findOne({ _id: id });

    if (!user) {
      throw invalidDataError("Usuário inválido");
    }

    req.user = {
      id: user._id,
      email: user.email,
    };

    next();
  } catch (error) {
    throw invalidDataError("Token inválido");
  }
};

export default verifyToken;
