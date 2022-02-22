import express from "express"
const router = express.Router()
import {
    authUser,
    getUserProfile,
    createUser,
    updateUserProfile,
    getUsers
} from '../controllers/userController.js'
import { protect, shield } from "../middleware/authMiddleware.js"

router.route('/').get(protect, shield, getUsers)
router.route('/').post(createUser)
router.post('/login', authUser)
router.route('/profile').get(protect, getUserProfile)
router.route('/profile').put(protect, updateUserProfile)


export default router