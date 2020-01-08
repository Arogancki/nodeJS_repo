module.exports = {
    string2Int: s => +s,
    toBooleanOrString: s => {
        s = String(s).toLowerCase();
        if (typeof s === typeof true) {
            return s;
        }
        return s === "true" ? true : s === "false" ? false : s;
    },
    toLower: s => String(s).toLowerCase(),
};
