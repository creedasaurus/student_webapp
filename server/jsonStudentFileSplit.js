//========================= SETUP
var fs = require('fs');



//========================= BEGIN
console.log('Splitting students file into indiviual files');

var fileName = process.argv[2];
var students = JSON.parse(fs.readFileSync(fileName, 'utf-8'));

for (var stu in students) {
    var stuID = students[stu].id;
    delete students[stu].id;
    fs.writeFile('students/' + stuID + '.json', JSON.stringify(students[stu], null, '\t'), 'utf-8');
}

console.log("Finished!");