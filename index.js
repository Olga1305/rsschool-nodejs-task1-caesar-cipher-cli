#!/usr/bin/env node
const chalk = require("chalk");
const { program } = require("commander");
program.version("0.0.1");

const { validateArgs } = require("./validateArgs");
const { caesarPipeline } = require("./streams");

program
  .option("-s, --shift <number>", "a shift")
  .option("-a, --action <encode/decode>", "an action encode/decode")
  .option("-i, --input <file>", "an input file")
  .option("-o, --output <file>", "an output file")
  .action((options) => {
    const cl = validateArgs(options);
    caesarPipeline(options, cl);
  });

program.exitOverride();

try {
  program.parse(process.argv);
} catch (err) {
  process.stderr.write(
    chalk.bold.red(
      `${
        err.code === "commander.optionMissingArgument"
          ? "You can't use flag/s -s (or --shift), -a (or --action), -i (or --input), -o (or -output) without argument/s\n"
          : ''
      }`,
      `${err}\n`
    )
  );
  process.exit(1);
}
