import { promisify } from "util";
import { readFile } from "fs";

const pReadFile = promisify(readFile);

export const readCsv = async (filePath: string) => {
  try {
    const data = await pReadFile(filePath);
    return data.toString();
  } catch (err) {
    if (err.code === "ENOENT")
      throw new Error("Cannot find the specified CSV file.");
    throw err;
  }
};
