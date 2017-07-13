export default {
    debug: true,
    port: 3000,

    user: {
        default_avatar: 'default.png'
    },

    encrypt: {
        salt_length: 6
    },

    validate: {
        email: [4, 256],
        username: [4, 32],
        password: [6, 32]
    },

    mongoose: {
        host: 'mongodb://localhost/test-login',
    },

    redis: {
        host: 'localhost',
        port: 6379,
        db: 1
    }
}