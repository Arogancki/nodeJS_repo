module.exports = {
    attributes: {
        username: {
            unique: true,
            type: 'string',
            required: true,
            description: 'Full representation of the user\'s name',
            maxLength: 120
        },
        password: {
            type: 'string',
            required: true,
            description: 'Securely hashed representation of the user\'s login password.',
            protect: true
        },
        data: {
            type: 'json',
            required: true,
        }
    }
}