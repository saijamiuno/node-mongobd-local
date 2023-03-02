import chalk from "chalk";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import notes from "./notes.js";

const yarg = yargs(hideBin(process.argv));
yarg
  .command({
    command: "add",
    describe: "Add Note",
    builder: {
      title: {
        describe: "Adding Notes Title test",
        demandOption: true,
        type: "string",
      },
      body: {
        describe: "Notes Body",
        demandOption: true,
        type: "string",
      },
    },
    handler: (argv) => {
      notes.addNote(argv.title, argv.body);
    },
  })
  .command({
    command: "remove",
    describe: "Remove Note",
    builder: {
      title: {
        describe: "Removing Notes Title test",
        demandOption: true,
        type: "string",
      },
    },
    handler: (argv) => {
      notes.removeNote(argv.title);
    },
  })
  .command({
    command: "list",
    describe: "List Your Notes ",
    handler: function () {
      console.log(chalk.green.bold("Listing Notes"));
    },
  })
  .command({
    command: "read",
    describe: "Reading",
    handler: function () {
      console.log(chalk.green.bold("Reading  Notes!!!!!"));
    },
  });

yarg.parse();

// console.log(yarg.argv);
// console.log(process.argv);
