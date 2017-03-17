/**
 * Created by creed on 3/10/2017.
 */

let myapp = angular.module('studentDataApp', []);

myapp.factory('classroomSrvc', ['$http', '$q', function ($http, $q) {

    let students = [];
    let manifest = [];
    let getStudentCalls = [];
    let selectedStudent = {};

    $http.get('/api/v1/students.json')
        .then(function (res) {
            console.log(res.data);
            // For now just get the entire student list. We will learn to paginate with it.
            // TODO: learn to do server-side paging with MySQL
            for (let stu in res.data) {

                manifest.push(res.data[stu]);

                getStudentCalls.push($http.get(`/api/v1/students/${res.data[stu]}.json`)
                    .then(function (res) {
                            students.push(res.data);
                        }
                    ));
            }
        });


    let getSelectedStu = function () {
        return selectedStudent;
    };

    let selectStudent = function (stu) {
        angular.copy(stu, selectedStudent);
    };

    let getAll = function () {
        console.log(manifest);
        return students;
    };

    let addStudent = function (stu) {
        console.log("adding student");
        // TODO: add an http POST request to add a new student
        let newID = manifest[manifest.length - 1];
        console.log(newID);
        stu.id = newID;
        students.push(stu);
        console.log(students);
    };

    let editStudent = function (stu) {
        console.log(stu);
    };

    let deleteStudent = function (stu) {
        console.log("deleting student");

    };

    return {
        getSelected: getSelectedStu,
        selectStudent: selectStudent,
        getAll: getAll,
        addStudent: addStudent,
        editStudent: editStudent
    };
}]);

myapp.controller('DataTableController', ['$scope', 'classroomSrvc', function ($scope, classroomSrvc) {

    $scope.students = classroomSrvc.getAll();
    $scope.selectedStudent = classroomSrvc.getSelected();

    $scope.selectStu = function (stu) {
        classroomSrvc.selectStudent(stu);
    };

}]);

myapp.controller('EditStudentController', ['$scope', 'classroomSrvc', function ($scope, classroomSrvc) {
    $scope.student = classroomSrvc.getSelected();
    $scope.states = statesOptions;

    $scope.addStudent = function () {
        $scope.student = {};
        $scope.saveStudent = function () {
            classroomSrvc.addStudent($scope.student);
        };
    };

    $scope.editStudent = function () {
        $scope.saveStudent = function () {
            classroomSrvc.editStudent($scope.student);
        };
    };

}]);

myapp.controller('DeleteStudentController', ['$scope', function ($scope) {

}]);


myapp.directive('studentInfoModal', function () {
    return {
        restrict: 'E',
        templateUrl: 'stu-modal.html'
    };
});

