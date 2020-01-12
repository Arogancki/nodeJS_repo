require("./src/app")()
    .then(app => {
        console.log(app);
    })
    .catch(err => console.error);
