'use strict';

angular.module('chsApp')
    .controller('sitePdfMetricesCtrl', function ($scope, $http, $rootScope, $location, $cookies, $filter, APIs, growl) {



        $rootScope.slideDownAlertBox = '';
        var config = {};


        $rootScope.showSideBar = true;

        $rootScope.bodylayout = '';

        $scope.submitted = false;
        $scope.GetAllPDFMetricReports1Data = [];



        $scope.cancelUser = function () {
            $scope.hideAddUserForm = false;
            $scope.hideNavBar = false;
            $scope.editForm = false;
        };


        $scope.fnpdf = function (val) {

            window.open(pdfUrl + val, '_blank'); 

        }
        $scope.$watch('showItems', function (newVal, oldVal) {


            if (!newVal) {
                $scope.Refresh();
            } else if (newVal == true) {
                $scope.ShowArchivedReports1();
            } else {
                $scope.Refresh();
            }

        });



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


            var url = serviceUrlBase + 'SiteManagement.svc/GetAllPDFMetricReports';
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
            APIs.GetAllPDFMetricReports1(user, params, authorizationHeader)
                .success(function (data, status) {
                    $scope.GetAllPDFMetricReports1Data = data.MetricPDFReport;
                    $scope.clientSelection12 = data.Clients;
                }).error(function (data, status) {
                    $rootScope.slideDownAlertBox = 'slideDown';
                    growl.addErrorMessage('Something went wrong! Please try again later.', config);
                }); 
        };

        $scope.ShowArchivedReports1 = function () {
            var user = {
                'user_id': id,
                'user_level': Level
            };



            var url = serviceUrlBase + 'SiteManagement.svc/ShowArchivedReports';
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
            APIs.ShowArchivedReports(user, params, authorizationHeader)
                .success(function (data, status) {
                    $scope.GetAllPDFMetricReports1Data = data;

                }).error(function (data, status) {
                    $rootScope.slideDownAlertBox = 'slideDown';
                    growl.addErrorMessage('Something went wrong! Please try again later.', config);
                });    
        };



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



        $scope.myfile = '';

        /*add*/
        $scope.AddContent = function () {
            $scope.submitted = true;


            var f = {
                'name': $scope.myfile.filename,
                'base64': $scope.myfile.base64,
                'filesize': $scope.myfile.filesize,
                'filetype': $scope.myfile.filetype
            }


            var timestamp1 = Number(new Date());
            $scope.savedate = '\/Date(' + timestamp1 + ')\/';


            var listOdAddUser123 = {

                'fileInputStream': f.base64,
                'fileName': f.name,
                'hospitalId': $scope.clientSelection.toString(),
                'hospitalName': $scope.clientSelection.ClientName,
                'month': $scope.month,
                'pdf_file': f.name,
                'saveDate': $rootScope.SaveDateFormat,
                'status': parseInt($scope.status)

            }


            var url = serviceUrlBase + 'SiteManagement.svc/AddPdfMetricReport';
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
            if (!$scope.pdfMetricForm.$invalid) {
                APIs.AddPdfMetricReport(listOdAddUser123, params, authorizationHeader)
                    .success(function (data, status) {
                        if (status == 200) {
                            //
                            $scope.showCheck = true;
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



        //getbyid.....
        $scope.GetPdfReportById1 = function (rssData) {
            $scope.showSaveButton = false;
            $scope.editForm = true;
            $scope.hideAddUserForm = true;


            $scope.clientId = rssData;

            var user = {
                'id': rssData
            };

            var url = GetPdfReportById + '/' + rssData;
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
            APIs.GetPdfReportById(user, params, authorizationHeader)
                .success(function (data, status) {

                    if (status == 200) {
                        $scope.clientSelection = data.hospitalId;
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
            $scope.submitted = 'true';



            var f = {
                'name': $scope.myfile.filename,
                'base64': $scope.myfile.base64,
                'filesize': $scope.myfile.filesize,
                'filetype': $scope.myfile.filetype
            }


            var timestamp1 = Number(new Date());
            $scope.savedate = '\/Date(' + timestamp1 + ')\/';


            $scope.submitted = true;
            var url = UpdatePdfMetricReport;
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
                'hospitalName': $scope.clientSelection.ClientName,
                'month': $scope.month,
                'pdf_file': f.name,
                'saveDate': $rootScope.SaveDateFormat,
                'status': parseInt($scope.status)

            }
            if (!$scope.pdfMetricForm.$invalid) {
                APIs.UpdatePdfMetricReport(listOdAddUserUpdate, params, authorizationHeader)
                    .success(function (data, status) {
                        if (status == 200) {
                            $scope.showCheck = true;
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



        $scope.showCheck = true;


        $scope.showAddForm = function () {

            $scope.submitted = false;
            //alert();

            $scope.showCheck = false;

            $('tr.form-input').addClass('animated slideInLeft').removeClass('hide');
            $scope.clientSelection = '';

            $scope.month = '';
            $scope.savedate = '';
            $scope.status = '0';
            $scope.myfile = '';

            $scope.hideAddUserForm = true;
            $scope.showSaveButton = true;
            $scope.hideNavBar = true;

        };

        /*Deactivate User*/
        $scope.ArchivePdfReport1 = function (idValue) {
            var id = {
                'id': idValue
            };
            var url = serviceUrlBase + 'SiteManagement.svc/ArchivePdfReport' + '/' + idValue;
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

            APIs.ArchivePdfReport(id, params, authorizationHeader)
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




        //Sorting
        $scope.userManagementSort = function (asc, header) {

            if (asc) {
                $scope.GetAllPDFMetricReports1Data.sort(predicatByAsc(header));

            }
            if (!asc) {
                $scope.GetAllPDFMetricReports1Data.sort(predicatByDes(header));

            }
        };

        function predicatByAsc(prop) {
            return function (a, b) {
                if (a[prop] > b[prop]) {
                    return 1;
                } else if (a[prop] < b[prop]) {
                    return -1;
                }
                return 0;
            }
        }

        function predicatByDes(prop) {
            return function (a, b) {
                if (a[prop] < b[prop]) {
                    return 1;
                } else if (a[prop] > b[prop]) {
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

            if ($scope.GetAllPDFMetricReports1Data) {
                return Math.ceil($scope.GetAllPDFMetricReports1Data.length / $scope.itemsPerPage) - 1;
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