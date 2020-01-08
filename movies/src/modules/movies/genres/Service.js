module.exports = class GenresService {
    constructor(config) {
        Object.assign(this, config);
    }
    getId(name) {
        return this.repository.getId(name);
    }
};
