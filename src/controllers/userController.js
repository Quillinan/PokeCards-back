import { handleApplicationErrors } from "../middlewares/errorHandling.js";
import userService from "../services/userService.js";

const userController = {
  signUp: (req, res) => {
    const user = req.body;
    userService
      .signUp(user)
      .then((message) => res.status(201).json(message))
      .catch((err) => handleApplicationErrors(err, req, res));
  },

  signIn: (req, res) => {
    const user = req.body;
    userService
      .signIn(user)
      .then((result) => res.status(200).json(result))
      .catch((err) => handleApplicationErrors(err, req, res));
  },
};

export default userController;
