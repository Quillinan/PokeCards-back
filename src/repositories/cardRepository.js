import { db } from "../app.js";

const cardRepository = {
  addCard: async (newCard) => {
    const Cards = db.collection("cards");
    await Cards.insertOne(newCard);
  },

  getAllCards: async () => {
    const Cards = db.collection("cards");
    return await Cards.find().toArray();
  },

  getUserCards: async (userId) => {
    const Cards = db.collection("cards");
    return await Cards.find({ ownerId: userId }).toArray();
  },
};

export default cardRepository;
