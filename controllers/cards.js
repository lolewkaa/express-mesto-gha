const Card = require('../models/card');

const BadRequestError = require('../errors/bad-request-err');
const NotFoundError = require('../errors/not-found-err');
const ErrorForbidden = require('../errors/forbidden-error');

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(next);
};

const createCard = (req, res, next) => {
  const { _id } = req.user;
  const { name, link } = req.body;

  Card.create({ name, link, owner: _id })
    .then((card) => res.status(201).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданные данные некорректны'));
      } else {
        next(err);
      }
    });
};

const deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  const { _id } = req.user;

  Card.findById({
    _id: cardId,
  })
    .then((card) => {
      if (!card) throw new NotFoundError('Карточка не найдена');

      const { owner: cardUser } = card;
      if (cardUser.valueOf() !== _id) throw new ErrorForbidden('Попытка удалить чужую карточку');

      card.remove()
        .then(() => res.send(card))
        .catch(next);
    })
    .catch(next);
};

const putLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка не найдена');
      } else {
        res.send(card);
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданные данные некорректны'));
      } else {
        next(err);
      }
    });
};

const dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка не найдена');
      } else {
        res.send(card);
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданные данные некорректны'));
      } else {
        next(err);
      }
    });
};

module.exports = {
  createCard,
  getCards,
  deleteCard,
  putLike,
  dislikeCard,
};
