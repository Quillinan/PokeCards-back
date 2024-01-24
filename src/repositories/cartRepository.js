import { ObjectId } from "mongodb";
import { db } from "../app.js";

export const cartRepository = {
  findCartByToken: async (token) => {
    const Carts = db.collection("carts");
    return await Carts.findOne({ token });
  },

  findCardById: async (cardId) => {
    const Cards = db.collection("cards");
    return await Cards.findOne({ _id: new ObjectId(cardId) });
  },

  updateCardsAsSold: async (cardIds) => {
    const Cards = db.collection("cards");
    return await Cards.updateMany(
      { _id: { $in: cardIds } },
      { $set: { sold: true } }
    );
  },

  findCartByToken: async (token) => {
    const Carts = db.collection("carts");
    return await Carts.findOne({ token });
  },

  updateCartWithCard: async (cartId, card) => {
    const Carts = db.collection("carts");
    return await Carts.updateOne({ _id: cartId }, { $push: { cards: card } });
  },

  insertNewCart: async (newToken) => {
    const Carts = db.collection("carts");
    return await Carts.insertOne({ token: newToken });
  },
};

export default cartRepository;
