import jwt from 'jsonwebtoken'
import asyncHandle from 'express-async-handler'
import User from '../models/userModel.js'

const protect = asyncHandle(async (req, res, next) => {

    let token
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {

        try {
            token = req.headers.authorization.split(' ')[1]
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            req.user = await User.findById(decoded.id).select('-password')
        } catch {
            res.status(401)
            throw new Error('Sin autorización, fallo token.')

        }
    }

    if (!token) {
        res.status(401)
        throw new Error('Sin autorización, falta token.')
    }
    next()
})

const shield = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next()
    } else {
        res.status(401)
        throw new Error('Sin autorización, debe ser admin')
    }

}


export {
    protect, shield
} 