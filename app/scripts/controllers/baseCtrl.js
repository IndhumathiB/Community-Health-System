'use strict';

angular.module('chsApp')
    .controller('baseCtrl', function ($scope, $http, $filter, $rootScope, $location, $cookies, APIs, $timeout) {


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

            $rootScope.NotificationCount = window.localStorage['NotificationCount'];
            $rootScope.user_name = window.localStorage['user_name'];

        }



        $rootScope.shortURL = function (longUrl) {
            APIs.shortenURL(longUrl).success(function (data) {
                $scope.shortedUrl = data;

            });
        }

        $rootScope.resetURL = function () {
            $scope.shortedUrl = '';
            $scope.longUrl = '';
        }


        $rootScope.fnClickBar = function () {
            $('#side-nav').toggleClass('collapsed');
        }

        $(window).resize(function () {
            var value = $(window).width();
            if (value <= 992) {

                $scope.desktopView = false;
                $scope.mobileView = true;
                $('#side-nav').addClass('collapsed');

            } else {
                $scope.mobileView = false;
                $scope.desktopView = true;
                $('#side-nav').removeClass('collapsed');
            }
        });


        var consumer_key = window.localStorage['consumer_key'];
        var consumerSecret = window.localStorage['consumerSecret'];

        if (consumerSecret != undefined || consumer_key != undefined) {
            if (consumer_key.length == 0 || consumerSecret.length == 0) {

                window.location = '/#/login';

            }
        } else {
            window.location = '/#/login';
        }

        $(window).trigger('resize');

        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //January is 0!
        var yyyy = today.getFullYear();

        if (dd < 10) {
            dd = '0' + dd
        }

        if (mm < 10) {
            mm = '0' + mm
        }

        today = mm + '/' + dd + '/' + yyyy;

        $rootScope.SaveDateFormat1 = today;

        var today = new Date();


        var dd = today.getDate();
        var mm = today.getMonth() + 1; //January is 0! 
        var yyyy = today.getFullYear();
        if (dd < 10) {
            dd = '0' + dd
        }
        if (mm < 10) {
            mm = '0' + mm
        }
        $rootScope.SaveDateFormat = mm + '/' + dd + '/' + yyyy;


        var cur = new Date();
        var dateTime = cur.getTime();
        var weekstart = cur.getDay();
        var SevenDays = dateTime - ((weekstart) * 24 * 60 * 60 * 1000);
        $rootScope.result = new Date(SevenDays).toLocaleDateString();
        var enddate = dateTime - ((weekstart - 6) * (24 * 60 * 60 * 1000));
        $rootScope.result1 = new Date(enddate).toLocaleDateString();

        $rootScope.ConvertDateFormat = function (date) {
            var resultDate = new Date(date);

            var dd = resultDate.getDate();
            var mm = resultDate.getMonth() + 1; //January is 0!
            var yyyy = resultDate.getFullYear();

            if (dd < 10) {
                dd = '0' + dd
            }

            if (mm < 10) {
                mm = '0' + mm
            }

            resultDate = mm + '/' + dd + '/' + yyyy;
            return resultDate;
        }

    });