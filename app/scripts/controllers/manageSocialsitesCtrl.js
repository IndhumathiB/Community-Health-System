'use strict';

angular.module('chsApp')
    .controller('manageSocialsitesCtrl', function ($scope, $http, $rootScope, $location, $cookies, APIs, growl) {

        $rootScope.showSideBar = true;
        $rootScope.slideDownAlertBox = '';
        var config = {};

        $rootScope.bodylayout = '';
        $scope.submitted = false;
        var timestamp = Number(new Date());
        $scope.date = '\/Date(' + timestamp + ')\/';
        $scope.clientSocialManagementsDatas = [];

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
                'user_id': id,
                'user_level': Level
            };

            var url = serviceUrlBase + 'ClientManagement.svc/GetSocialSitesData';
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
            APIs.GetClientSocialManagements(user, params, authorizationHeader)
                .success(function (data, status) {
                    $scope.clientSocialManagementsDatas = data.ManageSocialSite;
                    $scope.clientSelection = data.ClientLookUp;
                }).error(function (data, status) {
                    $rootScope.slideDownAlertBox = 'slideDown';
                    growl.addErrorMessage('Something went wrong! Please try again later.', config);
                });
        };

        $scope.Refresh();
        /*end of Refresh Grid*/


        /*edit client Data*/
        $scope.editSocial = function (clientSocialDatas) {

            $scope.showSaveButton = false;
            $scope.editForm = true;
            $scope.hideAddUserForm = true;
            $scope.clientId = clientSocialDatas.id;

            var user = {
                'id': parseInt(clientSocialDatas.id)
            };

            var url = serviceUrlBase + 'ClientManagement.svc/GetSocialDataById';
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
            APIs.editSocial(user, params, authorizationHeader)
                .success(function (data, status) {

                    if (status == 200) {

                        $scope.siteclientType = data.clientID;
                        $scope.siteName = data.name;
                        $scope.sitelink = data.url;
                        $scope.sitelogin = data.user;
                        $scope.sitepassword = data.password;
                        $scope.sitenotes = data.notes;
                        $scope.date = data.saveDate;
                    };

                }).error(function (data, status) {
                    $rootScope.slideDownAlertBox = 'slideDown';
                    growl.addErrorMessage('Something went wrong! Please try again later.', config);
                });


        };

        $scope.updateClientSocial = function () {
            $scope.submitted = true;
            var url = serviceUrlBase + 'ClientManagement.svc/AddSocial';
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

            var listOdAddUserData = {
                'id': parseInt($scope.clientId),
                'name': $scope.siteName,
                'url': $scope.sitelink,
                'user': $scope.sitelogin,
                'password': $scope.sitepassword,
                'notes': $scope.sitenotes,
                'saveDate': $rootScope.SaveDateFormat,
                'clientID': parseInt($scope.siteclientType)
            };

            if (!$scope.socialsiteForm.$invalid) {
                APIs.updateClientSocial(listOdAddUserData, params, authorizationHeader)
                    .success(function (data, status) {
                        if (status == 200) {
                            $scope.Refresh();
                            $rootScope.slideDownAlertBox = 'slideDown';
                            growl.addSuccessMessage('Updated Successfully!', config);
                            $scope.hideAddUserForm = false;
                            $scope.editForm = false;
                        }
                    }).error(function (data, status) {
                        $rootScope.slideDownAlertBox = 'slideDown';
                        growl.addErrorMessage('Something went wrong! Please try again later.', config);
                    });
            }
        };
        /*end of edit client*/


        /*Delete User*/
        $scope.deleteClient = function (idValue) {
            var id = {
                'id': idValue
            };
            var url = serviceUrlBase + 'ClientManagement.svc/DeleteSocial';
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
                APIs.DeleteClientSocial(id, params, authorizationHeader)
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



        /*Add User*/
        $scope.AddClient = function () {


            $scope.submitted = true;

            var url = serviceUrlBase + 'ClientManagement.svc/AddSocial';
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

            var listOdAddUserData = {
                'name': $scope.siteName,
                'url': $scope.sitelink,
                'user': $scope.sitelogin,
                'password': $scope.sitepassword,
                'notes': $scope.sitenotes,
                'saveDate': $rootScope.SaveDateFormat,
                'clientID': parseInt($scope.siteclientType)
            };
            if (!$scope.socialsiteForm.$invalid) {
                APIs.AddClientSocial(listOdAddUserData, params, authorizationHeader)
                    .success(function (data, status) {
                        if (status == 200) {

                            $rootScope.slideDownAlertBox = 'slideDown';
                            growl.addSuccessMessage('Successfully Added!', config);
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

        $scope.showAddForm = function () {
            $scope.submitted = false;
            $scope.siteclientType = '';
            $scope.siteName = '';
            $scope.sitelink = '';
            $scope.sitelogin = '';
            $scope.sitepassword = '';
            $scope.sitenotes = '';
            $scope.clientId = '';          
            $scope.hideAddUserForm = true;
            $scope.showSaveButton = true;
            $scope.hideNavBar = true;
        };


        $scope.cancelClient = function () {
            $scope.hideAddUserForm = false; 
            $scope.hideNavBar = false;
            $scope.editForm = false;
        };
        /*end of Add User*/





        /*ArchieveClientSocial*/
        $scope.ArchieveClientSocial = function () {
            var user = {
                'isArchived': parseInt($scope.clientId)
            };

            var url = serviceUrlBase + 'ClientManagement.svc/ShowArchievedClients';
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
            APIs.ArchieveClientSocial(user, params, authorizationHeader)
                .success(function (data, status) {
                    $scope.ArchieveClientSocialData = data;
                }).error(function (data, status) {
                    $rootScope.slideDownAlertBox = 'slideDown';
                    growl.addErrorMessage('Something went wrong! Please try again later.', config);
                });
        };
        /*end of ArchieveClientSocial*/


        //Sorting
        $scope.clientSocialManagementSort = function (asc, header) {

            if (asc) {
                $scope.clientSocialManagementsDatas.sort(predicatByAsc(header));

            }
            if (!asc) {
                $scope.clientSocialManagementsDatas.sort(predicatByDes(header));

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


            return Math.ceil($scope.clientSocialManagementsDatas.length / $scope.itemsPerPage) - 1;


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