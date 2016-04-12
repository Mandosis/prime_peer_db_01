var app = angular.module('assignmentApp', []);

app.controller('assignmentController', ['$scope', '$http', '$interval', function($scope, $http, $interval) {
  $scope.assignmentList = [];
  $scope.searchResult = {};
  $scope.assignment = {};
  $scope.hideList = false;

  $scope.getAssignments = function(id) {
    if(id) {
      $scope.hideList = true;
      $http.get('/assignment/get/' + id).then(function(res) {
        console.log(res.data);
        $scope.searchResult= res.data;
        console.log("Getting assignment...");
      });
    } else {
      $http.get('/assignment/get').then(function(res) {
        console.log(res.data);
        $scope.assignmentList = res.data;
        console.log("Getting assignments...");
      });
    }
  }

  $scope.addAssignment = function() {
    $http.post('/assignment/add', $scope.assignment).then($scope.getAssignments());
  };

  $scope.deleteAssignment = function(item) {
    console.log(item["_id"]);
    $http.delete('/assignment/delete/' + item["_id"]).then($scope.getAssignments());
    $scope.hideList = false;
  };

  $scope.getAssignments();

  $interval(function() {
    $scope.getAssignments();
  }, 5000);
}]);
