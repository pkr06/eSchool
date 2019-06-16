myApp.controller('LoginController', 
  ['$scope', 'PassportFactory', '$location', 
  function($scope, PassportFactory, $location) {

    $scope.passportFactory = PassportFactory;

    $scope.loginUser = function (username, password) {
	    console.log(username)
	    console.log(password)
        $scope.passportFactory.factoryUserSubmit(username, password)
    }

    $scope.go = function(path) {
        console.log(path);
        $location.path(path);
    };
}]);

