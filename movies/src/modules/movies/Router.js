const Router = require("../../common/Router"),
    validJoiScheme = require("../../validators/validJoiScheme"),
    schemes = require("../../validators/schemes");

module.exports = class MoviesRouter {
    constructor(service) {
        this.path = "/movies";
        this.router = new Router([
            {
                method: "get",
                validation: validJoiScheme(schemes.mightHaveTitleOrId, "query"),
                handler: req => service.get(req.query),
            },
            {
                method: "post",
                validation: validJoiScheme(schemes.hasTitleOrId, "body"),
                handler: req => service.post(req.body),
            },
        ]);
    }
};
