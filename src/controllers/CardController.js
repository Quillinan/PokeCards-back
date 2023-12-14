import cardService from "../services/cardService.js";

const cardController = {
  addCard: async (req, res) => {
    await cardService.addCard(req);
    res.status(201).json({ message: "Carta adicionada com sucesso" });
  },

  getCards: async (_, res) => {
    const allCards = await cardService.getAllCards();
    res.status(200).json(allCards);
  },

  getUserCards: async (req, res) => {
    const userId = req.user._id;
    const userCards = await cardService.getUserCards(userId);
    res.status(200).json(userCards);
  },
};

export default cardController;
