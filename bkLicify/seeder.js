import Mongoose from "mongoose"
import dotenv from "dotenv"
import users from "./data/users.js"
import User from "./models/userModel.js"
import invoices from "./data/invoices.js"
import Invoice from "./models/invoiceModel.js"
import connectDB from "./config/db.js"

dotenv.config()

connectDB()

const importData = async () => {
    try {

        await User.deleteMany()
        await Invoice.deleteMany()

        const createdUsers = await User.insertMany(users)
        const createdInvoices = await Invoice.insertMany(invoices)



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