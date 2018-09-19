'use strict';

angular.module('chsApp')
    .controller('writerInvoiceTaskCtrl', function ($scope, $http, $rootScope, $location, $cookies, $filter, APIs, growl) {

        $rootScope.bodylayout = '';
        $rootScope.showSideBar = true;
        $scope.submitted = false;
        $scope.TaskLists = [];



        $scope.Reset = function () {
            $scope.selectWriter = '';
            $scope.Refresh();
        };

        $scope.writerInvoiceDatas = [];


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
        if (Level == 90) {
            $scope.ShowAdminForm = true;
        };
        /*end of Global Var*/


        /*Refresh Grid*/
        $scope.Refresh = function () {
            var user = {
                'user_id': id,
                'user_level': Level
            };

            var url = GetAllWriterInvoices;
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
            APIs.GetAllWriterInvoices(user, params, authorizationHeader)
                .success(function (data, status) {


                    $scope.writerInvoiceDatas = data.ListOfInvoices;
                    $scope.writersLookup = data.ListOfWriters;

                }).error(function (data, status) {
                    $rootScope.slideDownAlertBox = 'slideDown';
                    growl.addErrorMessage('Something went wrong! Please try again later.', config);
                });
        };
        $scope.Refresh();

        /*end of Refresh Grid*/

        $scope.PrintPreview = function (writerId) {
            var user = {
                'id': writerId.toString()

            };

            var url = PrintPreview + '/' + writerId;
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
            APIs.PrintPreview(user, params, authorizationHeader, writerId)
                .success(function (data, status) {

                    //Show Pdf preview on the new window
                    window.open(pdfUrl + data);


                }).error(function (data, status) {
                    $rootScope.slideDownAlertBox = 'slideDown';
                    growl.addErrorMessage('Something went wrong! Please try again later.', config);
                });
        };


        $scope.GetInvoicesByWriter = function (writerId) {
            if (writerId) {
                var user = {
                    'id': writerId.toString()

                };

                var url = GetInvoicesByWriter + '/' + writerId;
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
                APIs.GetInvoicesByWriter(user, params, authorizationHeader, writerId)
                    .success(function (data, status) {

                        $scope.writerInvoiceDatas = data.ListOfInvoices;




                    }).error(function (data, status) {
                        $rootScope.slideDownAlertBox = 'slideDown';
                        growl.addErrorMessage('Something went wrong! Please try again later.', config);
                    });
            } else if (!writerId) {
                $scope.Refresh();

            }
        };



        $scope.SetPaidStatus = function (writerId) {
            var user = {
                'id': parseInt(writerId),
                'status': 1
            };

            var url = SetPaidStatus;
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
            APIs.SetPaidStatus(user, params, authorizationHeader, writerId)
                .success(function (data, status) {

                    growl.addSuccessMessage(data, config);
                    $scope.Refresh();

                }).error(function (data, status) {
                    $rootScope.slideDownAlertBox = 'slideDown';
                    growl.addErrorMessage('Something went wrong! Please try again later.', config);
                });
        };

        $scope.SetUnpaidStatus = function (writerId) {
            var user = {
                'id': parseInt(writerId),
                'status': 0
            };

            var url = SetPaidStatus;
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
            APIs.SetPaidStatus(user, params, authorizationHeader, writerId)
                .success(function (data, status) {
                    $rootScope.slideDownAlertBox = 'slideDown';
                    growl.addSuccessMessage(data, config);
                    $scope.Refresh();

                }).error(function (data, status) {
                    $rootScope.slideDownAlertBox = 'slideDown';
                    growl.addErrorMessage('Something went wrong! Please try again later.', config);
                });
        };



        $rootScope.slideDownAlertBox = '';
        var config = {};




        //Sorting
        $scope.writerInvoiceSort = function (asc, header) {

            if (asc) {
                $scope.writerInvoiceDatas.sort(predicatByAsc(header));

            }
            if (!asc) {
                $scope.writerInvoiceDatas.sort(predicatByDes(header));

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

            if ($scope.writerInvoiceDatas) {
                return Math.ceil($scope.writerInvoiceDatas.length / $scope.itemsPerPage) - 1;
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