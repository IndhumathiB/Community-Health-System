'use strict';

angular.module('chsApp')
    .controller('siteblogPlanCtrl', function ($scope, $http, $rootScope, $filter, $location, $cookies, APIs, growl) {

        $rootScope.showSideBar = true;
        $rootScope.slideDownAlertBox = '';
        var config = {};
        $rootScope.bodylayout = '';

        $scope.submitted = false;



        $scope.cancelUser = function () {
            $scope.hideAddUserForm = false;
            $scope.hideNavBar = false;
            $scope.editForm = false;
        };




        $scope.showAddForm = function () {
            $scope.blogTopic = '';
            $scope.blogDate = '';
            $scope.blogNotes = '';
            $scope.siteclientType = '';
            $scope.showSaveButton = true;
            $scope.contentCategoryType = '';
            $scope.contentDescription = '';
            $scope.contentClientType = '';
            $scope.id = '';
            $scope.contentPlatformsType = '';
            $scope.hideAddUserForm = true;
            $scope.hideNavBar = true;
            $scope.submitted = false;
        };



        $scope.siteManagementsDatas = [];

        /*Global Var*/


        $scope.EnterPriseAdmin = true;
        $scope.Supervisor = true;
        $scope.Client = true;
        $scope.FreelanceWriter = true;
        $scope.BallyWhoAdmin = true;
        $scope.showHospitalField = false;
        $scope.showSaveButton = true;
        $scope.editForm = false;
        $scope.hideAddUserForm = false;
        var consumer_key =   window.localStorage['consumer_key'];
        var consumerSecret = window.localStorage['consumerSecret'];
        var id =   window.localStorage['id'];
        var Level =   window.localStorage['Level'];


        if (consumerSecret != undefined || consumer_key != undefined) {
            if (consumer_key.length == 0 || consumerSecret.length == 0) {

                window.location = '/#/login';
                return;

            }
        } else {
            window.location = '/#/login';
            return;
        }

        $scope.ShowAdminForm = false;
        if (Level == 90) {
            $scope.ShowAdminForm = true;
        };

        /*end of Global Var*/

        /*Refresh Grid*/
        $scope.Refresh = function () {

            var url = serviceUrlBase + 'SiteManagement.svc/GetAllBlogPlans';
            var method = 'GET';
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
            APIs.getSiteMangmnt(params, authorizationHeader)
                .success(function (data, status) {
                    $scope.siteManagementsDatas = data.ContentBlogPlans;
                    $scope.clientSelection = data.ClientNameLoad;
                }).error(function (data, status) {
                    $rootScope.slideDownAlertBox = 'slideDown';
                    growl.addErrorMessage('Something went wrong! Please try again later.', config);
                });    
        };

        $scope.Refresh();
        /*end of Refresh Grid*/


        /*Delete User*/
        $scope.deleteblog = function (idValue) {
            var id = {
                'id': idValue              
            };
            var url = serviceUrlBase + 'SiteManagement.svc/DeleteBlogPlan';
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
            var Delete1 = confirm('Are you sure you want to delete?');
            if (Delete1 == true) {
                APIs.DeleteSiteBlogPlan(id, params, authorizationHeader)
                    .success(function (data, status) {
                        if (status == 200) {
                            $rootScope.slideDownAlertBox = 'slideDown';
                            growl.addSuccessMessage(data, config);
                            $scope.Refresh();
                        }
                    }).error(function (data, status) {
                        $rootScope.slideDownAlertBox = 'slideDown';
                        growl.addErrorMessage('Something went wrong! Please try again later.', config);
                    });
            }
        };
        /*end of Delete User*/

        $scope.AddClient = function () {

            var e = document.getElementById('siteclientType');
            var str = e.options[e.selectedIndex].value;
            str = str.substring(str.indexOf(':') + 1);
            $scope.submitted = true;
            var listOdAddUser123 = {
                'hospitalID': parseInt(str),
                'topic': $scope.blogTopic,
                'runDate': $scope.blogDate,
                'notes': $scope.blogNotes
            }

            var url = serviceUrlBase + 'SiteManagement.svc/AddBlogPlan';
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
            if (!$scope.siteblogplansForm.$invalid) {
                APIs.AddSiteBlogPlan(listOdAddUser123, params, authorizationHeader)
                    .success(function (data, status) {
                        if (status == 200) {
                            $rootScope.slideDownAlertBox = 'slideDown';
                            growl.addSuccessMessage(data, config);
                            $scope.hideAddUserForm = false;
                            $scope.Refresh();
                            $scope.hideNavBar = false;
                        }
                    }).error(function (data, status) {
                        $rootScope.slideDownAlertBox = 'slideDown';
                        growl.addErrorMessage('Something went wrong! Please try again later.', config);

                    });
            }
        };






        /*edit client Data*/
        $scope.editClient = function (clientDatas) {
            $scope.submitted = false;
            $scope.showSaveButton = false;
            $scope.editForm = true;
            $scope.hideAddUserForm = true;

            $scope.clientId = clientDatas;

            var user = {
                'id': parseInt(clientDatas)
            };

            var url = serviceUrlBase + 'SiteManagement.svc/GetBlogPlansById';
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
            APIs.GetBlogPlansById(user, params, authorizationHeader)
                .success(function (data, status) {
                    if (status == 200) {
                        $scope.blogTopic = data.topic;
                        $scope.blogDate = data.runDate;
                        $scope.blogNotes = data.notes;
                        $scope.siteclientType = Number(data.hospitalID);

                    };                    
                }).error(function (data, status) {
                    $rootScope.slideDownAlertBox = 'slideDown';
                    growl.addErrorMessage('Something went wrong! Please try again later.', config);
                });  
        };



        $scope.editclientSubmit = function () {

            var e = document.getElementById('siteclientType');
            var str = e.options[e.selectedIndex].value;
            str = str.substring(str.indexOf(':') + 1);
            $scope.submitted = true;
            var listOdAddUser123 = {                
                'id': parseInt($scope.clientId),
                'hospitalID': parseInt(str),
                'topic': $scope.blogTopic,
                'runDate': $scope.blogDate,
                'notes': $scope.blogNotes  
            }

            $scope.submitted = true;
            var url = serviceUrlBase + 'SiteManagement.svc/AddBlogPlan';
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

            if (!$scope.siteblogplansForm.$invalid) {
                APIs.UpdateSiteBlogPlan(listOdAddUser123, params, authorizationHeader)
                    .success(function (data, status) {
                        if (status == 200) {

                            $rootScope.slideDownAlertBox = 'slideDown';
                            growl.addSuccessMessage(data, config);
                            $scope.hideAddUserForm = false;
                            $scope.Refresh();
                            $scope.editForm = false;
                        }
                    }).error(function (data, status) {
                        $rootScope.slideDownAlertBox = 'slideDown';
                        growl.addErrorMessage('Something went wrong! Please try again later.', config);
                    });
            }
        };

        //Sorting
        $scope.clientManagementSort = function (asc, header) {

            if (asc) {
                $scope.siteManagementsDatas.sort(predicatByAsc(header));

            }
            if (!asc) {
                $scope.siteManagementsDatas.sort(predicatByDes(header));

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
        }

        function predicatByDes(prop) {
            return function (a, b) {
                if (a[prop].toLowerCase() < b[prop].toLowerCase()) {
                    return 1;
                } else if (a[prop].toLowerCase() > b[prop].toLowerCase()) {
                    return -1;
                }
                return 0;
            }
        }





        //Pagination

        $scope.currentPage = 0;
        $scope.itemsPerPage = 5;

        $scope.predisable = false;
        $scope.nextdisable = false;
        $scope.range = function () {
            var rangeSize = $scope.pageCount();
            if (rangeSize >= 6) {
                rangeSize = 5;
            }

            if (rangeSize <= 4) {
                rangeSize = $scope.pageCount() + 1;
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

            if ($scope.siteManagementsDatas) {
                return Math.ceil($scope.siteManagementsDatas.length / $scope.itemsPerPage) - 1;
            };



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