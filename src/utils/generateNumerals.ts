import { romanize } from "~/utils";

const generateNumerals = (labels: string[]) => {
  return labels.map((_, i) => {
    return romanize(i + 1);
  });
};

export default generateNumerals;
