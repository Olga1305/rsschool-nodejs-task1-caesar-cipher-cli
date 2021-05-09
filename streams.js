const { pipeline, Transform } = require("stream");
const fs = require("fs");
const path = require("path");
const chalk = require("chalk");

const { caesar } = require("./caesar");

const caesarPipeline = (options, cl) => {
  const { input, output } = options;

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

  const filePipeline = () => {
    pipeline(
      fs.createReadStream(path.resolve(input)),
      transformStream,
      fs.createWriteStream(path.resolve(output), { flags: "a" }),
      (err) => {
        if (!err) {
          console.log(chalk.bold.green(`Pipeline succeeded. Please, check the file ${output}`));
        } else {
          process.stderr.write(chalk.bold.red(`Pipeline failed with error ${err}`));
          process.exit(1);
        }
      }
    );
  };

  const clPipeline = () => {
    pipeline(process.stdin, transformStream, process.stdout, (err) => {
      if (err) {
        process.stderr.write(chalk.bold.red(`Pipeline failed with error ${err}`));
        process.exit(1);
      } 
    });
  };

  if (!cl.stdin && !cl.stdout) {
    return filePipeline();
  } else {
    return clPipeline();
  }
};

module.exports = { caesarPipeline };

