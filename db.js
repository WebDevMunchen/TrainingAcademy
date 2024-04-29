const mongoose = require("mongoose")

const connectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.CONNECTION_STRING)
        console.log(`Mongo DB connected to: ${connect.connection.name}`)
    } catch (error) {
        console.log(error)
    }
}

connectDB()