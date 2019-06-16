var myApp = angular.module('myApp', 
  ['ngRoute', 'ngAnimate', 'ui.bootstrap', 'ngTagsInput', 'pascalprecht.translate']);

var translationsEN = {
  WELCOME: 'Welcome',
  TXT_USERID: 'username',
  TXT_PASSWD: 'password',
  BTN_LOGIN: 'Login',
  BTN_SELECT: 'Select',
  MENU_HOME: 'Home',
  MENU_LESSON_MGMT: 'Lesson Management',
  MENU_USER_MGMT: 'User Management',
  MENU_SCHEDULE_MGMT: 'Schedule Management',
  MENU_SEARCH: 'Search',
  MENU_LOGOUT: 'Logout',
  MENU_MY_SCHEDULE: 'My Schedule',
  LESSONS_PENDING_APPROVAL: 'Lessons Pending Approval',
  TH_TITLE: 'Title',
  TH_AUTHOR: 'Author',
  TH_STATUS: 'Status',
  TH_DATE: 'Date',
  TH_MATERIALS: 'Materials',
  LESSON_PLAN: "Lesson Plan",
  Resource: "Resource",
  Enter_Title:  "Enter Title",
  Author: "Author",
  Add_Tags: "Add Tags",
  Arrow_down: "Arrow down to see complete list",
  Materials_required: "Materials required",
  Add_Materials: "Add Materials",
  Lesson_text: "Lesson text",
  Create_Your_Lesson_Plan: "Create Your Lesson Plan",
  No_files_chosen: "No files chosen",
  Upload_Files: "Upload File",
  Save_Draft: "Save Draft",
  Publish: "Publish",
    BTN_SUBMIT:        "Submit",
    BTN_NEEDS_REVIEW:        "Needs Review",
    BTN_REMOVE:        "Remove",
    Manage_Users: "Manage Users",
    Existing_Users: "Existing Users",
    Username: "Username",
    Admin:  "Admin",
    Teacher:  "Teacher",
    Student:  "Student",
    First_Name: "First Name",
    Last_Name:  "Last Name",
    Phone:  "Phone",
    Grade:  "Grade",
    All_Lessons:    "All Lessons",
    My_Lessons:     "My Lessons",
    Schedule_for_week:      "Schedule for week",
    My_schedule:    "My schedule",
    Lesson: "Lesson",
    Select: "Select",
    Booked: "Booked",
};

var translationsJP = {
    WELCOME: 'ようこそ',
    TXT_USERID: 'ユーザ名',
    TXT_PASSWD: 'パスワード',
    BTN_LOGIN: 'ログイン',
    BTN_SELECT: '選択します',
    MENU_HOME: 'ホーム',
    MENU_LESSON_MGMT: '授業計画管理',
    MENU_USER_MGMT: 'ユーザー管理',
    MENU_SCHEDULE_MGMT: 'スケジュール管理',
    MENU_SEARCH: 'サーチ',
    MENU_LOGOUT: 'ログアウト',
    MENU_MY_SCHEDULE: '私のスケジュール',
    LESSONS_PENDING_APPROVAL: '承認待ちレッスン',
    TH_TITLE: 'タイトル',
    TH_AUTHOR: '著者',
    TH_STATUS: '状態',
    TH_DATE: '日付',
    TH_MATERIALS: '材料',
    LESSON_PLAN: "レッスンプラン",
    Resource:       "リソース",
    Enter_Title:    "タイトル",
    Author: "著者",
    Add_Tags:       "タグを追加する",
    Arrow_down:        "完全なリストを表示するには、下矢印",
    Materials_required:     "材料が必要",
    Add_Materials:   "材料を追加",
    Lesson_text:    "レッスンのテキスト",
    Create_Your_Lesson_Plan:        "あなたのレッスンプラン",
    No_files_chosen:        "いいえファイルが選択されません",
    Upload_Files:   "ファイルのアップロード",
    Save_Draft:     "下書きを保存",
    Publish:        "パブリッシュ",
    BTN_SUBMIT: "提出",
    BTN_NEEDS_REVIEW: "レビュー",
    BTN_REMOVE:        "削除",
    Manage_Users:   "ユーザー管理",
    Existing_Users: "既存のユーザー",
    Username:       "ユーザー名",
    Admin:  "管理者",
    Teacher:        "先生",
    Student:        "学生",
    First_Name:     "ファーストネーム",
    Last_Name:      "苗字",
    Phone:  "電話",
    Grade:  "グレード",
    All_Lessons:    "すべてのレッスン",
    My_Lessons:     "私のレッスン",
    Schedule_for_week:      "一週間のスケジュール",
    My_schedule:    "私のスケジュール",
    Lesson: "レッスン",
    Select: "選択します",
    Booked: "予約されました",
    };
     
myApp.config(['$translateProvider', function ($translateProvider) {
  $translateProvider.useSanitizeValueStrategy(null);
  $translateProvider
    .translations('en', translationsEN)
    .translations('jp', translationsJP)
    .preferredLanguage('en');
  
}]);


myApp.config(['$routeProvider', function($routeProvider) {

    $routeProvider
        .when('/home', {
            templateUrl: '/views/templates/login.html',
            controller: 'LoginController'
        })
        .when('/admin_dash', {
            templateUrl: '/views/templates/admin_dash.html',
            controller: 'AdminDashController'
        })
        .when('/teacher_dash', {
            templateUrl: '/views/templates/teacher_dash.html',
            controller: 'TeacherDashController'
        })
        .when('/student_dash', {
            templateUrl: '/views/templates/student_dash.html',
            controller: 'StudentDashController'
        })
        .when('/schedule_plan', {
            templateUrl: '/views/templates/schedule_plan.html',
            controller: 'ScheduleController'
        })
        .when('/search', {
            templateUrl: '/views/templates/search.html',
            controller: 'SearchController'
        })
        .when('/lesson_plan', {
            templateUrl: '/views/templates/lesson_plan.html',
            controller: 'LessonPlanController'
        })
        .when('/register', {
            templateUrl: '/views/templates/register.html',
            controller: 'CreateUserController'
        })
        .when('/password/:token', {
            templateUrl: '/views/templates/password.html',
            controller: 'PasswordController'
        })
        .when('/reset', {
            templateUrl: '/views/templates/reset.html',
            controller: 'ResetController'
        })
        .otherwise({
            redirectTo: '/home'
        });
}]);
