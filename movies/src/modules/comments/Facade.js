module.exports = class CommentsFacade {
    constructor(comment) {
        const { _id, ...params } = comment;
        Object.assign(this, params);
    }
};
