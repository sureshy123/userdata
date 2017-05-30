var app = angular.module('myApp', []);
app.controller('appCtrl', function($scope,$http) {

    $scope.searchValue="";
    $scope.sortedWelcome=[];
    $scope.selectedUser=[];
    $scope.selectedIndex = -1;
    $scope.loading = true;
    $scope.isSelected=false;
    $scope.errorMessage='';

        $http.get("http://private-a73e-aquentuxsociety.apiary-mock.com/members").then(function (response) {
        $scope.userData = response.data;
        }, function ( response ) {
            $scope.errorMessage=response.status +' '+response.statusText;
        }).finally(function() {
            $scope.loading = false;
        });

    $scope.displayData= function(x,$index){
        $scope.selectedIndex = $index;
        $scope.selectedUser=x;
        $scope.isSelected=true;
    }

    $scope.onChange =  function () {
        var value = $scope.searchValue.toLowerCase();
        var userData=$scope.userData;
        var sortedData=[];
        var length= userData.length;
        $scope.errorMessage='';

        for(var j=0; j<length; j++){

            if(userData[j].firstName.toLowerCase().indexOf(value) >= 0 
                || userData[j].surname.toLowerCase().indexOf(value) >= 0
                || userData[j].occupation.toLowerCase().indexOf(value) >= 0
                || userData[j].company.toLowerCase().indexOf(value) >= 0){
                sortedData.push(userData[j]);
            }
        }
        if(sortedData.length===0){
            $scope.errorMessage="No results found. Please enter a valid text";
        }
        $scope.sortedData=sortedData;
        reset();
    }
    reset= function(){
        $scope.selectedUser=[];
        $scope.selectedIndex = -1;
        $scope.isSelected=false;
    }

});