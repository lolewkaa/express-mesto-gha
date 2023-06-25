const Card = require('../models/card');

const { ERROR_BAD_REQUEST, ERROR_NOT_FOUND, ERROR_DEFAULT } = require('../errors/errors')

const getCards = (req, res) => {

  Card.find({})
  .then((cards) => res.send(cards))
  .catch(err => {
    return res.status(ERROR_DEFAULT).send({
      "message": `Произошла неизвестная ошибка`,
      err: err.message
    } )
  })
}

const createCard = (req, res) => {
  const { _id } = req.user
  const { name, link } = req.body;

  Card.create({name, link, owner: _id})
  .then((card) => res.send(card))
  .catch((err) => {
    if (err.name === 'BadRequestError') {
      res.status(ERROR_BAD_REQUEST).send({message: `Переданные данные некорректны`})
      return;
    } else {
      res.status(ERROR_DEFAULT).send({message: `Неизвестная ошибка`, err: err.message})
    }
  })
}

const deleteCard = (req,res) => {
  Card.findOneAndRemove(req.params.cardId)
  //если ни один документ не соответствует заданному условию фильтра:
  .orFail(() => new Error('Document Not Found Error'))
  .then((card) => res.send(card))
  .catch((err) => {
    if (err.name === 'BadRequestError') {
      res.status(ERROR_BAD_REQUEST).send({message: `Переданные данные некорректны`})
      return;
    } else if (err.message === 'Not Found') {
      res.status(ERROR_NOT_FOUND).send({message: `Переданные данные некорректны`})
      return;
    } else {
    res.status(ERROR_DEFAULT).send({message: `Неизвестная ошибка`, err: err.message})
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
  .orFail(() => new Error('Document Not Found Error'))
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'BadRequestError') {
        res.status(ERROR_BAD_REQUEST).send({message: `Переданные данные некорректны`})
        return;
      } else if (err.message === 'Not Found') {
        res.status(ERROR_NOT_FOUND).send({message: `Переданные данные некорректны`})
        return;
      } else {
      res.status(ERROR_DEFAULT).send({message: `Неизвестная ошибка`, err: err.message})
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
.orFail(() => new Error('Document Not Found Error'))
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'BadRequestError') {
        res.status(ERROR_BAD_REQUEST).send({message: `Переданные данные некорректны`})
        return;
      } else if (err.message === 'Not Found') {
        res.status(ERROR_NOT_FOUND).send({message: `Переданные данные некорректны`})
        return;
      } else {
      res.status(ERROR_DEFAULT).send({message: `Неизвестная ошибка`, err: err.message})
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