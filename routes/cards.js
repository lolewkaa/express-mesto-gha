const router = require('express').Router();
const {
  validationCreateCard, validationDeleteCard, validationDislikeCard, validationPutLike,
} = require('../utils/regex');
const {
  createCard,
  getCards,
  deleteCard,
  putLike,
  dislikeCard,
} = require('../controllers/cards');

router.post('/', validationCreateCard, createCard);
router.get('/', getCards);
router.delete('/:cardId', validationDeleteCard, deleteCard);
router.put('/:cardId/likes', validationPutLike, putLike);
router.delete('/:cardId/likes', validationDislikeCard, dislikeCard);

module.exports = router;
