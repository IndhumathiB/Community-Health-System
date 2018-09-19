'use strict';

angular.module('chsApp')
    .controller('blogPlansCtrl', function ($scope, $http, $rootScope, $filter, $location, $cookies, APIs, growl) {

        $rootScope.showSideBar = true;


        $rootScope.slideDownAlertBox = '';
        var config = {};
        $rootScope.bodylayout = '';


        $scope.submitted = false;



        $scope.blogPlansDatas = [];

        var id = window.localStorage['id'];
        var Level = window.localStorage['Level'];
        var consumer_key = window.localStorage['consumer_key'];
        var consumerSecret = window.localStorage['consumerSecret'];
        var id = window.localStorage['id'];
        var Level = window.localStorage['Level'];

        $scope.ShowAdminForm = false;
        if (Level == 30 || Level == 90 || Level == 50) {
            $scope.ShowAdminForm = true;
        };


        if (consumerSecret != undefined || consumer_key != undefined) {
            if (consumer_key.length == 0 || consumerSecret.length == 0) {

                window.location = '/#/login';
                return;

            }
        } else {
            window.location = '/#/login';
            return;
        }
        /*Refresh Grid*/
        $scope.Refresh = function () {
            var user = {
                'user_id': id,
                'user_level': Level
            };

            var url = GetBlogPlans;
            var method = 'POST';
            var oAuthDatas = authSignature(consumer_key, consumerSecret, url, method);
            var params = {
                'oauth_consumer_key': oAuthDatas.msgParameters[0][1],
                'oauth_signature_method': oAuthDatas.msgParameters[1][1],
                'oauth_version': oAuthDatas.msgParameters[2][1],
                'oauth_timestamp': oAuthDatas.msgParameters[3][1],
                'oauth_nonce': oAuthDatas.msgParameters[4][1],
                'oauth_signature': oAuthDatas.msgParameters[5][1]
            };
            var authorizationHeader = OAuth.getAuthorizationHeader(oAuthDatas.relam, oAuthDatas.msgParameters);
            APIs.GetBlogPlans(user, params, authorizationHeader)
                .success(function (data, status) {
                    $scope.blogPlansDatas = data.ContentBlogPlans;
                    $scope.clientNames = data.ClientNameLoad;
                }).error(function (data, status) {

                    $rootScope.slideDownAlertBox = 'slideDown';
                    growl.addErrorMessage('Something went wrong! Please try again later.', config);
                });
        };

        $scope.Refresh();
        /*end of Refresh Grid*/

        $scope.startDate = '';
        $scope.endDate = '';
        $scope.checkErr = function (startDate, endDate) {
            $scope.errMessage1 = '';
            $scope.errMessage2 = '';
            $scope.startDate = startDate;
            $scope.endDate = endDate;


            if (new Date($scope.startDate) > new Date($scope.endDate)) {
                $scope.errMessage2 = 'End Date should be greater than start date';
                return false;
            }

            if (new Date($scope.startDate) < datevalue) {
                $scope.errMessage1 = 'Start date should not be before today.';
                return false;
            }

        };





        $scope.FilterBlogClient = function () {

            var url = FilterByBlogClient;
            var method = 'POST';
            var oAuthDatas = authSignature(consumer_key, consumerSecret, url, method);

            var params = {
                'oauth_consumer_key': oAuthDatas.msgParameters[0][1],
                'oauth_signature_method': oAuthDatas.msgParameters[1][1],
                'oauth_version': oAuthDatas.msgParameters[2][1],
                'oauth_timestamp': oAuthDatas.msgParameters[3][1],
                'oauth_nonce': oAuthDatas.msgParameters[4][1],
                'oauth_signature': oAuthDatas.msgParameters[5][1]
            };
            var authorizationHeader = OAuth.getAuthorizationHeader(oAuthDatas.relam, oAuthDatas.msgParameters);


            var data = {
                'member_id': Number(id),
                'user_level': Number(Level),
                'hospitalID': $scope.blogclientName || '',
                'startDate': $scope.startDate,
                'endDate': $scope.endDate
            }

            if ($scope.startDate && $scope.endDate) {
                APIs.FilterByBlogClient(data, params, authorizationHeader)
                    .success(function (data, status) {
                        if (status == 200) {
                            $scope.blogPlansDatas = data;
                            $rootScope.slideDownAlertBox = 'slideDown';
                            growl.addSuccessMessage('successfully filtered', config);
                        }
                    }).error(function (data, status) {

                        $rootScope.slideDownAlertBox = 'slideDown';
                        growl.addErrorMessage('Something went wrong! Please try again later.', config);

                    });
            } else {
                $rootScope.slideDownAlertBox = 'slideDown';
                growl.addErrorMessage('Please Select Start date and End Date', config);
            }


        };


        //reset Filter Function
        $scope.emptyFilterBlogClient = function () {
            $scope.Refresh();
            $scope.blogclientName = '';
            $scope.startDate = '';
            $scope.endDate = '';
        };






        //Sorting
        $scope.bloPlansSort = function (asc, header) {

            if (asc) {
                $scope.blogPlansDatas.sort(predicatByAsc(header));

            }
            if (!asc) {
                $scope.blogPlansDatas.sort(predicatByDes(header));
            }
        };

        function predicatByAsc(prop) {
            return function (a, b) {
                if (a[prop].toLowerCase() > b[prop].toLowerCase()) {
                    return 1;
                } else if (a[prop].toLowerCase() < b[prop].toLowerCase()) {
                    return -1;
                }
                return 0;
            }
        };

        function predicatByDes(prop) {
            return function (a, b) {
                if (a[prop].toLowerCase() < b[prop].toLowerCase()) {
                    return 1;
                } else if (a[prop].toLowerCase() > b[prop].toLowerCase()) {
                    return -1;
                }
                return 0;
            }
        };


        //Pagination

        $scope.currentPage = 0;
        $scope.itemsPerPage = 2;

        $scope.predisable = false;
        $scope.nextdisable = false;
        $scope.range = function () {
            var rangeSize = $scope.pageCount();
            if (rangeSize >= 6) {
                rangeSize = 5;
            }
            var ps = [];
            var start;

            start = $scope.currentPage;
            if (start > $scope.pageCount() - rangeSize) {
                start = $scope.pageCount() - rangeSize + 1;
            }

            for (var i = start; i < start + rangeSize; i++) {
                ps.push(i);
            }
            return ps;
        };

        $scope.prevPage = function () {

            if ($scope.currentPage > 0) {
                $scope.nextdisable = false;
                $scope.currentPage--;
            }
        };

        $scope.DisablePrevPage = function () {
            return $scope.currentPage == 0 ? 'btn-disabled' : '';
        };

        $scope.pageCount = function () {


            return Math.ceil($scope.blogPlansDatas.length / $scope.itemsPerPage) - 1;


        };

        $scope.nextPage = function () {


            if ($scope.currentPage < $scope.pageCount()) {
                $scope.currentPage++;
                $scope.predisable = false;
            }
        };

        $scope.DisableNextPage = function () {
            return $scope.currentPage == $scope.pageCount() ? 'btn-disabled' : '';
        };

        $scope.setPage = function (n) {
            $scope.currentPage = n;
        };


    });