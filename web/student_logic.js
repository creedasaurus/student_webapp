/**
 * Created by creed on 3/10/2017.
 */

let myapp = angular.module('studentDataApp', []);

myapp.service('classroomSrvc', ['$http', '$q',function ($http, $q) {
    let _students = [];
    let _manifest = [];
    let _getStudentCalls = [];
    let selectedStu = {};
    //
    $http.get('/api/v1/students.json')
        .then(function(res) {
            console.log(res.data);
            // For now just get the entire student list. We will learn to paginate with it.
            // TODO: learn to do server-side paging with MySQL
            for (stu in res.data) {
                _manifest.push(res.data[stu]);
                _getStudentCalls.push($http.get(`/api/v1/students/${res.data[stu]}.json`)
                    .then(function(res) {
                        // console.log(res);
                        _students.push(res.data);
                    }
                ));
            }
        });



    //---- AVAILABLE FUNCTIONS AND DATA ----//
    this.setSelectedStu = function(stu) {
        console.log("setting student");
        _selectedStu = stu;
        console.log(_selectedStu);
    };
    this.getSelectedStu = function() {
        console.log("getting student");
        return _students[4];
    };


    this.getAll = function () {
        console.log(_manifest);
        return _students;
    };
}]);


myapp.controller('DataTableController', ['$scope', 'classroomSrvc', function ($scope, classroomSrvc) {

    $scope.students = classroomSrvc.getAll();


    $scope.popStudentModal = function(stu) {
        $scope.selectedStu = stu;
    };

    $scope.editButton = () => {
        console.log("editButton clicked")
    };
}]);

// myapp.controller('StudentModalController', ['$scope', 'classroomSrvc', function($scope, classroomSrvc) {
//     $scope.selectedStudent = classroomSrvc.getSelectedStu();
// }]);

myapp.directive('studentInfoModal', function() {
    return {
        restrict: 'E',
        templateUrl: 'stu-modal.html'
    };
});