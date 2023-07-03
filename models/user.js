const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    required: true,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validator: {
      validator: (v) => validator.isEmail(v),
      message: 'Укажите верный e-mail',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});
// создаем модель и экспортируем ее
module.exports = mongoose.model('user', userSchema);
