import Invoice from "../models/invoiceModel.js"
import asyncHandler from "express-async-handler"

const getInvoices = asyncHandler(async (req, res) => {

    const invoices = await Invoice.find({ status: { $lt: 300 } })

    if (invoices) {
        res.json(
            invoices
        )
    }
})

const getInvoice = asyncHandler(async (req, res) => {

    const invoices = await Invoice.findById(req.params.id)

    if (invoices) {
        res.json(
            invoices
        )
    } else {
        res.status(404).json({ message: 'Article not found' })
    }
})

const createInvoice = asyncHandler(async (req, res) => {

    const invoice = await Invoice.create(req.body.invoice)
    if (invoice) {
        res.status(201)
        res.json(invoice)

    } else {
        res.status(400)
        throw new Error('Datos Invalidos')
    }

})

const updateInvoice = asyncHandler(async (req, res) => {

    const updatedInvoice = req.body
    console.log(updatedInvoice)
    const invoice = await Invoice.replaceOne({ _id: updatedInvoice._id }, updatedInvoice)
    console.log("invoice")
    if (invoice) {
        res.status(201)
        res.json(invoice)
    } else {
        res.status(400)
        throw new Error('Datos Invalidos')
    }

})

export {
    getInvoices,
    createInvoice,
    updateInvoice,
    getInvoice
}
