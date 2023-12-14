import cardService from "../services/cardService.js";

const cardController = {
  addCard: async (req, res) => {
    try {
      await cardService.addCard(req);
      res.status(201).json({ message: "Carta adicionada com sucesso" });
    } catch (error) {
      res.status(422).json({ error: error.message });
    }
  },

  getCards: async (_, res) => {
    try {
      const allCards = await cardService.getAllCards();
      res.status(200).json(allCards);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getUserCards: async (req, res) => {
    try {
      const userId = req.user._id;
      const userCards = await cardService.getUserCards(userId);
      res.status(200).json(userCards);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

export default cardController;
