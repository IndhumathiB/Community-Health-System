'use strict';
angular.module('chsApp')
    .controller('LoginCtrl', function ($scope, $rootScope, $http, $location, $cookies, APIs, growl) {
        $rootScope.showSideBar = false;
        $rootScope.bodylayout = 'login';
        $scope.signIn = function () {


            var user = {
                'user_name': $scope.username,
                'password': $scope.password
            };
            var headers = {
                'Content-Type': 'application/x-www-form-urlencoded'
            };

            APIs.LogInServiceAuth(user, headers).success(function (data, status) {

                $rootScope.user_name = window.localStorage['user_name'];
                $rootScope.NotificationCount = window.localStorage['NotificationCount'];
                $cookies.putObject('role_authorization', data.role_authorization);


                $cookies.put('levelName', data.level_name);
                $cookies.put('consumerSecret', data.consumer_secret);
                $cookies.put('userName', data.user_name);
                $cookies.put('Id', data.id);
                $cookies.put('Level', data.level);
                $cookies.put('consumerKey', data.consumer_key);


                window.localStorage['consumer_key'] = data.consumer_key;
                window.localStorage['consumerSecret'] = data.consumer_secret;
                window.localStorage['id'] = data.id;
                window.localStorage['Level'] = data.level;
                window.localStorage['user_name'] = data.user_name;

                if (data.level != 90) {
                    data.Notification.count = 0;
                };

                window.localStorage['NotificationCount'] = data.Notification.count;

                var LevelFind = data.level;



                $scope.username = '';
                $scope.password = '';
                var k = [];
                if (status == 200) {
                    $rootScope.bodylayout = '';
                    $rootScope.showSideBar = true;

                    var cookieWObject = $cookies.getObject('role_authorization');
                    var cookieValue = cookieWObject;
                    if (cookieValue) {
                        for (var i = 0; i < cookieValue.length; i++) {
                            cookieValue[i].menu_name = (cookieValue[i].menu_name).replace(/\s/g, '');
                            if (cookieValue[i].sub_menus != null) {

                                for (var j = 0; j < cookieValue[i].sub_menus.length; j++) {
                                    cookieValue[i].sub_menus[j].submenu_name = (cookieValue[i].sub_menus[j].submenu_name).replace(/\s/g, '');
                                }
                            }
                        }
                        $rootScope.menu1 = cookieValue;
                    }



                    if (LevelFind == 20) {
                        window.location = '/#/DashboardWriter';
                    } else {
                        window.location = '/#/Dashboard';
                    }


                }






            }).error(function (data, status) {

                if (status == 400) {

                    $rootScope.slideDownAlertBox = 'slideDown';
                    growl.addErrorMessage('Please provide User Name or Password!', config);


                } else if (status == 401) {
                    $rootScope.slideDownAlertBox = 'slideDown';
                    growl.addErrorMessage('Incorrect User Name or Password!', config);

                } else {
                    $rootScope.slideDownAlertBox = 'slideDown';
                    growl.addErrorMessage('Something went wrong! Please try again later.', config);

                }
            });

        };


        $rootScope.slideDownAlertBox = '';
        var config = {};


    });