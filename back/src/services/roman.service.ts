export const toRomanService = (num: number): string => {
  if (!Number.isInteger(num) || num < 1 || num > 100) {
    throw new Error("The number must be between 1 and 100.");
  }

  const romanNumerals: Array<[number, string]> = [
    [100, "C"],
    [90, "XC"],
    [50, "L"],
    [40, "XL"],
    [10, "X"],
    [9, "IX"],
    [5, "V"],
    [4, "IV"],
    [1, "I"],
  ];

  let result = "";
  let remaining = num;

  for (const [value, numeral] of romanNumerals) {
    while (remaining >= value) {
      result += numeral;
      remaining -= value;
    }
  }

  return result;
};
