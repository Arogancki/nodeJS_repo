const express = require("express"),
    http = require("http"),
    config = require("./config"),
    middlewares = require("./middlewares"),
    router = require("./router"),
    app = express(),
    log = require("./helpers/log"),
    MoviesModule = require("./modules/movies/Module"),
    CommentsModule = require("./modules/comments/Module");

module.exports = async function appBootstrap() {
    app.set("port", config.PORT);

    await middlewares(app);

    const moviesModule = new MoviesModule();
    const commentsModule = new CommentsModule(moviesModule.service);

    await router(app, [moviesModule.router, commentsModule.router]);

    config.PRINT_CONFIG && Object.keys(config).forEach(key => log.debug(`$${key}=${config[key]}`));

    return new Promise(async res => {
        const server = http.createServer(app).listen(app.get("port"), () => res({ server, app }));
    });
};
