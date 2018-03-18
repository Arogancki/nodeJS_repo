module.exports = {
    secret: process.env.SECRET || `secret`,
    proxy: true,
    resave: true,
    saveUninitialized: true
}