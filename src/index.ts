import { Command, flags } from "@oclif/command";
import { cosmiconfig } from "cosmiconfig";

import { readCsv } from "./helpers/readCsv";
import { parseCsv } from "./helpers/parseCsv";
import { validate } from "./helpers/validate";
import { readRules } from "./helpers/readRules";

class csvalidate extends Command {
  static description = "Custom Validade Fild on csv files";

  static flags = {
    // add --version flag to show CLI version
    version: flags.version({ char: "v" }),
    help: flags.help({ char: "h" }),

    // flag with a value (-p, --path=../examplefile.csv)
    path: flags.string({
      char: "p",
      required: false,
      description: "absolute path to csv file"
    }),

    // flag with a value (-r, --rules=../examplefile.json)
    rules: flags.string({
      char: "r",
      required: false,
      description: "absolute path to file with rules"
    })
  };

  static args = [{ name: "path" }, { name: "rules" }];

  async run() {
    const { flags } = this.parse(csvalidate);
    const configuration = await cosmiconfig("rules").search();
    const path = flags.path || this.argv[0];
    const rulesFile = flags.rules || "";
    const csv = await readCsv(path);

    const rules = configuration
      ? configuration.config
      : await readRules(rulesFile);

    const parsed = await parseCsv(csv);

    try {
      await validate(parsed, rules);

      this.log("The CSV file meets all validation checks.\n");
    } catch (err) {
      this.error(`${err}\n`);
    }
  }
}

export = csvalidate;
