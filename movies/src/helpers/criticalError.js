module.exports = (...e) => {
    console.error(...[...e, "\nCRITICAL ERROR: SHUTTING DOWN THE SERVER"]);
    return process.exit(1);
};
