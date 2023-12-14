import userService from "./userService.js";

const userController = {
  signUp: async (req, res) => {
    const { name, email, password } = req.body;
    await userService.signUp({ name, email, password });
    res.status(201).json({ message: "Usuário criado" });
  },

  signIn: async (req, res) => {
    const user = req.body;
    const result = await userService.signIn(user);
    res.status(200).json(result);
  },
};

export default userController;
