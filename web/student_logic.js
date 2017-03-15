/**
 * Created by creed on 3/10/2017.
 */

angular.module('studentDataApp', [])
    .controller('StuDataController', ($scope)=>{
        $scope.students = [
            {
                "fname": "Lois",
                "lname": "Hanson",
                "startDate": "3/12/93",
                "street": "923 North 1400 East",
                "city": "Williamsburg",
                "state": "ID",
                "zip": 93673,
                "phone": "673-3114",
                "s_year": 4,
                "id": "0001"
            },
            {
                "fname": "Alex",
                "lname": "Peterson",
                "startDate": "7/11/94",
                "street": "931 South 300 West",
                "city": "Williamsburg",
                "state": "ID",
                "zip": 93673,
                "phone": "679-2116",
                "s_year": 3,
                "id": "0002"
            }
        ];

        $scope.popStudentModal = (stu)=>{
            console.log(stu);
            $scope.selectedStudent = stu;
        };

        $scope.editButton = ()=> {
            console.log("editButton clicked")
        };


    });