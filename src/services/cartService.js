import jwt from "jsonwebtoken";
import { invalidDataError } from "../errors/invalidDataError.js";
import cartRepository from "../repositories/cartRepository.js";

const cartService = {
  addToCart: async (token, cardId) => {
    const cart = await cartRepository.findCartByToken(token);

    if (!cart) {
      throw invalidDataError("Carrinho não encontrado");
    }

    const card = await cartRepository.findCardById(cardId);

    if (!card) {
      throw invalidDataError("Carta não encontrada");
    }

    await cartRepository.updateCartWithCard(cart._id, card);

    return { message: "Card adicionado ao carrinho com sucesso" };
  },

  checkout: async (token, userId) => {
    const cart = await cartRepository.findCartByToken(token);

    if (!cart) {
      throw invalidDataError("Carrinho não encontrado");
    }

    const cardIds = cart.cards.map((card) => new ObjectId(card._id));
    await cartRepository.updateCardsAsSold(cardIds);

    const newToken = jwt.sign({ id: userId }, process.env.SECRET_KEY);
    await cartRepository.insertNewCart(newToken);

    return { message: "Compra finalizada com sucesso", newToken };
  },
};

export default cartService;
