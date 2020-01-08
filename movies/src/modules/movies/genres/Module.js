const Repository = require("./Repository");
const Service = require("./Service");

module.exports = class GenresModule {
    constructor() {
        this.service = new Service({ repository: new Repository() });
    }
};
