import { db } from "../app.js";
import { cardSchema } from "../schemas/schemaCard.js";

const cardController = {
  addCard: async (req, res) => {
    try {
      const validationResult = cardSchema.validate(req.body);

      if (validationResult.error) {
        return res
          .status(422)
          .json({ error: validationResult.error.details[0].message });
      }

      const { name, value } = req.body;

      const newCard = {
        name,
        value,
        ownerId: req.user._id,
      };

      const Cards = db.collection("cards");
      await Cards.insertOne(newCard);

      res.status(200).json({ message: "Carta adicionada com sucesso" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  getCards: async (_, res) => {
    try {
      const Cards = db.collection("cards");
      const allCards = await Cards.find().toArray();

      res.status(200).json(allCards);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

export default cardController;
