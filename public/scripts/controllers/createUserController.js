myApp.controller('CreateUserController', 
  ['$q', '$http', '$scope', 'PassportFactory', '$route', '$location', '$uibModal', '$log', 'DataFactory', 
  function($q, $http, $scope, PassportFactory, $route, $location, $uibModal, $log, DataFactory) {

    $scope.dataFactory = DataFactory;
    $scope.passportFactory = PassportFactory;
    $scope.selectedName = null;
    $scope.users_id = null;
    $scope.getNames = [];
    $scope.viewData = [];
    $scope.tags = [];
    $scope.loggedInUser = $scope.passportFactory.factoryLoggedInUser();
    $scope.classifications = [];
    $scope.types = [];
    $scope.roles = [];

    validateUser();

    console.log($scope.roles);

    //Function to check the user and re-route them if they are not validated
    function validateUser() {
        if($scope.loggedInUser.role == 'admin') {
            getClassification();
            getType();
            getRole();
            getNames();
        } else {
            $location.path('/home');
        }
    }

    //populating drop-down of tags
    function getTags() {
      var deferred = $q.defer();

      $http.get('/tags')
        .success(function (data, status) {
          if(status === 200 && data.length >= 0){
            $scope.tags = data;
            deferred.resolve();
          } else {
            deferred.reject();
          }
        })
        .error(function (data) {
          deferred.reject();
        });
      return deferred.promise;
    };

    function getClassification() {
      var deferred = $q.defer();

      $http.get('/tags/classification')
        .success(function (data, status) {
          if(status === 200 && data.length >= 0){
            $scope.classifications = data;
            deferred.resolve();
          } else {
            deferred.reject();
          }
        })
        .error(function (data) {
          deferred.reject();
        });
      return deferred.promise;
    };

    function getType() {
      var deferred = $q.defer();

      $http.get('/tags/type')
        .success(function (data, status) {
          if(status === 200 && data.length >= 0){
            $scope.types = data;
            deferred.resolve();
          } else {
            deferred.reject();
          }
        })
        .error(function (data) {
          deferred.reject();
        });
      return deferred.promise;
    };

    function getRole() {
      var deferred = $q.defer();

      $http.get('/tags/role')
        .success(function (data, status) {
          if(status === 200 && data.length >= 0){
            $scope.roles = data;
            deferred.resolve();
          } else {
            deferred.reject();
          }
        })
        .error(function (data) {
          deferred.reject();
        });
      return deferred.promise;
    };

    //populating drop-down of existing users
    function getNames() {
        $scope.dataFactory.factoryGetNames().then(function () {
            $scope.getNames = $scope.dataFactory.factoryNames();
        });
    }

    //get info of selected name
    $scope.getInfo = function () {
        $scope.dataFactory.factorySelectedName($scope.selectedName).then(function () {
            $scope.viewData = $scope.dataFactory.factoryName();
            console.log($scope.viewData);
            $scope.username = $scope.viewData[0].username;
            $scope.first_name = $scope.viewData[0].first_name;
            $scope.last_name = $scope.viewData[0].last_name;
            $scope.role = $scope.viewData[0].role;
            $scope.phone = $scope.viewData[0].phone;
            $scope.grade = $scope.viewData[0].grade;
            $scope.users_id = $scope.viewData[0].users_id;
        });
    };

    //clears form
    function clearForm () {
        $scope.username = null;
        $scope.password = null;
        $scope.first_name = null;
        $scope.last_name = null;
        $scope.role = null;
        $scope.phone = null;
        $scope.grade = null;
        $scope.users_id = null;
    }
    
    function checkRole(){
        var chk = $scope.role;
        if (chk === 'student') {
            $scope.showGrade = true;
        } else {
            $scope.showGrade = false;
        }
        console.log(chk);
        console.log($scope.showGrade);
    }

    //captures data off form
    $scope.saveUser = function () {
        var entry = {
            username: $scope.username,
            //password is set to '123' by default
            password: '123',
            role: $scope.role,
            first_name: $scope.first_name,
            last_name: $scope.last_name,
            phone: $scope.phone,
            grade: $scope.grade,
            users_id: $scope.users_id
        };

        //if existing user
        if ($scope.users_id > 0) {
            console.log('existing user');
            $scope.passportFactory.factorySaveUpdatedEntry(entry).then(function () {
                clearForm();
                getNames();
            });

        //if new user
        } else {
            console.log('new user');
            $scope.passportFactory.factorySaveNewEntry(entry).then(function () {
                $scope.newUser = $scope.passportFactory.factoryNewEntry();
            console.log($scope.newUser);
                    var resetInfo = {
                        username: $scope.newUser.username,
                        fk_users_id: $scope.newUser.users_id,
                        token: (Math.random() + 1).toString(36).substring(7)
                };
                    $scope.passportFactory.factoryTokenReset(resetInfo).then(function () {
                        clearForm();
                        getNames();
                    });
            });
        }
    };

    $scope.removeUser = function (size) {
        var id = {
            users_id: $scope.users_id
        };
        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'modalRemoveUser.html',
            controller: 'ModalController',
            size: size,
            resolve: {
                myUsername: function () {
                    return $scope.username;
                },
                currentLessonPlan: function () {
                    return $scope.lesson_title;
                }
            }
        });

        modalInstance.result.then(function () {

            $scope.passportFactory.factoryRemoveUser(id).then(function () {
                clearForm();
                $route.reload();
            });
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };
}]);
