//========================= Setup
var fs = require('fs');
const ID_LENGTH = 4;

// ~~ leadingZeros
// helps make ID's formated properly
function leadingZeros(number, spaces) {
    var id = `${number}`;
    while (id.length < spaces) {
        id = '0' + id;
    }
    return id;
}

// ~~ createID
// generator function that continues to generate ID's
function* createID() {
    var startingID = 1;
    while (true) {
        yield leadingZeros(startingID++, ID_LENGTH);   
    }
}
var getID = createID();




//============================= Execution Begins

console.log("Adding ID's to each student in the specified JSON.");

var fileName = process.argv[2];
var students = JSON.parse(fs.readFileSync(fileName, 'utf8'));

// Loop through all the students and generate an ID for them. 
for (var stu in students) {
    students[stu].id = getID.next().value;
}

// Write file out over the old version
fs.writeFile(fileName, JSON.stringify(students, null, '\t'), 'utf8');

console.log('done');