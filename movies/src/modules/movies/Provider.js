const rp = require("./node_modules/request-promise"),
    config = require("../../config"),
    baseApiUrl = `http://www.omdbapi.com`,
    apiUrl = `${baseApiUrl}/?apikey=${config.API_KEY}`,
    Movie = require("./model/Movie"),
    NotFoundError = require("../../common/NotFoundError");

async function fetch(query) {
    const response = await rp({
        method: "get",
        url: `${apiUrl}&${query}`,
        simple: false,
        resolveWithFullResponse: true,
        json: true,
    });
    if (response.statusCode !== 200) {
        return response.statusCode;
    }
    if (response.body.Error) {
        throw new NotFoundError(response.body.Error);
    }
    return new Movie(response.body);
}

module.exports = class MoviesProvider {
    async get(options) {
        options = options || {};
        const { id, title } = options;
        if (id) {
            return this._getById(id);
        }
        if (title) {
            return this._getByTitle(title);
        }
        throw new Error("Param not specified");
    }

    _getById(id) {
        return fetch(`i=${id}`);
    }

    _getByTitle(title) {
        return fetch(`t=${title}`);
    }
};
