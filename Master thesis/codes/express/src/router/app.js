const router = require("express").Router(),
    redirect = require("../helpers/redirect");

module.exports = app => {
    router.use(async (req, res, next) => {
        if (!req.isAuthenticated())
            //return redirect(req, res, '/')
            next();
    });

    router.get("/", async function(req, res) {
        res.render("index.ejs", {
            title: "main",
            body: "app",
            links: [
                {
                    text: "Sign Out",
                    href: "/sign/out",
                },
            ],
            data: [] || req.user.data,
        });
    });

    return router;
};
