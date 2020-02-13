// @ts-nocheck
import * as Ajv from "ajv";

export const validate = async (parsed: any, schema) => {
  const ajv = new Ajv({ allErrors: true });
  const errors = [];

  const validate = ajv.compile(schema);

  const errorMessage = (i, message) =>
    `Invalid entry at line:${i + 1} Error: ${message}`;

  parsed.forEach((row, i) => {
    let valid = validate(row);
    if (!valid) errors.push(errorMessage(i, ajv.errorsText(validate.errors)));
  });

  if (errors.length === 1) throw new Error(errors[0]);
  if (errors.length > 0) throw new Error(`\n${errors.join("\n")}`);

  return true;
};
