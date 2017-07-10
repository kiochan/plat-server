export default {
    debug: true,
    port: 3000,

    user: {
        default_avatar: 'default.png'
    },

    encrypt: {
        salt_length: 6
    },

    mongoose: {
        host: 'mongodb://localhost/test-login',
    }
}