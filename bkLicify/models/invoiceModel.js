
import mongoose from "mongoose";

const invoiceSchema = mongoose.Schema({
    number: {
        type: Number,
        required: true,
    },
    total: {
        type: Number,
        default: 0
    },
    taxes: {
        type: Number,
        default: 0
    },
    items: [
        {
            qty: { type: Number, default: 1, required: true },
            desc: { type: String, required: true },
            price: { type: Number, required: true },
            tax: { type: Number, required: true },
        }
    ],
    status: {
        type: Number,
        default: 100,
    }
}, {
    timestamps: true
})
invoiceSchema.pre('save', function (next) {
    let last = this.find({}).sort({ _id: -1 }).limit(1)
    if (this.isNew()) {
        if (last?.number) {
            this.number = last.number + 1
        } else {
            this.number = 1
        }
    }
    next()
});
invoiceSchema.pre('save', function (next) {
    this.total = 0
    this.tax = 0
    for (item in this.items) {
        this.total += item.price * item.qty
        this.taxes += item.tax * item.qty
    }
    next()
});

const Invoice = mongoose.model('Invoice', invoiceSchema)

export default Invoice