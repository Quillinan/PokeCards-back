import { cardSchema } from "../schemas/schemaCard.js";
import cardRepository from "../repositories/cardRepository.js";

const cardService = {
  addCard: async (req) => {
    const validationResult = cardSchema.validate(req.body);

    if (validationResult.error) {
      throw new Error(validationResult.error.details[0].message);
    }

    const { name, value } = req.body;

    const newCard = {
      name,
      value,
      ownerId: req.user._id,
      sold: false,
    };

    await cardRepository.addCard(newCard);
  },

  getAllCards: async () => {
    return await cardRepository.getAllCards();
  },

  getUserCards: async (userId) => {
    return await cardRepository.getUserCards(userId);
  },
};

export default cardService;
