var mongoose = require('mongoose');
// connect db 
const dotenv = require('dotenv');
dotenv.config();

mongoose.set('strictQuery', true);

mongoose.connect(process.env.DATABASE_URL)
    .then(() => console.log("db connected"))
    .catch((err) => console.log("Not connected"))
module.exports = mongoose;