'use strict';

angular.module('chsApp')
    .controller('myacountCtrl', function ($scope, $http, $rootScope, $location, $cookies, APIs, growl) {

        $rootScope.showSideBar = true;
        $rootScope.bodylayout = '';


        $scope.submitted = false;

        $rootScope.slideDownAlertBox = '';
        var config = {};

        $scope.clientManagementsDatas = [];

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

        if (Level == 20 || Level == 30 || Level == 50) {
            $scope.noAccess = true;
        } else {
            $scope.noAccess = false;
        }


        if (consumerSecret != undefined || consumer_key != undefined) {
            if (consumer_key.length == 0 || consumerSecret.length == 0) {

                window.location = '/#/login';
                return;

            }
        } else {
            window.location = '/#/login';
            return;
        }

        $scope.GetUserAccount = function () {
            var url = serviceUrlBase + 'UserManagement.svc/GetUserAccount/' + id;
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

            APIs.GetUserAccount(id, params, authorizationHeader)
                .success(function (data, status) {
                    if (status == 200) {
                        $scope.accountFname = data.firstName;
                        $scope.accountLname = data.lastName;
                        $scope.accountEmail = data.email;
                        document.getElementById.value = data.userName;
                        $scope.accountUsername1 = data.userName;
                        $scope.accountPassword = data.password;
                        $scope.accountAddress = data.address;
                        $scope.accountCity = data.city;
                        $scope.accountState = data.state;
                        $scope.accountPhone = data.phone;
                        $scope.accountStatus = data.status;
                        $scope.accountZip = data.zip;
                    }
                }).error(function (data, status) {
                    $rootScope.slideDownAlertBox = 'slideDown';
                    growl.addErrorMessage('Error while saving client! Plesase try after some time.', config);
                });
        };

        $scope.GetUserAccount();


        $scope.cancelUser = function () {

            if (Level == 20) {
                window.location = '/#/DashboardWriter';
            } else {
                window.location = '/#/Dashboard';
            }

        };




        $scope.UpdateUserAccount = function () {
            $scope.submitted = true;
            var dataToBeSent = {
                'id': id,
                'firstName':  $scope.accountFname,
                'lastName':  $scope.accountLname,
                'email':  $scope.accountEmail,
                'password':  $scope.accountPassword,
                'address': $scope.accountAddress,
                'city':  $scope.accountCity,
                'state':  $scope.accountState,
                'phone':  $scope.accountPhone,
                'zip': $scope.accountZip


            }
            var url = serviceUrlBase + 'UserManagement.svc/UpdateUserAccount';
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
            if ($scope.accountFname && $scope.accountEmail) {
                APIs.UpdateUserAccount(dataToBeSent, params, authorizationHeader)
                    .success(function (data, status) {
                        if (status == 200) {

                            $rootScope.slideDownAlertBox = 'slideDown';
                            growl.addSuccessMessage(data, config);
                        }
                    }).error(function (data, status) {
                        $rootScope.slideDownAlertBox = 'slideDown';
                        growl.addErrorMessage('Error while saving client! Plesase try after some time.', config);
                    });
            };

        }


    });