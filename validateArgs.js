const { fs, accessSync, constants } = require("fs");
const path = require("path");
const chalk = require("chalk");

const validateShift = (shift) => {
  const num = Number(shift);
  if (num === NaN || !Number.isInteger(num)) {
    return `The shift must be a numeric integer value (positive or negative).\n`;
  } else {
    return true;
  }
};

const validateAction = (action) => {
  if (action === "encode" || action === "decode") {
    return true;
  } else {
    return `The action must be "encode" or "decode".\n`;
  }
};

const validateInput = (input) => {
  const filePath = path.resolve(input);
  accessSync(
    filePath,
    (constants || fs).F_OK | (constants || fs).R_OK,
    (err) => {
      if (err) {
        process.stderr.write(
          chalk.bold.red(
            `${input} ${
              err.code === "ENOENT" ? "does not exist.\n" : "is not readable\n"
            }`
          )
        );
        process.exit(2);
      } else {
        return true;
      }
    }
  );
};

const validateOutput = (output) => {
  const filePath = path.resolve(output);
  accessSync(
    filePath,
    (constants || fs).F_OK | (constants || fs).W_OK,
    (err) => {
      if (err) {
        process.stderr.write(
          chalk.bold.red(
            `${output} ${
              err.code === "ENOENT" ? "does not exist.\n" : "is read-only\n"
            }`
          )
        );
        process.exit(3);
      } else {
        return true;
      }
    }
  );
};

let cl = { stdin: false, stdout: false };

const validateArgs = (options) => {
  const { shift, action, input, output } = options;

  let errors = [];

  if (!shift || !action) {
    errors.push("A shift and an action (encode/decode) are required.\n");
  } else {
    if (validateShift(shift) !== true) {
      errors.push(validateShift(shift));
    }
    if (validateAction(action) !== true) {
      errors.push(validateAction(action));
    }
    if (!input) {
      cl.stdin = true;
    } else {
      validateInput(input);
    }
    if (!output) {
      cl.stdout = true;
    } else {
      validateOutput(output);
    }
  }
  const err = errors.join("");
  if (err !== "") {
    process.stderr.write(chalk.bold.red(err));
    process.exit(1);
  } else {
    return cl;
  }
};

module.exports = { validateArgs };
