import * as neatCsv from "neat-csv";

export const parseCsv = async (data: string) => {
  const parsed = await neatCsv(data, {
    mapValues: ({ value }) => (isNaN(value) ? value : Number(value))
  });

  if (parsed.length === 0) {
    throw new Error("Fail to parse CSV ");
  }
  return parsed;
};
