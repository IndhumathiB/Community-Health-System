'use strict';

angular.module('chsApp')
    .controller('manageClientCtrl', function ($scope, $http, $rootScope, $location, $cookies, APIs, growl) {

        $rootScope.showSideBar = true;

        $rootScope.bodylayout = '';


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

        $rootScope.slideDownAlertBox = '';
        var config = {};
        $scope.submitted = false;


        $scope.showArchievedClients1 = function () {
            var user = {

                'user_level': Level,
                'user_id': id,
                'isarchive': 1
            };

            var url = showArchievedClients;
            var method = 'POST';
            var oAuthDatas = authSignature(consumer_key, consumerSecret, url, method);
            var params = {
                'oauth_consumer_key': oAuthDatas.msgParameters[0][1],
                'oauth_signature_method': oAuthDatas.msgParameters[1][1],
                'oauth_version': oAuthDatas.msgParameters[2][1],
                'oauth_timestamp': oAuthDatas.msgParameters[3][1],
                'oauth_nonce': oAuthDatas.msgParameters[4][1],
                'oauth_signature': oAuthDatas.msgParameters[5][1]
            }
            var authorizationHeader = OAuth.getAuthorizationHeader(oAuthDatas.relam, oAuthDatas.msgParameters);
            APIs.showArchievedClients(user, params, authorizationHeader)
                .success(function (data, status) {
                    $scope.clientManagementsDatas = data;
                }).error(function (data, status) {
                    $rootScope.slideDownAlertBox = 'slideDown';
                    growl.addErrorMessage('Something went wrong! Please try again later.', config);
                });
        };


        $scope.clientManagementsDatas = [];

        /*Global Var*/



        $scope.disableButton = false;
        $scope.ShowAdminForm = false;
        if (Level == 30 || Level == 90 || Level == 50) {
            $scope.ShowAdminForm = true;

            if (Level == 30) {
                $scope.disableButton = true;
            };
        };
        /*end of Global Var*/

        /*Refresh Grid*/
        $scope.Refresh = function () {
            var user = {
                'user_id': id,
                'user_level': Level
            };

            var url = serviceUrlBase + 'ClientManagement.svc/GetDataByClients';
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
            APIs.GetClientManagements(user, params, authorizationHeader)
                .success(function (data, status) {
                    $scope.clientManagementsDatas = data.ManageClient;
                    $scope.clientSelection = data.ClientLookUp;
                }).error(function (data, status) {
                    $rootScope.slideDownAlertBox = 'slideDown';
                    growl.addErrorMessage('Something went wrong! Please try again later.', config);
                });    
        };


        /*end of Refresh Grid*/
        $scope.$watch('showItems', function (newVal, oldVal) {
            if (!newVal || newVal == false) {
                $scope.Refresh();
            } else {
                $scope.showArchievedClients1();
            }

        });

        /*Delete User*/
        $scope.deleteClient = function (idValue) {
            var id = {
                'id': idValue              
            };
            var url = serviceUrlBase + 'ClientManagement.svc/DeleteClient';
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
                APIs.DeleteClient(id, params, authorizationHeader)
                    .success(function (data, status) {
                        if (status == 200) {
                            $scope.Refresh();
                            $rootScope.slideDownAlertBox = 'slideDown';
                            growl.addSuccessMessage(data, config);
                        }
                    }).error(function (data, status) {
                        $rootScope.slideDownAlertBox = 'slideDown';
                        growl.addErrorMessage('Something went wrong! Please try again later.', config);
                    });
            }
        };
        /*end of Delete User*/








        /*ArchieveClient*/

        $scope.ArchieveClient = function (idValue) {
            var user = {
                'isArchived': 1,
                'id': idValue
            };

            var url = ArchieveClient;
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
            APIs.ArchieveClient(user, params, authorizationHeader)
                .success(function (data, status) {
                    if (status == 200) {
                        $scope.currentPage = 0;
                        $scope.showItems = false;
                        $rootScope.slideDownAlertBox = 'slideDown';
                        growl.addSuccessMessage(data, config);
                        $scope.Refresh();
                    }
                }).error(function (data, status) {});    
        };
        /*end of ArchieveClient*/

        $scope.RestoreClient = function (idValue) {
            var user = {
                'isArchived': 0,
                'id': idValue
            };

            var url = ArchieveClient;
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
            APIs.ArchieveClient(user, params, authorizationHeader)
                .success(function (data, status) {
                    if (status == 200) {
                        $scope.currentPage = 0;
                        $scope.showItems = false;
                        $rootScope.slideDownAlertBox = 'slideDown';
                        growl.addSuccessMessage(data, config);
                        $scope.Refresh();
                    }
                }).error(function (data, status) {});    
        };


        /*edit client Data*/
        $scope.editClient = function (clientDatas) {

            $scope.showSaveButton = false;
            $scope.editForm = true;
            $scope.hideAddUserForm = true;

            $scope.clientId = clientDatas.id;

            var user = {
                'id': parseInt(clientDatas.id)
            };

            var url = serviceUrlBase + 'ClientManagement.svc/GetClientDataById';
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
            APIs.editClient(user, params, authorizationHeader)
                .success(function (data, status) {
                    if (status == 200) {
                        $scope.clientName = data.hospitalName;
                        $scope.contactName = data.contact_name;;
                        $scope.email = data.contact_email;
                        $scope.hospital = data.hospitalName;
                        $scope.add = data.address;
                        $scope.city = data.city;
                        $scope.state = data.state;
                        $scope.phone = data.contact_phone;
                        $scope.notes = data.notes;
                        $scope.status = data.status.toString();
                        $scope.zip = data.zip;

                    };
                }).error(function (data, status) {
                    $rootScope.slideDownAlertBox = 'slideDown';
                    growl.addErrorMessage('Something went wrong! Please try again later.', config);
                });  


        };





        $scope.editclientSubmit = function () {
            $scope.submitted = true;
            var url = serviceUrlBase + 'ClientManagement.svc/AddClient';
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
            var listOdAddUserUpdate = {
                'id': parseInt($scope.clientId),
                'hospitalName':   $scope.clientName,
                'contact_name': $scope.contactName,
                'contact_email': $scope.email,
                'address': $scope.add,
                'city': $scope.city,
                'state': $scope.state,
                'zip': $scope.zip,
                'contact_phone': $scope.phone,
                'notes': $scope.notes,
                'status': parseInt($scope.status)


            };
            if (!$scope.clientForm.$invalid) {
                APIs.editclientSubmit(listOdAddUserUpdate, params, authorizationHeader)
                    .success(function (data, status) {
                        if (status == 200) {

                            $rootScope.slideDownAlertBox = 'slideDown';
                            growl.addSuccessMessage('Client Information Updated', config);
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


        /*Add User*/
        $scope.AddClient = function () {
            $scope.submitted = true;
            var listOdAddUser123 = {

                'contact_name': $scope.contactName,
                'contact_email': $scope.email,
                'hospitalName': $scope.clientName,
                'address': $scope.add,
                'city': $scope.city,
                'state': $scope.state,
                'zip': $scope.zip,
                'contact_phone': $scope.phone,
                'notes': $scope.notes,
                'status': parseInt($scope.status)

            };


            var url = serviceUrlBase + 'ClientManagement.svc/AddClient';
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
            if (!$scope.clientForm.$invalid) {
                APIs.AddClient(listOdAddUser123, params, authorizationHeader)
                    .success(function (data, status) {
                        if (status == 200) {
                            //
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
            $scope.submitted = false;
            $scope.contactName = '';
            $scope.email = '';
            $scope.clientName = '';
            $scope.add = '';
            $scope.city = '';
            $scope.state = '';
            $scope.zip = '';
            $scope.phone = '';        
            $scope.notes = '';
            $scope.status = '0';
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



        /*Deactivate User*/
        $scope.deActivateClient = function (idValue) {
            var id = {
                'user_id': idValue,
                            
                'status': 1
            };
            var url = serviceUrlBase + 'ClientManagement.svc/SetStatus';
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

            APIs.deActivateClient(id, params, authorizationHeader)
                .success(function (data, status) {
                    if (status == 200) {
                        $scope.currentPage = 0;
                        $scope.showItems = false;
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
        $scope.ActivateClient = function (idValue) {
            var user = {
                'user_id': idValue,
                            
                'status': 0
            };

            var url = ActivateClient;
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
            APIs.ActivateClient(user, params, authorizationHeader)
                .success(function (data, status) {
                    if (status == 200) {
                        $scope.currentPage = 0;
                        $scope.showItems = false;
                        $rootScope.slideDownAlertBox = 'slideDown';
                        growl.addSuccessMessage(data, config);
                        $scope.Refresh();
                    }
                }).error(function (data, status) {});
        };
        /*end of Activate User*/

        //Sorting
        $scope.clientManagementSort = function (asc, header) {

            if (asc) {
                $scope.clientManagementsDatas.sort(predicatByAsc(header));

            }
            if (!asc) {
                $scope.clientManagementsDatas.sort(predicatByDes(header));

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


            return Math.ceil($scope.clientManagementsDatas.length / $scope.itemsPerPage) - 1;


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