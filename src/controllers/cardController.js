import cardService from "../services/cardService.js";

const cardController = {
  addCard: (req, res) => {
    cardService
      .addCard(req)
      .then((message) => res.status(201).json(message))
      .catch((err) => handleApplicationErrors(err, req, res));
  },

  getCards: (_, res) => {
    cardService
      .getAllCards()
      .then((allCards) => res.status(200).json(allCards))
      .catch((err) => handleApplicationErrors(err, _, res));
  },

  getUserCards: (req, res) => {
    const userId = req.user._id;
    cardService
      .getUserCards(userId)
      .then((userCards) => res.status(200).json(userCards))
      .catch((err) => handleApplicationErrors(err, req, res));
  },
};

export default cardController;
