import bcrypt from 'bcryptjs'

const users = [
    {
        name: 'David',
        number: '3106900729',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true
    },
    {
        name: 'Edward',
        number: '3112235803',
        password: bcrypt.hashSync('123456', 10),

    },

]

export default users