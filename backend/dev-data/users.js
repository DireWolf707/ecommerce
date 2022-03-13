import bcrypt from 'bcryptjs';

const users = [
    {
        name: 'Admin User',
        email: 'admin@mail.com',
        password: bcrypt.hashSync('popin123'),
        isAdmin: true
    },
    {
        name: 'John Doe',
        email: 'john@mail.com',
        password: bcrypt.hashSync('popin123'),
    },
    {
        name: 'Jane Doe',
        email: 'jane@mail.com',
        password: bcrypt.hashSync('popin123'),
    }
]

export default users;