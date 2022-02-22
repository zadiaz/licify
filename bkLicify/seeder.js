import Mongoose from "mongoose"
import dotenv from "dotenv"
import users from "./data/users.js"
import User from "./models/userModel.js"
import connectDB from "./config/db.js"

dotenv.config()

connectDB()

const importData = async () => {
    try {

        await User.deleteMany()

        const createdUsers = await User.insertMany(users)




        console.log('Datos importados')
        process.exit()

    } catch (error) {
        console.log(error.message)
        process.exit(1)
    }

}
const destroyData = async () => {
    try {
        await Article.deleteMany()
        await Brand.deleteMany()


        console.log('Datos eliminados')
        process.exit()

    } catch (error) {
        console.log(error.message)
        process.exit(1)

    }

}

if (process.argv[2] === '-d') {
    destroyData()
}
else {
    importData()
}