const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();
module.exports = createToken = async(data) => {
    const token = await jwt.sign(data, process.env.SECRET_KEY);
    return token;
}