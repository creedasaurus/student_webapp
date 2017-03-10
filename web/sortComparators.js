/*==============================+ SORTING +====================================*/
let sortFunctions = {
    'startDate': compareTwoDates,
    'city'     : compareTwoStrings,
    'state'    : compareTwoStrings,
    'zip'      : compareNumbers,
    's_year'   : compareNumbers
}

function sortStudentData(studentArrObj, sortBy) {
    studentArrObj.sort(function(sortItemA, sortItemB) {
        
        // if it's being sorted by first name or last name, apply special secondary sort function
        if (sortBy === 'lname' || sortBy === 'fname') {
            return studentNameSort(sortItemA, sortItemB, sortBy);
        }

        // Pick the proper compare function based on sortBy key
        return sortFunctions[sortBy](sortItemA[sortBy], sortItemB[sortBy]);
    });
}


// Compare Numbers
function compareNumbers(num1, num2) {
    return num1 - num2;
}

// Compare strings
function compareTwoStrings(string1, string2) {

    let firstWord = string1.toUpperCase();
    let secondWord = string2.toUpperCase();

    if (firstWord < secondWord) {
        return -1;
    }
    if (firstWord > secondWord) {
        return 1;
    }
    // equal
    return 0;
}

// Compare Dates
function compareTwoDates(date1, date2) {
    return Date.parse(date1) - Date.parse(date2);
}

// Special secondary-based compare for first names and last names
function studentNameSort(student1, student2, sortingBy) {

    // decide secondary sort value
    let secondarySortBy = (sortingBy === 'lname') ? 'fname' : sortingBy;


    if (student1[sortingBy].toLowerCase() === student2[sortingBy].toLowerCase()) {
        return compareTwoStrings(student1[secondarySortBy], student2[secondarySortBy]);
    }
    return compareTwoStrings(student1[sortingBy], student2[sortingBy]);
}
/*==============================+ ^^^^^^ +====================================*/