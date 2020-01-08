module.exports = class MovieRatings extends Array {
    constructor(props) {
        super();
        if (!Array.isArray(props)) {
            throw new Error("MovieRatings props have to be array");
        }
        props.forEach(({ Source, Value }) => this.push({ source: Source, value: Value }));
    }
};
