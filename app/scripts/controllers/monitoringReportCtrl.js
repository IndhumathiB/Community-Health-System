'use strict';

angular.module('chsApp')
    .controller('monitoringReportCtrl', function ($scope, $http, $rootScope, $location, $cookies, $filter, APIs, growl) {


        $rootScope.slideDownAlertBox = '';
        var config = {};

        $rootScope.showSideBar = true;

        $rootScope.bodylayout = '';


        $scope.submitted = false;
        $scope.GetAllCategoriesData = [];

        $rootScope.resetURL = function () {
            $scope.shortedUrl = '';
            $scope.longUrl = '';
        };


        $scope.cancelUser = function () {
            $scope.hideAddUserForm = false;
            $scope.hideNavBar = false;
            $scope.editForm = false;
        };




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

        $scope.ShowAdminForm = false;
        if (Level == 90) {
            $scope.ShowAdminForm = true;
        };
        $scope.GetAllMonitoringReportsData = [];



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


            var url = serviceUrlBase + 'SiteManagement.svc/GetAllMonitoringReports';
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
            APIs.GetAllMonitoringReports(user, params, authorizationHeader)
                .success(function (data, status) {
                    $scope.GetAllMonitoringReportsData = data.Response;
                    $scope.clientSelection12 = data.client;
                    return;
                }).error(function (data, status) {
                    $rootScope.slideDownAlertBox = 'slideDown';
                    growl.addErrorMessage('Something went wrong! Please try again later.', config);
                }); 
        };

        $scope.ShowArchivedReports1 = function () {


            var url = serviceUrlBase + 'SiteManagement.svc/ShowArchiveMonitoringReports';
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
            APIs.ShowArchiveMonitoringReports(params, authorizationHeader)
                .success(function (data, status) {
                    $scope.GetAllMonitoringReportsData = data
                        //$scope.clientSelection=data.Clients;

                }).error(function (data, status) {
                    $rootScope.slideDownAlertBox = 'slideDown';
                    growl.addErrorMessage('Something went wrong! Please try again later.', config);
                });    
        };

        $scope.showItems = false;
        $scope.$watch('showItems', function (newVal, oldVal) {


            if (!newVal || newVal == false) {

                $scope.Refresh();
                return;
            } else {

                $scope.ShowArchivedReports1();
            }
        });

        /*Delete User*/
        $scope.deleteReport = function (idValue) {
            var id = {
                'id': idValue
            };
            var url = serviceUrlBase + 'SiteManagement.svc/DeletePdfReport/' + idValue;
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
                APIs.DeletePdfReport(id, params, authorizationHeader)
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



        $scope.fnpdf = function (val) {

            window.open(pdfUrl + val, '_blank'); 

        }



        /*add*/
        $scope.myfile = '';
        $scope.AddContent = function () {
            $scope.submitted = true;




            var f = {
                'name': $scope.myfile.filename,
                'base64': $scope.myfile.base64,
                'filesize': $scope.myfile.filesize,
                'filetype': $scope.myfile.filetype
            };


            var listOdAddUser123 = {

                'fileInputStream': f.base64,
                'fileName': f.name,
                'hospitalId': $scope.clientSelection.toString(),
                'month': $scope.month,
                'pdf_file': f.name,
                'saveDate': $rootScope.SaveDateFormat,
                'status': parseInt($scope.status)

            };


            var url = serviceUrlBase + 'SiteManagement.svc/AddMonitoringReport';
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
            if (!$scope.monitorReportForm.$invalid) {
                APIs.AddMonitoringReport(listOdAddUser123, params, authorizationHeader)
                    .success(function (data, status) {
                        if (status == 200) {
                            //

                            $rootScope.slideDownAlertBox = 'slideDown';
                            growl.addSuccessMessage(data, config);
                            $scope.hideAddUserForm = false;
                            $scope.showCheck = true;
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




        //getbyid.....
        $scope.GetMonitoringReport1 = function (rssData) {
            $scope.showSaveButton = false;
            $scope.editForm = true;
            $scope.hideAddUserForm = true;
            $scope.clientId = rssData;

            var user = {
                'id': rssData
            };

            var url = GetMonitoringReport + '/' + rssData;
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
            APIs.GetMonitoringReport(user, params, authorizationHeader)
                .success(function (data, status) {

                    if (status == 200) {
                        $scope.clientSelection = Number(data.hospitalId);
                        $scope.month = data.month;
                        $scope.status = data.status.toString();

                        $scope.myfile = {
                            'filename': data.pdf_file
                        };

                    };

                }).error(function (data, status) {
                    $rootScope.slideDownAlertBox = 'slideDown';
                    growl.addErrorMessage('Something went wrong! Please try again later.', config);
                });


        };

        $scope.editclientSubmit = function () {
            $scope.submitted = true;
            var f = {
                'name': $scope.myfile.filename,
                'base64': $scope.myfile.base64,
                'filesize': $scope.myfile.filesize,
                'filetype': $scope.myfile.filetype
            };



            $scope.submitted = true;
            var url = UpdateMonitoringReport;
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
                'fileInputStream': f.base64,
                'fileName': f.name,
                'hospitalId': $scope.clientSelection.toString(),
                'month': $scope.month,
                'pdf_file': f.name,
                'saveDate': $rootScope.SaveDateFormat,
                'status': parseInt($scope.status)

            };
            if (!$scope.monitorReportForm.$invalid) {
                APIs.UpdateMonitoringReport(listOdAddUserUpdate, params, authorizationHeader)
                    .success(function (data, status) {
                        if (status == 200) {
                            $scope.editForm = false;
                            $rootScope.slideDownAlertBox = 'slideDown';
                            growl.addSuccessMessage(data, config);
                            $scope.hideAddUserForm = false;
                            $scope.showCheck = true;
                            $scope.Refresh();
                        }
                    }).error(function (data, status) {
                        $rootScope.slideDownAlertBox = 'slideDown';
                        growl.addErrorMessage('Something went wrong! Please try again later.', config);
                    });
            }
        };



        $scope.cancelForm = function () {
            $scope.showCheck = true;
        };


        /*Logout fun*/
        $rootScope.logout = function () {
            $cookies.remove('levelName');
            $cookies.remove('consumerSecret');
            $cookies.remove('userName');
            $cookies.remove('Id');
            $cookies.remove('Level');
            $cookies.remove('consumerKey');
            $cookies.remove('role_authorization');
            $rootScope.showSideBar = false;
            $cookies.remove('role_authorization');

            window.location = '/';
            window.localStorage['consumer_key'] = '';
            window.localStorage['consumerSecret'] = '';
            window.localStorage['id'] = '';
            window.localStorage['Level'] = '';
        };
        /*end of Logout fun*/




        $scope.showCheck = true;


        $scope.showAddForm = function () {


            $scope.showCheck = false;

            $scope.submitted = false;
            $scope.clientSelection = '';

            $scope.month = '';
            $scope.savedate = '';
            $scope.status = '';

            $scope.hideAddUserForm = true;
            $scope.showSaveButton = true;
            $scope.hideNavBar = true;

        }



        $scope.UpdateMonitoringStatus9 = function (idValue) {
            var id = {
                'id': idValue,
                      
                'status': 9
            };
            var url = UpdateMonitoringStatus;
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
            APIs.UpdateMonitoringStatus(id, params, authorizationHeader)
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


        $scope.UpdateMonitoringStatus1 = function (idValue) {
            var id = {
                'id': idValue,
                      
                'status': 1
            };
            var url = UpdateMonitoringStatus;
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
            APIs.UpdateMonitoringStatus(id, params, authorizationHeader)
                .success(function (data, status) {
                    if (status == 200) {
                        $rootScope.slideDownAlertBox = 'slideDown';
                        growl.addSuccessMessage(data, config);
                        $scope.Refresh();
                    }
                })
                .error(function (data, status) {

                });
        };


        $scope.UpdateMonitoringStatus0 = function (idValue) {
            var id = {
                'id': idValue,
                      
                'status': 0
            };
            var url = UpdateMonitoringStatus;
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
            APIs.UpdateMonitoringStatus(id, params, authorizationHeader)
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






        //Sorting
        $scope.rssFeedSort = function (asc, header) {

            if (asc) {
                $scope.GetAllMonitoringReportsData.sort(predicatByAsc(header));

            }
            if (!asc) {
                $scope.GetAllMonitoringReportsData.sort(predicatByDes(header));

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


            return Math.ceil($scope.GetAllMonitoringReportsData.length / $scope.itemsPerPage) - 1;


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