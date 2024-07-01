/**
 * This will be the starting file of the project
 */

const mongoose = require("mongoose")

const express = require("express")

const app = express()

const db_config = require("./configs/db.config")

const server_config = require("./configs/server.config")

const user_model = require("./models/user.model")

const bcrypt = require("bcryptjs")

app.use(express.json())

/**
 * Create an admin user at the starting of the application
 * if not already present
 */

// Connection with mongoDB
mongoose.connect(db_config.DB_URL)

const db = mongoose.connection

db.on("error", () => {
    console.log("Error while connecting to the mongoDB")
})

db.once("open", () => {
    console.log("Connected to MongoDB")

    init()
})

async function init() {
    try {
        let user = await user_model.findOne({ userId: "admin" })
    
        if (user) {
            console.log("Admin is already present")
            return
        }
    } catch (err) {
        console.log("Error while reading the data", err)
    }

    try {
        user = await user_model.create({
            name: "Sajid",
            userId: "admin",
            email: "mdsajid7908@gmail.com",
            userType: "ADMIN",
            password: bcrypt.hashSync("Welcome1",8)
        })
        console.log("Admin created", user)


    } catch (err) {
        console.log("Error while creating an admin",err)
    }
}

/**
 * Stich the rout to the server
 */
require("./routes/auth.routes")(app)



/**
 * Start the server
 */

app.listen(server_config.PORT, () => {
    console.log("Server Started at port num :", server_config.PORT)
})