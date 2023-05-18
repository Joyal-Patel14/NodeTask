const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
require('dotenv').config();

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[0]
    // console.log(token);
    const decoded = await jwt.verify(token, process.env.SECRET_KEY);
    // console.log('token',token);
    // console.log(decoded)
    req.userdata = decoded
    next()
  } catch (err) {
    return res.status(401).json({
      message: 'Auth fail',
    })
  }
}
