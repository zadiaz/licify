import mongoose from "mongoose";
import bcrypt from "bcryptjs";


// UserSchema

const userSchema = mongoose.Schema({
    profile: {
        name: { type: String },
        lastname: { type: String },
        email: { type: String },
        state: { type: Number, required: true, default: 190 }
    },
    number: {
        type: String,
        required: [true, 'Numero de telefono requerido'],
        unique: true
    },
    password: {
        type: String,
    },
    isAdmin: {
        type: Boolean,
        default: false
    }

}, {
    timestamps: true
})

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}
userSchema.pre('save', async function (next) {

    if (!this.isModified('password') || !this.password) {
        next()
    }

    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})
userSchema.pre('save', async function (next) {

    if (this.isModified('profile.name') && this.profile.state === 190) {
        this.profile.state = 200
    }
    console.log(this.profile.state)
    next()
})



const User = mongoose.model('User', userSchema)

export default User