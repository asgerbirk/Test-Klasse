import { Employee } from "../src/Employee.js";
import { describe, it, expect, beforeEach } from "vitest";

describe("Employee CPR", () => {
  let employee: Employee;

  beforeEach(() => {
    employee = new Employee();
  });

  const cprProvider: { value: number; expected: number | undefined }[] = [
    { value: 1234567890, expected: 1234567890 },
    { value: 9999999999, expected: 9999999999 },
    { value: 99999999999, expected: undefined },
    { value: 999999999, expected: undefined },
  ];

  describe.each(cprProvider)("cpr is valid", (cpr) => {
    it(`setting ${cpr.value} gets ${cpr.expected}`, () => {
      employee.cpr = cpr.value;
      expect(employee.cpr).toBe(cpr.expected);
    });
  });
});

const nameProvider: { value: string; expected: string }[] = [
  { value: "John", expected: "John" },
  { value: "a", expected: "a" },
  {
    value: "ABCDEFGHIJKLMNOPQRSTUVWXYZABCD",
    expected: "ABCDEFGHIJKLMNOPQRSTUVWXYZABCD",
  },
  {
    value: "ABCDEFGHIJKLMNOPQRSTUVWXYZABC",
    expected: "ABCDEFGHIJKLMNOPQRSTUVWXYZABC",
  },
  { value: "a a a a a a a", expected: "a a a a a a a" },
  { value: "a-a-a-a-a-a-a", expected: "a-a-a-a-a-a-a" },
  { value: " ", expected: " " },
  { value: "", expected: "" },
  { value: "ABCDEFGHIJKLMNOPQRSTUVWXYZABCDE", expected: "" },
];

describe("Employee Name Validation", () => {
  let employee: Employee;

  beforeEach(() => {
    employee = new Employee();
  });

  describe.each(nameProvider)("name is valid", (name) => {
    it(`setting ${name.value} as first name gets ${name.expected}`, () => {
      employee.firstName = name.value;
      expect(employee.firstName).toBe(name.expected);
    });

    it(`setting ${name.value} as last name gets ${name.expected}`, () => {
      employee.lastName = name.value;
      expect(employee.lastName).toBe(name.expected);
    });
  });
});
