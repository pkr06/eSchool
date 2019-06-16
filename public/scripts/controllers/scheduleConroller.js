myApp.controller('ScheduleController', ['$scope', 'PassportFactory', 'DataFactory', '$http', '$window', '$location',
    function($scope, PassportFactory, DataFactory, $http, $window, $location) {

    //Creates an object to store the info of a logged-in user
    $scope.loggedInUser = {};
    //Creates an array to store the list of lesson plans from the database
    $scope.lessonPlans;
    $scope.lessons = {};

    $scope.passportFactory = PassportFactory;
    $scope.dataFactory = DataFactory;
    $scope.loggedInUser = $scope.passportFactory.factoryLoggedInUser();

    //validateUser to make sure the role can be on this page then get all the lessons for the teacher
    validateUser();
    console.log($scope.lessons);

    //Function to check the user and re-route them if they are not validated
    function validateUser() {
        if($scope.loggedInUser.role == 'student') {
            getFavorites();
            getSchedules(1);
        } else if($scope.loggedInUser.role == 'admin') {
            getLessons();
            getSchedules(1);
        } else {
            $location.path('/home');
        }
    }

    //Function to get all the teachers
    function getLessons () {
        $scope.dataFactory.factoryAdminApprvoedLessons().then(function () {
            $scope.lessons = $scope.dataFactory.factoryApprovedLessons();
        });
    }

    //Function to get all the schedules
    function getSchedules(id) {
        $scope.dataFactory.factoryGetSchedules(id).then(function () {
            $scope.schedules = $scope.dataFactory.factorySchedules();
        });
    }

    //Function to generate schedules
    function generateSchedules(id) {
        $scope.dataFactory.factoryGenerateSchedules(id).then(function () {
            $scope.schedules = $scope.dataFactory.factoryGenerate();
        });
    }

    //Function to get favorite lesson plans for this teacher
    function getFavorites() {
        $scope.dataFactory.factoryGetFavorites($scope.loggedInUser.users_id).then(function (response) {
            $scope.favoritePlans = $scope.dataFactory.factoryGetFavoritePlans($scope.loggedInUser.users_id);
        });
    }

    //Function to reroute the user to the lesson plan controller
        $scope.editClickedLesson2 = function(index){
            $scope.dataFactory.factoryStoredLessonId = $scope.schedules[index].lesson_id;
            $scope.dataFactory.factoryLessonViewState = true;
            $scope.dataFactory.factoryLessonStatus = $scope.lessonPlans[index].status;
            $location.path('/lesson_plan');
        };

        //Function to reroute the user to the lesson plan controller
        $scope.editClickedFav = function(index){
            $scope.dataFactory.factoryStoredLessonId = $scope.favoritePlans[index].lesson_id;
            $scope.dataFactory.factoryLessonViewState = true;
            $scope.dataFactory.factoryLessonStatus = $scope.favoritePlans[index].status;
            $location.path('/lesson_plan');
        };

        $scope.editClickedLesson = function(index){
            var lesson = $scope.lessons[index];
            getSchedules(lesson.lesson_id);
        };

        //Function to edit a schedule
        $scope.editClickedSchedule = function(index, field, on){
            $("body").css("cursor", "progress");
            var oneSchedule = $scope.schedules[index];
            if (on) {
                if (field == 0)
                  oneSchedule.nine_ten = $scope.loggedInUser.username;
                else if (field == 1)
                  oneSchedule.ten_eleven = $scope.loggedInUser.username;
                else if (field == 2)
                  oneSchedule.eleven_twelve = $scope.loggedInUser.username;
                else if (field == 3)
                  oneSchedule.twelve_thirteen = $scope.loggedInUser.username;
                else if (field == 4)
                  oneSchedule.thirteen_fourteen = $scope.loggedInUser.username;
                else if (field == 5)
                  oneSchedule.fourteen_fifteen = $scope.loggedInUser.username;
                else if (field == 6)
                  oneSchedule.fifteen_sixteeen = $scope.loggedInUser.username;
                else if (field == 7)
                  oneSchedule.sixteen_seventeen = $scope.loggedInUser.username;
            } else {
                if (field == 0)
                  oneSchedule.nine_ten = "";
                else if (field == 1)
                  oneSchedule.ten_eleven = "";
                else if (field == 2)
                  oneSchedule.eleven_twelve = "";
                else if (field == 3)
                  oneSchedule.twelve_thirteen = "";
                else if (field == 4)
                  oneSchedule.thirteen_fourteen = "";
                else if (field == 5)
                  oneSchedule.fourteen_fifteen = "";
                else if (field == 6)
                  oneSchedule.fifteen_sixteeen = "";
                else (field == 7)
                  oneSchedule.sixteen_seventeen = "";
            }
            $scope.dataFactory.factoryEditSchedule(oneSchedule);
            getSchedules(1);
            $("body").css("cursor", "default");
        };
}]);
