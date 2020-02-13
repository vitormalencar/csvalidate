import { promisify } from "util";
import { readFile } from "fs";

const pReadFile = promisify(readFile);

export const readRules = async (filePath: string) => {
  try {
    const data = await pReadFile(filePath);
    return JSON.parse(data.toString());
  } catch (err) {
    if (err.code === "ENOENT")
      throw new Error(`Cannot find the specified rules file.`);
    throw err;
  }
};
