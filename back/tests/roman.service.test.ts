import { toRomanService } from "../src/services/roman.service";

describe("Roman Service", () => {
  test("should convert basic numbers correctly", () => {
    expect(toRomanService(1)).toBe("I");
    expect(toRomanService(5)).toBe("V");
    expect(toRomanService(10)).toBe("X");
    expect(toRomanService(50)).toBe("L");
    expect(toRomanService(100)).toBe("C");
  });

  test("should convert complex numbers correctly", () => {
    expect(toRomanService(4)).toBe("IV");
    expect(toRomanService(9)).toBe("IX");
    expect(toRomanService(40)).toBe("XL");
    expect(toRomanService(90)).toBe("XC");
    expect(toRomanService(42)).toBe("XLII");
    expect(toRomanService(93)).toBe("XCIII");
  });

  test("should throw error for invalid numbers", () => {
    expect(() => toRomanService(0)).toThrow(
      "The number must be between 1 and 100."
    );
    expect(() => toRomanService(-1)).toThrow(
      "The number must be between 1 and 100."
    );
    expect(() => toRomanService(101)).toThrow(
      "The number must be between 1 and 100."
    );
    expect(() => toRomanService(3.14)).toThrow(
      "The number must be between 1 and 100."
    );
  });
});
