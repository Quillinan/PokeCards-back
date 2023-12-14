import { db } from "../app.js";

const userRepository = {
  createUser: async (user) => {
    const Users = db.collection("users");
    return await Users.insertOne(user);
  },

  findUserByEmail: async (email) => {
    const Users = db.collection("users");
    return await Users.findOne({ email });
  },

  findUserByName: async (name) => {
    const Users = db.collection("users");
    return await Users.findOne({ name });
  },
};

export default userRepository;
