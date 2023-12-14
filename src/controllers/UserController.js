import userService from "../services/userService.js";

const userController = {
  signUp: async (req, res) => {
    // try {
    //   const { name, email, password } = req.body;
    //   await userService.signUp({ name, email, password });
    //   res.status(201).json({ message: "Usuário criado" });
    // } catch (error) {
    //   res.status(401).json({ error: error.message });
    // }
    const user = req.body;
    await userService.signUp(user);
    res.status(201).json({ message: "Usuário criado" });
  },

  signIn: async (req, res) => {
    const user = req.body;
    const result = await userService.signIn(user);
    res.status(200).json(result);
  },
};

export default userController;
