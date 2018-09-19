'use strict';

angular.module('chsApp')
    .controller('PostContentReportCtrl', function ($scope, $http, $filter, $rootScope, $location, $cookies, APIs, growl) {

        $rootScope.showSideBar = true;

        $rootScope.resetURL = function () {
            $scope.shortedUrl = '';
            $scope.longUrl = '';
        }

        $rootScope.bodylayout = '';

        $scope.postclientNames = [];

        $scope.showTempTable = false;

        $scope.saveAsPdf = function () {
            $scope.showTempTable = true;
            var pdf = new jsPDF('p', 'pt', 'letter'),
                specialElementHandlers = {
                    '#editor': function (element, renderer) {
                        return true;
                    }
                };
            pdf.fromHTML(
                $('#customers').get(0) // HTML element
                , 15 // x coord
                , 0.5 // y coord
                , {
                    'width': 7.5 // was 7.5, max width of content on PDF
                        ,
                    elementHandlers: specialElementHandlers
                }
            );
            pdf.save('File.pdf');

            $scope.showTempTable = false;
        }

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



        $scope.Refresh = function () {
            var url = GetAllClientPosts;
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
            APIs.GetAllClientPosts(params, authorizationHeader)
                .success(function (data, status) {
                    $scope.ClientPostsDatas = data.PostingReport;
                    $scope.postclientNames = data.Clients;

                }).error(function (data, status) {
                    $rootScope.slideDownAlertBox = 'slideDown';
                    growl.addErrorMessage('Something went wrong! Please try again later.', config);
                });
        };



        $scope.Refresh();

        $scope.postreportstartDate = '';
        $scope.postreportendDate = '';

        var datevalue = new Date();
        datevalue.setHours(0, 0, 0, 0);
        $scope.checkErr = function (startDate, endDate) {
            $scope.errMessage1 = '';
            $scope.errMessage2 = '';
            $scope.postreportstartDate = startDate;
            $scope.postreportendDate = endDate;


            if (new Date($scope.postreportstartDate) > new Date($scope.postreportendDate)) {
                $scope.errMessage2 = 'End Date should be greater than start date';
                return false;
            }

            if (new Date($scope.postreportstartDate) < datevalue) {
                $scope.errMessage1 = 'Start date should not be before today.';
                return false;
            }

        };


        $scope.FilterpostContent = function () {

            var url = FilterClientPosts;
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
                'ClientID': $scope.postreportClient.toString(),
                'StartDate': $scope.postreportstartDate,
                'EndDate': $scope.postreportendDate
            }

            APIs.FilterClientPosts(data, params, authorizationHeader)
                .success(function (data, status) {
                    if (status == 200) {
                        $scope.ClientPostsDatas = data.PostingReport;
                        $scope.GetPostingNumber = data.GetPostingNumber;

                    }
                }).error(function (data, status) {

                    $rootScope.slideDownAlertBox = 'slideDown';
                    growl.addErrorMessage('Something went wrong! Please try again later.', config);
                });


        };


        //reset Filter Function
        $scope.emptyFilterpostContent = function () {
            $scope.Refresh();
            $scope.postreportClient = '';
            $scope.postreportstartDate = '';
            $scope.postreportendDate = '';
            $scope.GetPostingNumber = false;
            $scope.postreportstartDate = '';
            $scope.postreportendDate = '';
        };



        //Sorting
        $scope.postContentReportSort = function (asc, header) {

            if (asc) {
                $scope.ClientPostsDatas.sort(predicatByAsc(header));

            }
            if (!asc) {
                $scope.ClientPostsDatas.sort(predicatByDes(header));

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

        $scope.showAddForm = function () {

            $scope.showSaveButton = true;
            $scope.contentCategoryType = '';
            $scope.contentDescription = '';
            $scope.contentClientType = '';
            $scope.id = '';
            $scope.contentPlatformsType = '';
            $scope.hideAddUserForm = true;
            $scope.submitted = false;
            $scope.hideNavBar = true;
        };


        //Pagination

        $scope.currentPage = 0;
        $scope.itemsPerPage = 10;

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


            if ($scope.ClientPostsDatas) {
                return Math.ceil($scope.ClientPostsDatas.length / $scope.itemsPerPage) - 1;
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