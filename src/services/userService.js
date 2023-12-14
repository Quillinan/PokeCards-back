import { invalidDataError } from "../errors/invalidDataError.js";
import userRepository from "../repositories/userRepository.js";
import { signUpSchema, signInSchema } from "../schemas/schemaUser.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userService = {
  signUp: async (user) => {
    const { error } = signUpSchema.validate(user);

    if (error) {
      throw invalidDataError(error.details[0].message);
    }

    const existingUserEmail = await userRepository.findUserByEmail(user.email);
    if (existingUserEmail) {
      throw invalidDataError("Email já cadastrado!");
    }

    const existingUserName = await userRepository.findUserByName(user.name);
    if (existingUserName) {
      throw invalidDataError("Nome já cadastrado!");
    }

    const hashedPassword = bcrypt.hashSync(user.password, 10);
    user.password = hashedPassword;

    await userRepository.createUser(user);
  },

  signIn: async (user) => {
    const { error } = signInSchema.validate(user);

    if (error) {
      throw invalidDataError(error.details[0].message);
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
      throw invalidDataError("Usuário não encontrado");
    }

    const checkPassword = bcrypt.compareSync(user.password, foundUser.password);
    if (!checkPassword) {
      throw invalidDataError("Senha incorreta");
    }

    const token = jwt.sign({ id: foundUser._id }, process.env.SECRET_KEY);

    return { message: "Usuário logado", token };
  },
};

export default userService;
