const { pipeline, Transform } = require("stream");
const fs = require("fs");
const path = require("path");
const chalk = require("chalk");

const { caesar } = require("./caesar");

const caesarPipeline = (options, cl) => {
  const { input, output } = options;

  const creatReadInput = () => {
    try {
      return cl.stdin
        ? process.stdin
        : fs.createReadStream(path.resolve(input));
    } catch (err) {
      console.error(err);
    }
  };

  const createWriteOutput = () => {
    try {
      return cl.stdout
        ? process.stdout
        : fs.createWriteStream(path.resolve(output), { flags: "a" });
    } catch (err) {
      console.error(err);
    }
  };

  const transformStream = new Transform({
    transform(chunk, encoding, callback) {
      try {
        chunk = caesar(chunk.toString(), options);
        callback(null, chunk);
      } catch (err) {
        callback(err);
      }
    },
  });

  pipeline(creatReadInput(), transformStream, createWriteOutput(), (err) => {
    if (err) {
      process.stderr.write(chalk.bold.red(`Pipeline failed with error ${err}`));
      process.exit(1);
    }
  });
};

module.exports = { caesarPipeline };
