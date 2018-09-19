'use strict';

angular.module('chsApp')
    .controller('dashboardCtrl', function ($scope, $http, $rootScope, $compile, $routeParams, $filter, $location, $cookies, APIs, growl, uiCalendarConfig, moment) {


        //These variables MUST be set as a minimum for the calendar to work
        $scope.calendarView = 'month';
        $scope.viewDate = new Date();

        $scope.isCellOpen = true;

        $scope.eventClicked = function (event) {};

        $scope.eventEdited = function (event) {};

        $scope.eventDeleted = function (event) {};

        $scope.eventTimesChanged = function (event) {};

        $scope.toggle = function ($event, field, event) {
            $event.preventDefault();
            $event.stopPropagation();
            event[field] = !event[field];
        };






        $rootScope.showSideBar = true;
        $rootScope.slideDownAlertBox = '';
        var config = {};

        $rootScope.bodylayout = '';


        $scope.submitted = false;



        $scope.showAddForm = function () {
            $scope.submitted = false;
            $scope.firstName = '';
            $scope.lname = '';
            $scope.emailId = '';
            $scope.userName = '';
            $scope.password = '';
            $scope.address = '';
            $scope.city = '';
            $scope.state = '';
            $scope.zip = '';
            $scope.phone = '';
            $scope.notes = '';

            $scope.hideAddUserForm = true;
            $scope.showSaveButton = true;
            $scope.hideNavBar = true;
        }


        $scope.cancelUser = function () {
            $scope.hideAddUserForm = false;
            $scope.hideNavBar = false;
            $scope.editForm = false;
        }

        $scope.Contents = [];
        $scope.Clients = [];
        $scope.Contents = [];
        $scope.MonitoringReports = [];
        $scope.NewsInformations = [];
        $scope.Notices = [];
        $scope.SocialChatters = [];
        $scope.SocialMediaReports = [];
        $scope.WriterJobs = [];
        $scope.panelMonitoring = [];

        var id = window.localStorage['id'];
        var Level = window.localStorage['Level'];
        var consumer_key = window.localStorage['consumer_key'];
        var consumerSecret = window.localStorage['consumerSecret'];
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
        if (Level == 30 || Level == 90 || Level == 50) {
            $scope.ShowAdminForm = true;
        };


        /*Refresh Grid*/
        $scope.Refresh = function () {
            var user = {
                'user_id': Number(id),
                'user_level': Number(Level)
            };

            var url = serviceUrlBase + 'DashBoard.svc/GetAllDashBoardsDetails';
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
            APIs.GetAllDashBoardsDetails1(user, params, authorizationHeader)
                .success(function (data, status) {

                    //  $scope.CalenderContents=data.CalenderContents;
                    $scope.events = data.CalenderContents;

                    for (var i = 0; i < $scope.events.length; i++) {
                        $scope.events[i].startsAt = $scope.events[i].scheduleDate;
                        delete $scope.events[i].scheduleDate;
                    };






                    $scope.Clients = data.Clients;
                    $scope.Contents = data.Contents;
                    $scope.MonitoringReports = data.MonitoringReports;
                    $scope.NewsInformations = data.NewsInformations;
                    $scope.Notices = data.Notices;
                    $scope.SocialChatters = data.SocialChatters;
                    $scope.SocialMediaReports = data.SocialMediaReports;
                    $scope.WriterJobs = data.WriterJobs;
                    $scope.panelMonitoring = data.panelMonitoring;

                    if (!$scope.WriterJobs) {

                        $scope.hidewritterJobContent = true;
                    } else {
                        $scope.hidewritterJobContent = false;
                        $scope.WriterJobs = data.WriterJobs;
                    }



                }).error(function (data, status) {
                    $rootScope.slideDownAlertBox = 'slideDown';
                    growl.addErrorMessage('Something went wrong! Please try again later.', config);
                });
        };
        $scope.Refresh();


        $scope.Reset = function () {
            $scope.siteclientType = '';
            $scope.Refresh();
        };
        $scope.FilterByClient1 = function (siteclientType) {

            if (siteclientType) {} else {
                $scope.Reset();
                return;
            }



            var user = {
                'user_id': Number(id),
                'user_level': Number(Level),
                'clientId': siteclientType
            };

            var url = serviceUrlBase + 'DashBoard.svc/FilterByClient';
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
            APIs.FilterByClient(user, params, authorizationHeader)
                .success(function (data, status) {

                    if (status == 200) {};

                    $scope.CalenderContents = data.CalenderContents;
                    $scope.Contents = data.Contents;
                    $scope.MonitoringReports = data.MonitoringReports;
                    $scope.NewsInformations = data.NewsInformations;
                    $scope.Notices = data.Notices;
                    $scope.SocialChatters = data.SocialChatters;
                    $scope.SocialMediaReports = data.SocialMediaReports;
                    $scope.WriterJobs = data.WriterJobs;
                    $scope.panelMonitoring = data.panelMonitoring;



                }).error(function (data, status) {
                    $rootScope.slideDownAlertBox = 'slideDown';
                    growl.addErrorMessage('Something went wrong! Please try again later.', config);
                });
        };



        $scope.fngoToManageContentPage = function () {
            $scope.fnPending();
        };




        $scope.fnCreateContent = function () {
            window.location = '/#/ContentManagement/ManageContent?form=CreateNewContent';
        };

        $scope.fnlnkEdit = function (content, id, Package) {
            window.location = '/#/ContentManagement/ManageContent?id=' + id + '&&content=lnkEdit&&Package=' + Package.replace(/\s/g, '');
        };



        $scope.fnlnkEditFbPack = function (content, id, Package) {
            window.location = '/#/ContentManagement/ManageContent?id=' + id + '&&content=lnkEditFbPack&&Package=' + Package.replace(/\s/g, '');


        };

        $scope.fnlnkEditPack = function (content, id, Package) {
            window.location = '/#/ContentManagement/ManageContent?id=' + id + '&&content=lnkEditPack&&Package=' + Package.replace(/\s/g, '');

        };

        $scope.fnlnkEditTask = function (content, id, Package) {
            window.location = '/#/ContentManagement/ManageContent?id=' + id + '&&content=lnkEditTask&&Package=' + Package.replace(/\s/g, '');

        };

        $scope.fnlnkEditTwPack = function (content, id, Package) {
            window.location = '/#/ContentManagement/ManageContent?id=' + id + '&&content=lnkEditTwPack&&Package=' + Package.replace(/\s/g, '');

        };




        $scope.fnshowAll1 = function () {

            $scope.taskToFilter = 'Canceled';


        };

        $scope.fnAssigned1 = function () {

            $scope.taskToFilter = 'Scheduled';


        };

        $scope.fnPending1 = function () {

            $scope.taskToFilter = 'Pending Approval';


        };
        $scope.fnApproved1 = function () {

            $scope.taskToFilter = 'Posted';


        };


        $scope.fnDeclined1 = function () {

            $scope.taskToFilter = 'Declined';


        };


        $scope.fnshowAll = function () {

            window.location = '/#/ContentManagement/ManageContent?status=Canceled';


        };




        $scope.fnAssigned = function () {

            window.location = '/#/ContentManagement/ManageContent?status=Scheduled';


        };

        $scope.fnPending = function () {

            window.location = '/#/ContentManagement/ManageContent?status=Pending';


        };  
        $scope.fnApproved = function () {

            window.location = '/#/ContentManagement/ManageContent?status=Posted';


        };  


        $scope.fnDeclined = function () {

            window.location = '/#/ContentManagement/ManageContent?status=Declined';


        };









        //Sorting
        $scope.userManagementSort = function (asc, header) {

            if (asc) {
                $scope.Contents.sort(predicatByAsc(header));

            }
            if (!asc) {
                $scope.Contents.sort(predicatByDes(header));

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

            if ($scope.Contents) {
                return Math.ceil($scope.Contents.length / $scope.itemsPerPage) - 1;
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