const Card = require('../models/card');

const { ERROR_BAD_REQUEST, ERROR_NOT_FOUND, ERROR_DEFAULT } = require('../errors/errors')

const getCards = (req, res) => {

  Card.find({})
  .then((cards) => res.send(cards))
  .catch(() => {
    return res.status(ERROR_DEFAULT).send({
      'message': `Произошла неизвестная ошибка`
    } )
  })
}

const createCard = (req, res) => {
  const { _id } = req.user
  const { name, link } = req.body;

  Card.create({name, link, owner: _id})
  .then((card) => res.send(card))
  .catch((err) => {
    if (err.name === 'ValidationError') {
      res.status(ERROR_BAD_REQUEST).send({message: `Переданные данные некорректны`})
      return;
    } else {
      res.status(ERROR_DEFAULT).send({message: `Неизвестная ошибка`})
    }
  })
}

const deleteCard = (req,res) => {
  Card.findByIdAndRemove(req.params.cardId)
  //если ни один документ не соответствует заданному условию фильтра:
  .orFail(() => new Error('Not Found'))
  .then((card) => res.send(card))
  .catch((err) => {
    if (err.name === 'CastError') {
      res.status(ERROR_BAD_REQUEST).send({message: `Переданные данные некорректны`})
      return;
    } else if (err.message === 'Not Found') {
      res.status(ERROR_NOT_FOUND).send({message: `Переданные данные некорректны`})
      return;
    } else {
    res.status(ERROR_DEFAULT).send({message: `Неизвестная ошибка`})
    return;
    }
  })
}

const putLike = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
    )
    //если ни один документ не соответствует заданному условию фильтра:
  .orFail(() => new Error('Not Found'))
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ERROR_BAD_REQUEST).send({message: `Переданные данные некорректны`})
        return;
      } else if (err.message === 'Not Found') {
        res.status(ERROR_NOT_FOUND).send({message: `Переданные данные некорректны`})
        return;
      } else {
      res.status(ERROR_DEFAULT).send({message: `Неизвестная ошибка`})
      return;
      }
    })
}

const dislikeCard = (req, res) => {
Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id } }, // убрать _id из массива
  { new: true }
)
.orFail(() => new Error('Not Found'))
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ERROR_BAD_REQUEST).send({message: `Переданные данные некорректны`})
        return;
      } else if (err.message === 'Not Found') {
        res.status(ERROR_NOT_FOUND).send({message: `Переданные данные некорректны`})
        return;
      } else {
      res.status(ERROR_DEFAULT).send({message: `Неизвестная ошибка`})
      return;
      }
    })
}

module.exports = {
  createCard,
  getCards,
  deleteCard,
  putLike,
  dislikeCard,
}