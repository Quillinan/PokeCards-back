import { db } from "../app.js";
import { ObjectId } from "mongodb";
import jwt from "jsonwebtoken";
import { secretKey } from "../config.js";

const cartController = {
  addToCart: async (req, res) => {
    try {
      const token = req.headers.authorization?.replace("Bearer ", "");

      const Carts = db.collection("carts");
      const Cards = db.collection("cards");

      const cart = await Carts.findOne({ token });

      if (!cart) {
        return res.status(404).json({ error: "Carrinho não encontrado" });
      }

      const cardId = req.body.cardId;
      const card = await Cards.findOne({ _id: new ObjectId(cardId) });

      if (!card) {
        return res.status(404).json({ error: "Card não encontrado" });
      }

      await Carts.updateOne({ _id: cart._id }, { $push: { cards: card } });

      res
        .status(200)
        .json({ message: "Card adicionado ao carrinho com sucesso" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  checkout: async (req, res) => {
    try {
      const token = req.headers.authorization?.replace("Bearer ", "");

      const Carts = db.collection("carts");
      const Cards = db.collection("cards");

      const cart = await Carts.findOne({ token });

      if (!cart) {
        return res.status(404).json({ error: "Carrinho não encontrado" });
      }

      const cardIds = cart.cards.map((card) => new ObjectId(card._id));

      await Cards.deleteMany({ _id: { $in: cardIds } });

      const userId = req.user._id;
      const newToken = jwt.sign({ id: userId }, secretKey);

      const newCart = {
        token: newToken,
      };
      await Carts.insertOne(newCart);

      res
        .status(200)
        .json({ message: "Compra finalizada com sucesso", newToken });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  removeFromCart: async (req, res) => {
    try {
      const token = req.headers.authorization?.replace("Bearer ", "");
      const cardId = req.body.cardId;

      const Carts = db.collection("carts");

      const cart = await Carts.findOneAndUpdate(
        { token },
        { $pull: { cards: { _id: new ObjectId(cardId) } } },
        { returnOriginal: false }
      );

      if (!cart) {
        return res.status(404).json({ error: "Carrinho não encontrado" });
      }

      res
        .status(200)
        .json({ message: "Carta removida do carrinho com sucesso" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  getCardsOnCart: async (req, res) => {
    try {
      const token = req.headers.authorization?.replace("Bearer ", "");

      const Carts = db.collection("carts");
      const Cards = db.collection("cards");

      const cart = await Carts.findOne({ token });

      if (!cart) {
        return res.status(404).json({ error: "Carrinho não encontrado" });
      }

      if (!cart.cards || cart.cards.length === 0) {
        return res.status(200).json({ cards: [] });
      }

      const cardIds = cart.cards.map((card) => card._id);

      const cards = await Cards.find({ _id: { $in: cardIds } }).toArray();

      res.status(200).json({ cards });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  getCarts: async (req, res) => {
    try {
      const userId = req.user._id;
      const Carts = db.collection("carts");

      const carts = await Carts.find().toArray();
      const validCarts = [];

      for (const cart of carts) {
        const decodedToken = jwt.verify(cart.token, secretKey);
        if (decodedToken.id == userId && cart.cards) {
          validCarts.push(cart);
        }
      }

      res.status(200).json({ carts: validCarts });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

export default cartController;
