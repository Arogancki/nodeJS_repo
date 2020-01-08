process.env.NODE_ENV = "test";

const app = require("../app"),
    mongoose = require("mongoose"),
    agent = require("supertest").agent,
    appConfig = require("../config"),
    MoviesProvider = require("../Modules/movies/Provider"),
    MoviesRepository = require("../Modules/movies/Repository"),
    CommentsRepository = require("../Modules/comments/Repository"),
    GenresRepository = require("../Modules/movies/genres/Repository"),
    PeopleRepository = require("../Modules/movies/people/Repository"),
    should = require("should"),
    config = {};

function ensureConnection() {
    return new Promise(res => {
        const mc = mongoose.connection;
        mc.on("open", () => res(mc.db));
        mc.db && res(mc.db);
    });
}

function cleanDatabase() {
    return new Promise(res => mongoose.connection.db.dropDatabase(res));
}

function areMoviesEqual(fromApi, fromDB) {
    fromApi.should.have.property("title").eql(fromDB.title);
    fromApi.should.have.property("rated").eql(fromDB.rated);
    fromApi.should.have.property("runtime").eql(fromDB.runtime);
    fromApi.should.have.property("plot").eql(fromDB.plot);
    fromApi.should.have.property("language").eql(fromDB.language);
    fromApi.should.have.property("country").eql(fromDB.country);
    fromApi.should.have.property("awards").eql(fromDB.awards);
    fromApi.should.have.property("poster").eql(fromDB.poster);
    fromApi.should.have.property("metascore").eql(fromDB.metascore);
    fromApi.should.have.property("imdbRating").eql(fromDB.imdbRating);
    fromApi.should.have.property("imdbVotes").eql(fromDB.imdbVotes);
    fromApi.should.have.property("production").eql(fromDB.production);
}

describe("Testing service", () => {
    const moviesProvider = new MoviesProvider();
    const moviesRepository = new MoviesRepository();
    const commentsRepository = new CommentsRepository();
    const genresRepository = new GenresRepository();
    const peopleRepository = new PeopleRepository();

    before(async () => {
        await ensureConnection();
        await cleanDatabase();
        const express = await app();
        config.server = express.server;
        config.app = express.app;
    });

    describe(`Movies`, () => {
        describe(`post`, () => {
            it("adding a movie by id", async () => {
                await agent(config.app)
                    .post("/movies")
                    .send({
                        id: "tt0387564",
                    })
                    .expect(200);
                areMoviesEqual(await moviesProvider._getById("tt0387564"), await moviesRepository.getById("tt0387564"));
            });
            it("adding a movie by title", async () => {
                await agent(config.app)
                    .post("/movies")
                    .send({
                        title: "ghost",
                    })
                    .expect(200);
                areMoviesEqual(await moviesProvider._getByTitle("ghost"), await moviesRepository.getByTitle("ghost"));
            });
            it("cannot add a movie by title and id", async () => {
                await agent(config.app)
                    .post("/movies")
                    .send({
                        title: "ghost",
                        id: "tt0387564",
                    })
                    .expect(400);
            });
            it("cannot add a non existing movie", async () => {
                await agent(config.app)
                    .post("/movies")
                    .send({
                        id: "not_existing",
                    })
                    .expect(404);
            });
        });
        describe(`get`, () => {
            it("getting a movie by id", async () => {
                const movie = await agent(config.app)
                    .get(`/movies?id=tt0387564`)
                    .expect(200);
                areMoviesEqual(await moviesProvider._getById("tt0387564"), movie.body[0]);
            });
            it("getting a movie by title", async () => {
                const movie = await agent(config.app)
                    .get(`/movies?title=ghost`)
                    .expect(200);
                areMoviesEqual(await moviesProvider._getByTitle("ghost"), movie.body[0]);
            });
            it("getting all movies", async () => {
                const movies = await agent(config.app)
                    .get(`/movies`)
                    .expect(200);
                const all = await mongoose.models[appConfig.MOVIES_DATABASE_NAME].find({});
                all.length.should.eql(movies.body.length);
            });
        });
    });

    describe(`Comments`, () => {
        describe("post", async () => {
            it("adding a comment by a movie id", async () => {
                const comment = "it's cool";
                await agent(config.app)
                    .post("/comments")
                    .send({
                        id: "tt0099653",
                        comment: comment,
                    })
                    .expect(200);
                const movieComments = await commentsRepository.getByMovieId("tt0099653");
                movieComments.comments.find(c => c === comment).should.eql(comment);
            });
            it("adding a comment by a movie title", async () => {
                const comment = "it's fun";
                await agent(config.app)
                    .post("/comments")
                    .send({
                        title: "ghost",
                        comment: comment,
                    })
                    .expect(200);
                const movieComments = await commentsRepository.getByMovieId("tt0099653");
                movieComments.comments.find(c => c === comment).should.eql(comment);
            });
            it("cannot add a comment to not existing movie", async () => {
                const comment = "it's bad";
                await agent(config.app)
                    .post("/comments")
                    .send({
                        id: "not_exists",
                        comment: comment,
                    })
                    .expect(404);
            });
            it("cannot add a comment by movie id and title", async () => {
                const comment = "it's smooth";
                await agent(config.app)
                    .post("/comments")
                    .send({
                        title: "ghost",
                        id: "tt0099653",
                        comment: comment,
                    })
                    .expect(400);
            });
            it("comment is required", async () => {
                await agent(config.app)
                    .post("/comments")
                    .send({
                        title: "ghost",
                    })
                    .expect(400);
            });
            it("comment length has to be at least 5 chars", async () => {
                const comment = "cool";
                await agent(config.app)
                    .post("/comments")
                    .send({
                        title: "ghost",
                        comment: comment,
                    })
                    .expect(400);
            });
            it("comment length has to be shorter than 1000 chars", async () => {
                const comment =
                    "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Na";
                await agent(config.app)
                    .post("/comments")
                    .send({
                        title: "ghost",
                        comment: comment,
                    })
                    .expect(400);
            });
        });
        describe("get", async () => {
            it("getting comments by movie id", async () => {
                const comments = await agent(config.app)
                    .get(`/comments?id=tt0099653`)
                    .expect(200);
                const { _id, ...props } = await commentsRepository.getByMovieId("tt0099653");
                should.deepEqual(comments.body[0], props);
            });
            it("getting comments by movie title", async () => {
                const comments = await agent(config.app)
                    .get(`/comments?title=ghost`)
                    .expect(200);
                const { _id, ...props } = await commentsRepository.getByMovieId("tt0099653");
                should.deepEqual(comments.body[0], props);
            });
            it("getting comments for a movie that does not have any", async () => {
                const comments = await agent(config.app)
                    .get(`/comments?id=tt0387564`)
                    .expect(200);
                comments.body.length.should.eql(0);
            });
            it("getting all comments", async () => {
                const comments = await agent(config.app)
                    .get(`/comments`)
                    .expect(200);
                const all = await mongoose.models[appConfig.COMMENTS_DATABASE_NAME].find({});
                all.length.should.eql(comments.body.length);
                all.forEach(doc => {
                    const comment = comments.body.find(comment => comment.movieId === doc.movieId);
                    comment.comments.length.should.eql(doc.comments.length);
                });
            });
            it("cannot get comments for not existing movie", async () => {
                await agent(config.app)
                    .get(`/comments?id=not_exist`)
                    .expect(404);
            });
        });
    });

    after(async () => {
        await cleanDatabase();
        config.server.close();
    });
});
