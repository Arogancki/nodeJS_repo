export const validator = {
    text: function text(text, min = 0, max = Infinity) {
        return (text !== undefined) && (/^[a-zA-Z0-9._-]+$/).test(text) && text.length >= min && text.length <= max;
    },
    email: function email(text, min = 0, max = Infinity) {
        return (text !== undefined) && (/^[^\/\\'"@\s]+@[^\/\\'"@\s]+$/).test(text) && text.length >= min && text.length <= max;
    }
}

export function statusIcon(status){
    if (status==="New")
      return "🆕";
    else if (status==="In progress")
      return "➤";
    else if (status==="Blocked")
      return "⛔";
    else if (status==="Finished")
      return "✔";
    else if (status==="Resumed")
      return "♺";
    else
      return undefined
}

export function isOwner(str1, str2){
  return str1.toUpperCase() === str2.toUpperCase();
}