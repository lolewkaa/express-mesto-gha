const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes');


const { ERROR_NOT_FOUND } = require('./errors/errors');
// Слушаем 3000 порт
const { PORT = 3000 } = process.env;

const app = express();

//анализирует входящие запросы JSON и помещает проанализированные данные в файлы req.body
app.use(express.json())

app.use((req, res, next) => {
  req.user = {
    _id: '6496c47823804919e826e3e8' // вставьте сюда _id созданного в предыдущем пункте пользователя
  };

  next();
});

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');
app.use(router)
app.use('/', (reg, res) => {
  res.status(ERROR_NOT_FOUND).send({ message: 'Что-то пошло не так...'});
});

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`)
})