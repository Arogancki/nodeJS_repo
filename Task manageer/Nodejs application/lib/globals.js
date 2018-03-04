const port = process.env.PORT || "3000";
const address = process.env.ADDRESS || `localhost:${port}`
module.exports = {
    address,
    port
}