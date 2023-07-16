import { db } from "../app.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { signInSchema, signUpSchema } from "../schemas/schemaUser.js";
import { secretKey } from "../config.js";

const userController = {
  signUp: async (req, res) => {
    try {
      const { name, email, password } = req.body;

      const { error } = signUpSchema.validate(req.body);

      if (error) {
        return res.status(422).json({ error: error.details[0].message });
      }

      const Users = db.collection("users");
      const existingUser = await Users.findOne({ email });
      if (existingUser) {
        return res.status(409).json({ error: "Email já utilizado!" });
      }

      const hashedPassword = bcrypt.hashSync(password, 10);

      const newUser = {
        name,
        email,
        password: hashedPassword,
      };

      await Users.insertOne(newUser);
      res.status(201).json({ message: "Usuário criado" });
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  },
  signIn: async (req, res) => {
    try {
      const { email, name, password } = req.body;

      const Users = db.collection("users");
      const Carts = db.collection("carts");

      let user;
      if (email || name) {
        const { error } = signInSchema.validate({ email, name, password });

        if (error) {
          return res.status(422).json({ error: error.details[0].message });
        }

        if (email) {
          user = await Users.findOne({ email });
        } else {
          user = await Users.findOne({ name });
        }
      }

      if (!user) {
        return res.status(404).json({ error: "Usuário não cadastrado" });
      }

      const checkPassword = bcrypt.compareSync(password, user.password);
      if (!checkPassword) {
        return res.status(401).json({ error: "Senha incorreta" });
      }

      const token = jwt.sign({ id: user._id }, secretKey);

      const NewCart = {
        token,
      };
      await Carts.insertOne(NewCart);

      res.status(200).json({ message: "Usuário logado", token });
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  },
};

export default userController;
