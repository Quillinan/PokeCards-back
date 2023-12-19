import { cardSchema } from "../schemas/schemaCard.js";
import cardRepository from "../repositories/cardRepository.js";
import { invalidDataError } from "../errors/invalidDataError.js";
import { notFoundError } from "../errors/notFoundError.js";

const cardService = {
  addCard: async (req) => {
    const validationResult = cardSchema.validate(req.body);

    if (validationResult.error) {
      throw invalidDataError(validationResult.error.details[0].message);
    }

    const { name, value } = req.body;

    const newCard = {
      name,
      value,
      ownerId: req.user._id,
      sold: false,
    };

    await cardRepository.addCard(newCard);

    return { message: "Carta adicionada com sucesso" };
  },

  getAllCards: async () => {
    const cards = await cardRepository.getAllCards();
    if (cards.length === 0) {
      throw notFoundError;
    }
    return cards;
  },

  getUserCards: async (userId) => {
    const userCards = await cardRepository.getUserCards(userId);
    if (userCards.length === 0) {
      throw notFoundError;
    }
    return userCards;
  },
};

export default cardService;
