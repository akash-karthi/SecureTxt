const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const mongoURI = "mongodb://0.0.0.0:27017"

const connectToMongo = () => {
    mongoose.connect(mongoURI, {})
        .then(console.log("Connected"))
}

module.exports = connectToMongo;