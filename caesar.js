const encode = (string, shift) => {
  return string
    .split("")
    .map((item) => {
      if (!item.match(/^[a-zA-Z]*$/)) {
        return item;
      } else {
        const code = item.charCodeAt(0);
        if (code >= 65 && code <= 90) {
          return (item = String.fromCharCode(((code - 65 + shift) % 26) + 65));
        } else if (code >= 97 && code <= 122) {
          return (item = String.fromCharCode(((code - 97 + shift) % 26) + 97));
        }
      }
    })
    .join("");
};

const decode = (text, shift) => {  
  return encode(text, 26 - (shift % 26));
};

module.exports = { encode, decode };
