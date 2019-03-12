const port = process.env.PORT || "3000";
const address = process.env.ADDRESS || `localhost:${port}`
const dnsAddress = process.env.DNS_ADDRESS || `${address}`
module.exports = {
    address,
    port,
	dnsAddress
}