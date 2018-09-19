'use strict';

angular.module('chsApp')
    .controller('contentRequestCtrl', function ($scope, $http, $rootScope, $filter, $location, $cookies, APIs, growl) {

        $rootScope.showSideBar = true;
        $rootScope.bodylayout = '';
        $scope.submitted = false;

        $scope.ContentRequestList = [];
        $scope.CategoryList = [];
        $scope.Platforms = [];

        $rootScope.resetURL = function () {
            $scope.shortedUrl = '';
            $scope.longUrl = '';
        };

        $scope.cancelUser = function () {
            $scope.hideAddUserForm = false;
            $scope.hideNavBar = false;
            $scope.editForm = false;
        };
        /*end of Add User*/

        $scope.EnterPriseAdmin = true;
        $scope.Supervisor = true;
        $scope.Client = true;
        $scope.FreelanceWriter = true;
        $scope.BallyWhoAdmin = true;
        $scope.showHospitalField = false;
        $scope.showSaveButton = true;
        $scope.editForm = false;
        $scope.hideAddUserForm = false;
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
        /*end of Global Var*/



        /*Refresh Grid*/
        $scope.Refresh = function () {
            var user = {
                'user_id': parseInt(id),
                'user_level': parseInt(Level)
            };

            var url = serviceUrlBase + 'ContentManagement.svc/GetRequestContents';
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
            APIs.GetRequestContents(user, params, authorizationHeader)
                .success(function (data, status) {


                    $scope.ContentRequestList = data.ContentRequestList;
                    $scope.CategoryList = data.CategoryList;
                    $scope.Platforms = data.Platforms;
                    $scope.ClientLoad = data.ClientLoad;

                }).error(function (data, status) {
                    $rootScope.slideDownAlertBox = 'slideDown';
                    growl.addErrorMessage('Something went wrong! Please try again later.', config);
                });
        };

        $scope.showAchievedItems = function () {
            var user = {
                'user_id': parseInt(id),
                'user_level': parseInt(Level)
            };

            var url = serviceUrlBase + 'ContentManagement.svc/ArchivedRequestContents';
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
            APIs.ShowArchieveRequestContents(user, params, authorizationHeader)
                .success(function (data, status) {

                    $scope.ContentRequestList = data.ContentRequestList;

                }).error(function (data, status) {
                    $rootScope.slideDownAlertBox = 'slideDown';
                    growl.addErrorMessage('Something went wrong! Please try again later.', config);
                });
        };







        $scope.testArchieved = function () {
            if (document.getElementById('showItems1').checked) {
                $scope.showAchievedItems();
            } else {
                $scope.Refresh();
            }
        };
        $scope.testArchieved();

        /*add*/
        $scope.AddContent = function () {
            $scope.submitted = true;


            var listOdAddUser123 = {

                'level_id': parseInt(Level),
                'member_id': parseInt(id),
                'category_id': parseInt($scope.contentCategoryType),
                'hospital_id': parseInt($scope.contentClientType),
                'content': $scope.contentDescription,
                'platform': $scope.contentPlatformsType,
                'duedate': $scope.contentdueDate,
                'savedate': $rootScope.SaveDateFormat

            }


            var url = serviceUrlBase + 'ContentManagement.svc/AddRequestContent';
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
            if (!$scope.contentrequestForm.$invalid) {
                APIs.AddRequestContents(listOdAddUser123, params, authorizationHeader)
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
        /*add*/


        /*edit*/
        /*edit client Data*/
        $scope.editContent = function (clientDatas) {
            $scope.showSaveButton = false;
            $scope.editForm = true;
            $scope.hideAddUserForm = true;

            $scope.clientId = clientDatas;

            var user = {
                'id': parseInt(clientDatas)
            };

            var url = serviceUrlBase + 'ContentManagement.svc/GetRequestContentById/' + clientDatas;
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
            APIs.EditRequestContents(user, params, authorizationHeader)
                .success(function (data, status) {
                    if (status == 200) {

                        $scope.contentCategoryType = data.category_id;
                        $scope.contentDescription = data.content;
                        $scope.contentdueDate = data.duedate;
                        $scope.contentClientType = data.hospital_id;
                        $scope.id = data.id;

                        if (data.platform == 'fb') {

                            $scope.contentPlatformsType = 'Facebook';

                        } else if (data.platform == 'tw') {

                            $scope.contentPlatformsType = 'Twitter';

                        } else {

                            $scope.contentPlatformsType = 'Blog';

                        }
                    };

                }).error(function (data, status) {
                    $rootScope.slideDownAlertBox = 'slideDown';
                    growl.addErrorMessage('Something went wrong! Please try again later.', config);
                });


        };




        $scope.editContentSubmit = function () {
            $scope.submitted = true;

            var timestamp1 = Number(new Date());
            $scope.savedate = '\/Date(' + timestamp1 + ')\/';

            var url = serviceUrlBase + 'ContentManagement.svc/AddRequestContent';
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
            var listcontentUpdate = {

                'id': parseInt($scope.clientId),
                'level_id': parseInt(Level),
                'member_id': parseInt(id),
                'category_id': parseInt($scope.contentCategoryType),
                'hospital_id': parseInt($scope.contentClientType),
                'content': $scope.contentDescription,
                'platform': $scope.contentPlatformsType,
                'duedate': $scope.contentdueDate,
                'savedate': $rootScope.SaveDateFormat
            }
            if (!$scope.contentrequestForm.$invalid) {
                APIs.editRequestContentSubmit(listcontentUpdate, params, authorizationHeader)
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
        /*end of edit client*/


        $scope.showAddForm = function () {
            $scope.submitted = false;
            $scope.contentCategoryType = '';
            $scope.contentDescription = '';
            $scope.contentClientType = '';
            $scope.id = '';
            $scope.contentPlatformsType = '';
            $scope.hideAddUserForm = true;
            $scope.showSaveButton = true;
            $scope.hideNavBar = true;
            $scope.contentdueDate = '';
        }

        /*edit*/




        /*Deactivate User*/
        $scope.ArchieveContent = function (idValue) {
            var id = {
                'id': idValue,
                'status': '999'
            };
            var url = serviceUrlBase + 'ContentManagement.svc/SetStatus';
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

            APIs.ArchieveRequestContents(id, params, authorizationHeader)
                .success(function (data, status) {
                    if (status == 200) {

                        $scope.showItems = '';
                        $scope.currentPage = 0;
                        $rootScope.slideDownAlertBox = 'slideDown';
                        growl.addSuccessMessage('Archived', config);
                        $scope.Refresh();
                    }
                })
                .error(function (data, status) {
                    $rootScope.slideDownAlertBox = 'slideDown';
                    growl.addErrorMessage('Something went wrong! Please try again later.', config);

                });
        };
        /*end of Deactivate User*/

        $rootScope.slideDownAlertBox = '';
        var config = {};
        /*Activate User*/
        $scope.ActivateContent = function (idValue) {
            var id = {
                'id': idValue,
                'status': '99'
            };
            var url = serviceUrlBase + 'ContentManagement.svc/SetStatus';
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
            APIs.ActivateRequestContents(id, params, authorizationHeader)
                .success(function (data, status) {
                    if (status == 200) {
                        $scope.showItems = '';
                        $rootScope.slideDownAlertBox = 'slideDown';
                        growl.addSuccessMessage(data, config);
                        $scope.currentPage = 0;
                        $scope.Refresh();
                    }
                })
                .error(function (data, status) {
                    $rootScope.slideDownAlertBox = 'slideDown';
                    growl.addErrorMessage('Something went wrong! Please try again later.', config);

                });
        };
        /*end of Activate User*/



        //Sorting
        $scope.contentRequestSort = function (asc, header) {

            if (asc) {
                $scope.ContentRequestList.sort(predicatByAsc(header));

            }
            if (!asc) {
                $scope.ContentRequestList.sort(predicatByDes(header));

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


            return Math.ceil($scope.ContentRequestList.length / $scope.itemsPerPage) - 1;


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