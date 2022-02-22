import express from "express"
const router = express.Router()
import {
    getInvoices,
    updateInvoice,
    createInvoice,
    getInvoice
} from '../controllers/invoiceController.js'
import { protect, shield } from "../middleware/authMiddleware.js"

router.route('/').get(protect, shield, getInvoices)
router.route('/:id').get(protect, shield, getInvoice)
router.route('/').post(protect, shield, createInvoice)
router.route('/').put(protect, shield, updateInvoice)


export default router