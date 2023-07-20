require('dotenv').config();

const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const router = require('./routes');

const errorHandler = require('./middlewares/error-handler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { PORT, MONGO_DB } = require('./utils/constant');

// Слушаем 3000 порт
// const { PORT = 3000 } = process.env;

const app = express();

const corsOptions = {
  origin: ['http://localhost:3000', 'http://localhost:3001', 'https://lolewka.domainname.studen.nomoredomains.xyz', 'http://lolewka.domainname.studen.nomoredomains.xyz'],
};
app.use(cors(corsOptions));
// анализирует входящие запросы JSON и помещает проанализированные данные в файлы req.body
app.use(express.json());
app.use(requestLogger);
app.use(cookieParser());

// mongoose.connect('mongodb://127.0.0.1:27017/mestodb');
mongoose.connect(MONGO_DB);
app.use(router);
app.use(errorLogger);
app.use(errors());

app.use(errorHandler);

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
