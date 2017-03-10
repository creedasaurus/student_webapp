/* global expect */

/*   getYearInSchool JASMINE TESTS   */
describe("getYearInSchool(grade)", function() { //suite

    // undefined
    it("should return undefined with numbers out of bounds", function() { //spec
        expect(getYearInSchool(0)).toBe(undefined); // expectations
        expect(getYearInSchool(5)).toBe(undefined);
        expect(getYearInSchool(42)).toBe(undefined);
    });

    // Freshman
    it("should return 'Freshman' for s_year 1", function() {
        expect(getYearInSchool(1)).toBe("Freshman");
    });

    // Sophmore
    it("should return 'Sophmore' for s_year 2", function() {
        expect(getYearInSchool(2)).toBe("Sophmore");
    });

    // Junior
    it("should return 'Junior' for s_year 3", function() {
        expect(getYearInSchool(3)).toBe("Junior");
    });

    // Senior
    it("should return 'Senior' for s_year 4", function() {
        expect(getYearInSchool(4)).toBe("Senior");
    });

});




/*   compareNumbers JASMINE TESTS   */
describe("compareNumbers(num1, num2)", function() {

    it("should return 0 if the numbers are the same", function() {
        expect(compareNumbers(0, 0)).toBe(0);
        expect(compareNumbers(-500.0, -500.0)).toBe(0);
        expect(compareNumbers(10000.45, 10000.45)).toBe(0);
        // negative case
        expect(compareNumbers(34.54, 0)).not.toBe(0);
    });


    it("should return a positive number if num1 is greater than num2", function() {
        expect(compareNumbers(2341, 0)).toBeGreaterThan(0);
        expect(compareNumbers(0.0001, 0)).toBeGreaterThan(0);
        expect(compareNumbers(1000.5, 1000.4)).toBeGreaterThan(0);
        // negative case
        expect(compareNumbers(0, 0)).not.toBeGreaterThan(0);
    });


    it("should return a negative number if num1 is less than num2", function() {
        expect(compareNumbers(0, 2341)).toBeLessThan(0);
        expect(compareNumbers(0, 0.0001)).toBeLessThan(0);
        expect(compareNumbers(1000.4, 1000.5)).toBeLessThan(0);
        // negative case
        expect(compareNumbers(0, 0)).not.toBeLessThan(0);
    });
});




/*   compareTwoStrings JASMINE TESTS   */
describe("compareTwoStrings(string1, string2)", function() {

    it("should return a 0 if the strings are the same", function() {
        expect(compareTwoStrings("butts", "butts")).toBe(0);
        expect(compareTwoStrings("Sasquatch!", "Sasquatch!")).toBe(0);
        expect(compareTwoStrings("NEVERLAND", "NEVERLAND")).toBe(0);
        expect(compareTwoStrings("Get that CAT", "get that cat")).toBe(0);
        // negative case
        expect(compareTwoStrings("Ducks", '')).not.toBe(0);
    });


    it("should return -1 if the first string comes before the second 'alphabetically'", function() {
        expect(compareTwoStrings("AAAAAA", "ZZZZZZ")).toBeLessThan(0);
        expect(compareTwoStrings("Battery", "Cannon")).toBe(-1);
        expect(compareTwoStrings("aLpHa", "ZuLu")).toBe(-1);
        // negative case
        expect(compareTwoStrings("Yellow", "Dogs")).not.toBe(-1);
    });


    it("should return 1 if the first string comes after the second 'alphabetically'", function() {
        expect(compareTwoStrings("ZZZZZZ", "AAAAAA")).toBe(1);
        expect(compareTwoStrings("Cannon", "Battery")).toBe(1);
        expect(compareTwoStrings("zUlU", "AlPhA")).toBe(1);
        // negative case
        expect(compareTwoStrings("Harry", "Potter")).not.toBe(1);
    });
});




/*   compareTwoDates JASMINE TESTS   */
describe("compareTwoDates(date1, date2", function() {

    it("should return a 0 if the dates are the same", function() {
        expect(compareTwoDates('1/1/99', '1/1/99')).toBe(0);
        expect(compareTwoDates("05/10/22", "05/10/22")).toBe(0);
        expect(compareTwoDates('12/25/1972', '12.25.1972')).toBe(0);
        // negative case
        expect(compareTwoDates('1/9/87', '10/4/77')).not.toBe(0);
    });


    it("should return greater than 0 if date1 is older than date2", function() {
        expect(compareTwoDates('10/10/2015', '1/1/1988')).toBeGreaterThan(0);
        expect(compareTwoDates("04.30.2020", "04/30/1856")).toBeGreaterThan(0);
        expect(compareTwoDates('12/25/1969', '12/24/1969')).toBeGreaterThan(0);
        // negative case
        expect(compareTwoDates('1/9/87', '1/9/87')).not.toBeGreaterThan(0);
    });


    it("should return less than 0 if date 1 is newer than date2", function() {
        expect(compareTwoDates('1/1/1972', '5.12.2001')).toBeLessThan(0);
        expect(compareTwoDates('4/20/1856', '4/20/2005')).toBeLessThan(0);
        expect(compareTwoDates('12.24.1991', '12/25/1991')).toBeLessThan(0);
        // negative case
        expect(compareTwoDates('1/1/99', '1.1.99')).not.toBeLessThan(0);
    });
});