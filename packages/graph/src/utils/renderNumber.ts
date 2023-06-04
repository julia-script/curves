import { clamp, round } from "lodash-es";

export const renderNumber = (value: number, precision = 2): string => {
  // SVG has issues with big numbers, so we clamp them
  // https://oreillymedia.github.io/Using_SVG/extras/ch08-precision.html
  return round(clamp(value, -5000, 5000), precision).toString();
};
