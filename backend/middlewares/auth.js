const jwt = require('jsonwebtoken');
const Unauthorized = require('../errors/unauthorizedError');
const { NODE_ENV, JWT_SECRET } = process.env;
module.exports = (req, res, next) => {
  const tokenCookie = req.cookies.jwt;

  if (!tokenCookie || !tokenCookie.startsWith('Bearer ')) {
    next(new Unauthorized('Необходима авторизация'));
  }
  const token = tokenCookie.replace('Bearer ', '');
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    next(new Unauthorized('Необходима авторизация'));
  }
  req.user = payload; // записываем пейлоуд в объект запроса
  next();
};
