myApp.factory('PassportFactory', 
  ['$http', '$location', '$q',
  function($http, $location, $q) {

    //private
    var loggedInUser = {};
    var addedUser = {};
    var userEmail = {};

    //login
    var userSubmit =  function(username, password) {
        var user = {
            username: username,
            password: password
        };

        $http.post('/login', user).then( function(response) {
            loggedInUser = response.data;

        if(loggedInUser.role == 'admin') {
            $location.path('/admin_dash');
        } else if (loggedInUser.role == 'teacher')  {
            $location.path('/teacher_dash');
        } else if (loggedInUser.role == 'student')  {
            $location.path('/student_dash');
        } else {
            $location.path('/error');
        }
      });
    };

    //add new user
    var saveNewEntry = function(entry) {
        var promise = $http.post('/register', entry).then( function(response) {
            addedUser = response.data[0];
        });
        return promise;
    };

    //update existing user
    var saveUpdatedEntry = function(entry) {
        var promise = $http.post('/update_user', entry).then( function(response) {
            updatedEntry = response.data;
        });
        return promise;
    };

    //verifying token
    var verifyToken = function(token) {
        var promise = $http.get('/email/' + token).then(function(response) {
            userEmail = response.data[0].username;
        });
        return promise;
    };

    //set new password
    var setPassword = function(password) {
        var promise = $http.put('/register', password).then(function(response) {
        });
        return promise;
    };

    //reset password
    var tokenReset = function(username) {
        var promise = $http.post('/email', username).then(function(response) {
        });
        return promise;
    };

    //reset password
    var removeUser = function(id) {
        var promise = $http.put('/remove_user', id).then(function(response) {
        });
        return promise;
    };

    //logout user
    var logoutUser = function() {
        var promise = $http.get('/logout').then( function(response) {
            loggedInUser = '';
            loggedInUser = null;
            $location.path('/home');
        });
        return promise;
    };


    //public
    var publicApi = {
        factoryUserSubmit: function(username, password) {
            return userSubmit(username, password);
        },
        factoryLoggedInUser: function() {
            return loggedInUser;
        },
        factorySaveNewEntry: function(entry) {
            return saveNewEntry(entry);
        },
        factoryNewEntry: function() {
            return addedUser;
        },
        factorySaveUpdatedEntry: function(entry) {
            return saveUpdatedEntry(entry);
        },
        factoryVerifyToken: function(token) {
            return verifyToken(token);
        },
        factoryUserEmail: function() {
            return userEmail;
        },
        factorySetPassword: function(password) {
            return setPassword(password);
        },
        factoryTokenReset: function(username) {
            return tokenReset(username);
        },
        factoryRemoveUser: function(id) {
            return removeUser(id);
        },
        factoryLogoutUser: function() {
            return logoutUser();
        }
    };
    return publicApi;
}]);
