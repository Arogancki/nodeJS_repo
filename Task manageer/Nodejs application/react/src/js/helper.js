export let validator = {
    text: function text(text, min = 0, max = Infinity) {
        return (text !== undefined) && (/^[a-zA-Z0-9._-]+$/).test(text) && text.length >= min && text.length <= max;
    },
    email: function email(text, min = 0, max = Infinity) {
        return (text !== undefined) && (/^[^\/\\'"@\s]+@[^\/\\'"@\s]+$/).test(text) && text.length >= min && text.length <= max;
    }
}