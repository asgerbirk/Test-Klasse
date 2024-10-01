export class Employee {
  // Private attributes with types
  private _cpr: number | undefined; // Using underscore to distinguish private variable
  #firstName: string;
  #lastName: string;
  private department: "HR" | "Finance" | "IT" | "Sales" | "General Services";
  private baseSalary: number;
  private educationalLevel: 0 | 1 | 2 | 3;
  private dateOfBirth: Date;
  private dateOfEmployment: Date;
  private country: string;

  // Constants for internal use
  private departments = ["HR", "Finance", "IT", "Sales", "General Services"];
  private educationalLevels = ["None", "Primary", "Secondary", "Tertiary"];
  private countriesNoShippingCosts = ["Denmark", "Sweden", "Norway"];
  private countriesHalfShippingCosts = ["Iceland", "Finland"];

  public set cpr(value: number) {
    const cprString = value.toString();
    if (/^\d{10}$/.test(cprString)) {
      // Validate that CPR is exactly 10 digits
      this._cpr = value;
    } else {
      this._cpr = undefined; // Invalid CPR, set to undefined or another default
    }
  }

  // Getter for CPR
  public get cpr(): number | undefined {
    return this._cpr !== undefined ? this._cpr : undefined; // Return number or undefined
  }

  #nameIsValid(name: string): boolean {
    return (
      name.length > 0 &&
      name.length <= 30 &&
      name.match(
        /^[a-zA-ZæøåñçáéíóúàèìòùäëïöüâêîôûÆØÅÑÇÁÉÍÓÚÀÈÌÒÙÄËÏÖÜÂÊÎÔÛ \-]+$/i
      ) !== null
    );
  }

  set firstName(firstName: string) {
    if (this.#nameIsValid(firstName)) {
      this.#firstName = firstName;
    } else {
      this.#firstName = ""; // Set to empty string if invalid
    }
  }

  set lastName(lastName: string) {
    if (this.#nameIsValid(lastName)) {
      this.#lastName = lastName;
    } else {
      this.#lastName = ""; // Set to empty string if invalid
    }
  }

  get firstName(): string {
    return this.#firstName;
  }

  get lastName(): string {
    return this.#lastName;
  }

  // Department setter and getter
  public getDepartment():
    | "HR"
    | "Finance"
    | "IT"
    | "Sales"
    | "General Services" {
    return this.department;
  }

  public setDepartment(
    department: "HR" | "Finance" | "IT" | "Sales" | "General Services"
  ): void {
    if (this.departments.includes(department)) {
      this.department = department;
    } else {
      throw new Error(
        "Department must be one of HR, Finance, IT, Sales, or General Services."
      );
    }
  }

  // Base Salary setter and getter
  public getBaseSalary(): number {
    return this.baseSalary;
  }

  public setBaseSalary(baseSalary: number): void {
    if (baseSalary >= 20000 && baseSalary <= 100000) {
      // Ensure baseSalary has at most two decimal places
      this.baseSalary = Math.floor(baseSalary * 100) / 100;
    } else {
      throw new Error("Base salary must be between 20000 and 100000 DKK.");
    }
  }

  // Education Level setter and getter
  public getEducationLevel(): 0 | 1 | 2 | 3 {
    return this.educationalLevel;
  }

  public setEducationLevel(educationalLevel: 0 | 1 | 2 | 3): void {
    if ([0, 1, 2, 3].includes(educationalLevel)) {
      this.educationalLevel = educationalLevel;
    } else {
      throw new Error(
        "Educational level must be 0 (None), 1 (Primary), 2 (Secondary), or 3 (Tertiary)."
      );
    }
  }

  // Date of Birth setter and getter
  public getDateOfBirth(): Date {
    return this.dateOfBirth;
  }

  public setDateOfBirth(dateOfBirth: string): void {
    const dob = new Date(dateOfBirth);
    const today = new Date();
    const age = today.getFullYear() - dob.getFullYear();
    const is18OrOlder =
      age > 18 ||
      (age === 18 &&
        today >= new Date(dob.setFullYear(dob.getFullYear() + 18)));

    if (is18OrOlder) {
      this.dateOfBirth = dob;
    } else {
      throw new Error("Employee must be at least 18 years old.");
    }
  }

  // Date of Employment setter and getter
  public getDateOfEmployment(): Date {
    return this.dateOfEmployment;
  }

  public setDateOfEmployment(dateOfEmployment: string): void {
    const doe = new Date(dateOfEmployment);
    if (doe <= new Date()) {
      this.dateOfEmployment = doe;
    } else {
      throw new Error("Date of employment cannot be in the future.");
    }
  }

  // Country setter and getter
  public getCountry(): string {
    return this.country;
  }

  public setCountry(country: string): void {
    if (country && country.length > 0) {
      this.country = country;
    } else {
      throw new Error("Country name cannot be empty.");
    }
  }

  // Salary calculation based on base salary and educational level
  public getSalary(): number {
    return this.baseSalary + this.educationalLevel * 1220;
  }

  // Shipping cost calculation based on country
  public getShippingCosts(): number {
    if (this.countriesNoShippingCosts.includes(this.country)) {
      return 0;
    } else if (this.countriesHalfShippingCosts.includes(this.country)) {
      return 50;
    } else {
      return 100;
    }
  }

  // Discount calculation based on employment duration
  public getDiscount(): number {
    const employmentTimeInMilliseconds =
      new Date().getTime() - this.dateOfEmployment.getTime();
    const employmentYears =
      employmentTimeInMilliseconds / 1000 / 60 / 60 / 24 / 365.25;
    return Math.floor(employmentYears) * 0.5;
  }
}
