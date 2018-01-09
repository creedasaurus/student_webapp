/**
 * Created by creed on 3/10/2017.
 */
let angular = require('angular');
let myapp = angular.module('studentDataApp', []);

myapp.factory('classroomSrvc', ['$http', '$q', function ($http, $q) {

    let students = [];
    let manifest = [];
    let toDelete = [];
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
                        students.push(res.data[0]);
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
        // TODO: add an http POST request to add a new student

        console.log("adding student");
        let newID = manifest.length;
        console.log(newID);
        stu.id = newID;
        students.push(stu);
        console.log(students);
        selectStudent(stu);
    };

    let editStudent = function () {
        // TODO: edit students

        console.log(selectedStudent.fname);
    };

    let deleteStudent = function (stu) {
        // TODO: figure out how to delete students

        console.log(selectedStudent.fname);
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

    $scope.sorts = {
        name: ['lname', 'fname'],
        year: 's_year',
        start_date: 'startDate',
        city: 'city',
        state: 'state',
        zip: 'zip'
    };

    $scope.rightArrow = 'glyphicon-menu-right';

    $scope.students = classroomSrvc.getAll();
    $scope.selectedStudent = classroomSrvc.getSelected();
    $scope.states = statesOptions;
    $scope.currView = 'table';
    $scope.sortVal = ['lname', 'fname'];
    $scope.reverse = true;
    $scope.propertyName = '';

    $scope.sortBy = function (propertyName) {
        console.log($scope.students);
        $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
        $scope.propertyName = propertyName;
        $scope.sortVal = $scope.sorts[propertyName];
    };

    $scope.saveStudent = function () {
        console.log('ill save it');
    };

    $scope.selectStu = function (stu) {
        classroomSrvc.selectStudent(stu);
    };

    $scope.addStudent = function () {
        $scope.selectedStudent = {};
        $scope.saveStudent = function () {
            classroomSrvc.addStudent($scope.selectedStudent);
            $scope.selectedStudent = classroomSrvc.getSelected();
        };
    };

    $scope.editStu = function () {
        console.log("edit stud clicked");
        $scope.saveStudent = function () {
            classroomSrvc.editStudent();
        };
    };

}]);


myapp.directive('studentInfoModal', function () {
    return {
        restrict: 'E',
        templateUrl: 'stu-modal.html'
    };
});

myapp.directive('studentFormModal', function () {
    return {
        restrict: 'E',
        templateUrl: 'stu-form.html'
    }
});
