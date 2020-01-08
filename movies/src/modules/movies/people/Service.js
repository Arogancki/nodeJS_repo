module.exports = class PeopleService {
    constructor(config) {
        Object.assign(this, config);
    }
    getId(name) {
        return this.repository.getId(name);
    }
};
