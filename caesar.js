const encode = (str, sh) => {
  return str
    .split("")
    .map((item) => {
      if (!item.match(/^[a-zA-Z]*$/)) {
        return item;
      } else {
        const code = item.charCodeAt(0);
        if (code >= 65 && code <= 90) {
          return (item = String.fromCharCode(((code - 65 + sh) % 26) + 65));
        } else if (code >= 97 && code <= 122) {
          return (item = String.fromCharCode(((code - 97 + sh) % 26) + 97));
        }
      }
    })
    .join("");
};

const decode = (str, sh) => {
  return encode(str, 26 - (sh % 26));
};

const caesar = (chunk, options) => {
  const { shift, action } = options;
  const num = parseInt(shift);

  if (num >= 0 && action === "encode") {
    return encode(chunk, num);
  } else if (num >= 0 && action === "decode") {
    return decode(chunk, num);
  } else if (num < 0 && action === "encode") {
    return decode(chunk, -num);
  } else if (num < 0 && action === "decode") {
    return encode(chunk, -num);
  }
};

module.exports = { caesar };
