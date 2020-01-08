const Router = require("../../common/Router"),
    validJoiScheme = require("../../validators/validJoiScheme"),
    schemes = require("../../validators/schemes");

module.exports = class CommentsRouter {
    constructor(service) {
        this.path = "/comments";
        this.router = new Router([
            {
                method: "get",
                validation: validJoiScheme(schemes.mightHaveTitleOrId, "query"),
                handler: req => service.get(req.query),
            },
            {
                method: "post",
                validation: validJoiScheme(schemes.hasTitleOrId.concat(schemes.hasComment), "body"),
                handler: req => service.post(req.body),
            },
        ]);
    }
};
