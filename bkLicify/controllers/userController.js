import User from "../models/userModel.js"
import asyncHandler from "express-async-handler"
import generateToken from "../util/generatedToken.js"


// @desc Auth user & get Token
// @route POST /api/user/login
// @acces Public
const authUser = asyncHandler(async (req, res) => {

    const { number, password } = req.body

    const user = await User.findOne({ number })

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            number: user.number,
            profile: user.profile,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    } else {
        res.status(401)
        throw new Error('Datos invalidos')
    }

})

// @desc Fetch all users
// @route GET /api/users
// @acces Public
const getUsers = asyncHandler(async (req, res) => {

    const users = await User.find({})

    if (users) {
        res.json(
            users
        )
    }

})

// @desc User profile
// @route GET /api/user/login
// @acces Private
const getUserProfile = asyncHandler(async (req, res) => {

    const user = await User.findById(req.user._id)

    if (user) {
        res.json({
            _id: user._id,
            number: user.number,
            profile: user.profile,
            isAdmin: user.isAdmin,
        })

    } else {
        res.status(404)
        throw new Error('Usuario no encontrado')
    }

})

// @desc User profile
// @route PUT /api/users/profile
// @acces Private
const updateUserProfile = asyncHandler(async (req, res) => {

    const user = await User.findById(req.user._id)


    if (user) {

        user.profile.name = req.body.profile.name || user.profile.name
        user.profile.lastname = req.body.profile.lastname || user.profile.lastname
        user.profile.email = req.body.profile.email || user.profile.email
        user.profile.address = req.body.profile.address || user.profile.address
        user.profile.gender = req.body.profile.gender || user.profile.gender
        user.profile.image = req.body.profile.image || user.profile.image
        user.profile.state = req.body.profile.state || user.profile.state

        if (req.password) {
            user.password = req.user.password
        }

        const updatedUser = await user.save()

        res.json({
            _id: updatedUser._id,
            number: updatedUser.number,
            profile: updatedUser.profile,
            isAdmin: user.isAdmin,
            token: generateToken(updatedUser._id)
        })

    } else {
        res.status(404)
        throw new Error('Usuario no encontrado')
    }

})

// @desc Register a new User
// @route GET /api/user/login
// @acces public
const createUser = asyncHandler(async (req, res) => {

    const { number, password } = req.body

    const userExists = await User.findOne({ number })
    if (userExists) {

        res.status(400)
        throw new Error('Ya existe un usuario con este numero')

    }

    const user = await User.create({
        number,
        password
    })

    if (user) {
        res.status(201)
        res.json({
            _id: user._id,
            number: user.number,
            token: generateToken(user._id),
            profile: user.profile,
            isAdmin: user.isAdmin,
        })

    } else {
        res.status(400)
        throw new Error('Datos Invalidos')
    }

})


export {
    authUser,
    getUserProfile,
    createUser,
    updateUserProfile,
    getUsers
}