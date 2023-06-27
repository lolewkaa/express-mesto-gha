const router = require("express").Router();

const {
  createCard,
  getCards,
  deleteCard,
  putLike,
  dislikeCard,
} = require("../controllers/cards");

router.post("/", createCard);
router.get("/", getCards);
router.delete("/:cardId", deleteCard);
router.put("/:cardId/likes", putLike);
router.delete("/:cardId/likes", dislikeCard);

module.exports = router;
