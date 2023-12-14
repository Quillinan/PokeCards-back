import userRepository from "../repositories/userRepository.js";
import { signUpSchema, signInSchema } from "../schemas/schemaUser.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userService = {
  signUp: async (user) => {
    const { error } = signUpSchema.validate(user);

    if (error) {
      throw new Error(error.details[0].message);
    }

    const existingUserEmail = await userRepository.findUserByEmail(user.email);
    if (existingUserEmail) {
      throw new Error("Email já utilizado!");
    }

    const existingUserName = await userRepository.findUserByName(user.name);
    if (existingUserName) {
      throw new Error("Nome já utilizado!");
    }

    const hashedPassword = bcrypt.hashSync(user.password, 10);
    user.password = hashedPassword;

    await userRepository.createUser(user);
  },

  signIn: async (user) => {
    const { error } = signInSchema.validate(user);

    if (error) {
      throw new Error(error.details[0].message);
    }

    let foundUser;
    if (user.email || user.name) {
      if (user.email) {
        foundUser = await userRepository.findUserByEmail(user.email);
      } else {
        foundUser = await userRepository.findUserByName(user.name);
      }
    }

    if (!foundUser) {
      throw new Error("Usuário não cadastrado");
    }

    const checkPassword = bcrypt.compareSync(user.password, foundUser.password);
    if (!checkPassword) {
      throw new Error("Senha incorreta");
    }

    const token = jwt.sign({ id: foundUser._id }, process.env.SECRET_KEY);

    return { message: "Usuário logado", token };
  },
};

export default userService;
