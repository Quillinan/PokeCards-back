import { ObjectId } from "mongodb";
import { db } from "../app";

export const cartRepository = {
  findCartByToken: async (token) => {
    const Carts = db.collection("carts");
    return await Carts.findOne({ token });
  },

  findCardById: async (cardId) => {
    const Cards = db.collection("cards");
    return await Cards.findOne({ _id: new ObjectId(cardId) });
  },

  updateCartWithCard: async (cartId, card) => {
    const Carts = db.collection("carts");
    return await Carts.updateOne({ _id: cartId }, { $push: { cards: card } });
  },

  updateCardsAsSold: async (cardIds) => {
    const Cards = db.collection("cards");
    return await Cards.updateMany(
      { _id: { $in: cardIds } },
      { $set: { sold: true } }
    );
  },

  insertNewCart: async (newToken) => {
    const Carts = db.collection("carts");
    return await Carts.insertOne({ token: newToken });
  },
};
