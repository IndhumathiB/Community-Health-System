'use strict';

angular.module('chsApp')
    .controller('userManageCtrl', function ($scope, $http, $rootScope, $location, $cookies, $filter, APIs, growl) {

        $rootScope.bodylayout = '';
        $rootScope.showSideBar = true;
        $scope.submitted = false;
        $scope.UserManagementsDatas = [];
        $scope.firstName = ' ';

        $rootScope.user_name = window.localStorage['user_name'];



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
        var consumer_key = window.localStorage['consumer_key'];
        var consumerSecret = window.localStorage['consumerSecret'];
        var id = window.localStorage['id'];
        var Level = window.localStorage['Level'];


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
        if (Level == 90 || Level == 50) {
            $scope.ShowAdminForm = true;

            if (Level == 50) {
                $scope.removeAdd = true;
            };
        };

        $scope.removeAdd = false;
        /*end of Global Var*/




        /*Refresh Grid*/
        $scope.Refresh = function () {
            $scope.collapsed = false;
            var user = {
                'user_id': id,
                'user_level': Level
            };

            var url = serviceUrlBase + 'UserManagement.svc/GetUserManagements';
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
            APIs.GetUserManagements(user, params, authorizationHeader)
                .success(function (data, status) {
                    $scope.UserManagementsDatas = data.Users;

                    $rootScope.UserManagementsDatas = data.Users;
                    $scope.userSelection = data.LookUpDetails;
                    $scope.ClientLookUp = data.ClientLookUp;
                    $scope.SupervisorLookUp = data.SupervisorLookUp;

                }).error(function (data, status) {
                    $rootScope.slideDownAlertBox = 'slideDown';
                    growl.addErrorMessage('Something went wrong! Please try again later.', config);
                });
        };
        $scope.Refresh();


        $scope.shri = function (val) {

            $scope.currentPage = 0;
            $scope.returnedData = $.grep($scope.UserManagementsDatas, function (element, index) {
                return element.UserLevel == val;
            });
        };


        $scope.Reset = function () {
            $scope.selectUserType = undefined;

            $scope.Refresh();
            $scope.collapsed = true;
            $scope.currentPage = 0
            $scope.returnedData = undefined;
        };

        var selectedUser;
        $scope.userTypeFilter = function (UserId) {

            if (UserId) {
                var usertypeValue = UserId;
                var selectedUser = _.where($rootScope.UserManagementsDatas, {
                    UserLevel: usertypeValue
                });
                $scope.UserManagementsDatas = selectedUser;
            } else {
                $scope.UserManagementsDatas = $rootScope.UserManagementsDatas;
            }
        };



        /*end of Refresh Grid*/



        /*Add User*/
        $scope.AddUser = function () {

            $scope.submitted = true;

            var emailId = document.getElementById('email').value;
            var url1 = serviceUrlBase + 'UserManagement.svc/AddUser';
            var method = 'POST';
            var oAuthDatas = authSignature(consumer_key, consumerSecret, url1, method);
            var params = {
                'oauth_consumer_key': oAuthDatas.msgParameters[0][1],
                'oauth_signature_method': oAuthDatas.msgParameters[1][1],
                'oauth_version': oAuthDatas.msgParameters[2][1],
                'oauth_timestamp': oAuthDatas.msgParameters[3][1],
                'oauth_nonce': oAuthDatas.msgParameters[4][1],
                'oauth_signature': oAuthDatas.msgParameters[5][1]
            };
            var authorizationHeader = OAuth.getAuthorizationHeader(oAuthDatas.relam, oAuthDatas.msgParameters);


            var listOdAddUser = {
                'level': parseInt($scope.userType),
                'firstName': $scope.firstName,
                'lastName': $scope.lname,
                'email': emailId,
                'userName': $scope.userName,
                'password': $scope.password,
                'address': $scope.address,
                'city': $scope.city,
                'state': $scope.state,
                'zip': $scope.zip,
                'phone': $scope.phone,
                'notes': $scope.notes,
                'status': parseInt($scope.status)
            }
            if ($scope.userType == '50' || $scope.userType == '30') {
                listOdAddUser.hospital = $scope.hospitalValue.toString() || '';
            } else {
                listOdAddUser.hospital = null;
            }


            if ($scope.emailId) {
                var patt = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
                var res = patt.test($scope.emailId);
                if (res == true && $scope.userName && $scope.firstName && $scope.password && $scope.status) {
                    APIs.AddUser(listOdAddUser, params, authorizationHeader)
                        .success(function (data, status) {

                            if (status == 200) {
                                $scope.hideNavBar = false;
                                $scope.Refresh();
                                $rootScope.slideDownAlertBox = 'slideDown';
                                growl.addSuccessMessage(data, config);
                                $scope.hideAddUserForm = false;
                            }
                        }).error(function (data, status) {
                            $rootScope.slideDownAlertBox = 'slideDown';
                            growl.addErrorMessage('Something went wrong! Please try again later.', config);

                        });
                }

            }
        };


        $scope.showAddForm = function () {
            $scope.disableBtn = false;
            $scope.submitted = false;
            $scope.firstName = ''
            $scope.lname = ''
            $scope.emailId = ''
            $scope.userName = ''
            $scope.password = ''
            $scope.address = ''
            $scope.city = ''
            $scope.state = ''
            $scope.zip = ''
            $scope.phone = ''
            $scope.notes = ''
            $scope.hideAddUserForm = true;
            $scope.showSaveButton = true;
            $scope.hideNavBar = true;
            $scope.userType = '';
            $scope.status = "0";

        };





        $scope.cancelUser = function () {
            $scope.hideAddUserForm = false;
            $scope.hideNavBar = false;
            $scope.editForm = false;
        };
        /*end of Add User*/

        $scope.checkemailfunction = function () {
            var emailId = document.getElementById('email').value;
            var url = serviceUrlBase + 'UserManagement.svc/IsExist/' + emailId;
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

            var emailId = document.getElementById('email').value;
            var Emailid = {
                'email': emailId
            }

            if ($scope.emailId) {
                var patt = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
                var res = patt.test($scope.emailId);
                if (res == true) {

                    APIs.IsExist(Emailid, params, authorizationHeader, emailId)
                        .success(function (data, status) {
                            if (status == 200) {
                                $rootScope.slideDownAlertBox = 'slideDown';
                                growl.addSuccessMessage(data, config);
                                $scope.shwmsg = false;
                                $scope.shwmsg500 = false;
                            }
                        }).error(function (data, status) {
                            $rootScope.slideDownAlertBox = 'slideDown';
                            growl.addErrorMessage(data, config);
                            if (status == 400) {
                                $scope.shwmsg = true;
                                $scope.shwmsgName = data;
                            }    
                            if (status == 500) {
                                $scope.shwmsg500 = true;
                                $scope.shwmsgName500 = data;
                            }                  
                        });
                } else {

                    $rootScope.slideDownAlertBox = 'slideDown';
                    growl.addErrorMessage('Invalid email Id!', config);

                }
            }



        };

        $scope.shwmsg = false;
        $scope.shwmsg500 = false;




        /*edit User*/
        $scope.disableBtn = false;
        $scope.editUser = function (updateUserData) {
            $scope.showSaveButton = false;
            $scope.editForm = true;
            $scope.hideAddUserForm = true;
            $scope.submitted = false;
            $scope.id = updateUserData.id;

            var url = serviceUrlBase + 'UserManagement.svc/GetDataByMemberId';
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
            var listOdAddUser1 = {
                'id': parseInt($scope.id)
            }
            APIs.editUser(listOdAddUser1, params, authorizationHeader)
                .success(function (data, status) {

                    if (status == 200) {
                        $scope.userType = data.level;

                        if ($scope.userType) {

                            $scope.disableBtn = true;
                        };
                        $scope.firstName = data.firstName;
                        $scope.lname = data.lastName;
                        $scope.emailId = data.email;
                        $scope.userName = data.userName;
                        $scope.password = data.password;
                        $scope.hospitalValue = Number(data.hospital);
                        if (data.level == 50) {
                            $scope.showSingleSelection = false;

                            var val1 = data.hospital;
                            var data1 = val1.split(',').map(function (val1) {
                                return Number(val1);
                            });;
                            $scope.hospitalValue = data1;
                        };
                        $scope.address = data.address;
                        $scope.city = data.city;
                        $scope.state = data.state;
                        $scope.phone = data.phone;
                        $scope.notes = data.notes;
                        console.log(data.status);
                        $scope.status = data.status.toString();
                        $scope.zip = data.zip;

                    }


                }).error(function (data, status) {
                    $rootScope.slideDownAlertBox = 'slideDown';
                    growl.addErrorMessage('Something went wrong! Please try again later.', config);
                });
        };

        $scope.editUserSubmit = function () {
            $scope.submitted = true;


            var url = serviceUrlBase + 'UserManagement.svc/AddUser';
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
            var listOdAddUser = {
                'id': parseInt($scope.id),
                'level': parseInt($scope.userType),
                'firstName': $scope.firstName,
                'lastName': $scope.lname,
                'email': $scope.emailId,
                'userName': $scope.userName,
                'password': $scope.password,
                'address': $scope.address,
                'city': $scope.city,
                'state': $scope.state,
                'zip': $scope.zip,
                'phone': $scope.phone,
                'notes': $scope.notes,
                'status': parseInt($scope.status)
            }

            if ($scope.userType == '50' || $scope.userType == '30') {
                listOdAddUser.hospital = $scope.hospitalValue.toString();
            } else {
                listOdAddUser.hospital = null;
            }
            if ($scope.emailId) {
                var patt = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
                var res = patt.test($scope.emailId);
                if (res == true && $scope.userName && $scope.firstName && $scope.status && $scope.password) {
                    APIs.editUserSubmit(listOdAddUser, params, authorizationHeader)
                        .success(function (data, status) {
                            $scope.editForm = false;
                            if (status == 200) {
                                $scope.Refresh();
                                $rootScope.slideDownAlertBox = 'slideDown';
                                growl.addSuccessMessage(data, config);
                                $scope.hideAddUserForm = false;
                                $scope.editForm = false;
                            }
                        }).error(function (data, status) {
                            $rootScope.slideDownAlertBox = 'slideDown';
                            growl.addErrorMessage('Something went wrong! Please try again later.', config);
                            $scope.editForm = false;
                        });
                }
            }
        };
        /*end of edit User*/



        $scope.$watch('userType', function (newVal, oldVal) {
            if (!newVal) {
                $scope.showHospitalField = false;
            } else if (newVal == 30 || newVal == 50) {
                $scope.showHospitalField = true;
                if (newVal == 30) {
                    $scope.showSingleSelection = true;
                } else {
                    $scope.showSingleSelection = false;
                }
            } else {
                $scope.showHospitalField = false;
            }
        });






        /*Delete User*/
        $scope.deleteUser = function (idValue) {
            var id = {
                'id': idValue
            };
            var url = serviceUrlBase + 'UserManagement.svc/DeleteUser';
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
                APIs.DeleteUser(id, params, authorizationHeader)
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


        /*Deactivate User*/
        $scope.deActivateUser = function (idValue) {
            var id = {
                'user_id': idValue,
                'status': 1
            };
            var url = serviceUrlBase + 'UserManagement.svc/SetStatus';
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

            APIs.deActivateUser(id, params, authorizationHeader)
                .success(function (data, status) {
                    if (status == 200) {
                        $rootScope.slideDownAlertBox = 'slideDown';
                        growl.addSuccessMessage(data, config);
                        $scope.Refresh();
                    }
                })
                .error(function (data, status) {
                    $rootScope.slideDownAlertBox = 'slideDown';
                    growl.addErrorMessage('Something went wrong! Please try again later.', config);
                });
        };
        /*end of Deactivate User*/


        /*Activate User*/
        $scope.ActivateUser = function (idValue) {
            var id = {
                'user_id': idValue,
                'status': 0
            };
            var url = serviceUrlBase + 'UserManagement.svc/SetStatus';
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
            APIs.ActivateUser(id, params, authorizationHeader)
                .success(function (data, status) {
                    if (status == 200) {
                        $rootScope.slideDownAlertBox = 'slideDown';
                        growl.addSuccessMessage(data, config);
                        $scope.Refresh();
                    }
                })
                .error(function (data, status) {
                    $rootScope.slideDownAlertBox = 'slideDown';
                    growl.addErrorMessage('Something went wrong! Please try again later.', config);
                });
        };
        /*end of Activate User*/


        $rootScope.slideDownAlertBox = '';
        var config = {};

        //Sorting
        $scope.userManagementSort = function (asc, header) {

            if (asc) {
                $scope.UserManagementsDatas.sort(predicatByAsc(header));

            }
            if (!asc) {
                $scope.UserManagementsDatas.sort(predicatByDes(header));

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



            if ($scope.returnedData != undefined) {
                return Math.ceil($scope.returnedData.length / $scope.itemsPerPage) - 1;
            } else {
                return Math.ceil($scope.UserManagementsDatas.length / $scope.itemsPerPage) - 1;
            }


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