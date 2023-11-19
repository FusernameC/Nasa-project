const mongoose = require('mongoose');

require('dotenv').config();

const MONGO_URL = process.env.MONGO_URL || "mongodb+srv://nguyennguyen:AbcdxyZ@book.dhrkxva.mongodb.net/?retryWrites=true&w=majority";

mongoose.connection.once('open', () => {
    console.log('MongoDB connection ready!');
});

mongoose.connection.on('error', (err) => {
    console.log(err);
});

async function mongoConnect() {
    await mongoose.connect(MONGO_URL);
}

async function mongoDisconnect() {
    await mongoose.mongoDisconnect();
}

module.exports = {
    mongoConnect,
    mongoDisconnect,
}