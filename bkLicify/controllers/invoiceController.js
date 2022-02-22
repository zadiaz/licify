import Invoice from "../models/invoiceModel.js"
import asyncHandler from "express-async-handler"

const getInvoices = asyncHandler(async (req, res) => {

    const invoices = await Invoice.find({})

    if (invoices) {
        res.json(
            invoices
        )
    }
})

const getInvoice = asyncHandler(async (req, res) => {

    const invoices = await Invoice.find({})

    if (invoices) {
        res.json(
            invoices
        )
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

})

export {
    getInvoices,
    createInvoice,
    updateInvoice,
    getInvoice
}
