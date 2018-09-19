'use strict';

angular.module('chsApp')
    .controller('WeeklyPackageListsCtrl', function ($scope, $http, $rootScope, $filter, $location, $cookies, APIs, growl) {

        $rootScope.showSideBar = true;

        $rootScope.slideDownAlertBox = '';
        var config = {};

        $rootScope.bodylayout = '';
        $rootScope.resetURL = function () {
            $scope.shortedUrl = '';
            $scope.longUrl = '';
        };

        //Remove pictures
        $scope.removeblahfbi = function () {
            document.getElementById('blahfbi').src = '';
        }
        $scope.removeblahtwt = function () {
            document.getElementById('blahtwt').src = '';
        }
        $scope.removeblahfb = function () {
            document.getElementById('blahfb').src = '';
        }

        $('#timePicker input[type=text]').addClass('form-control');

        $('#timePicker div').addClass('timepick');
        $scope.injectedObject = {
            'hour': '00',
            'mins': '00'
        };

        $scope.submitted = false;



        $scope.showAddForm = function () {
            $scope.showOnlySingleDayPackage = false;
            $scope.showOnlySevenDayPackage = false;
            $scope.saveForm = false;
            $scope.FacebookContent = '';
            $scope.FbImageContent = '';
            $scope.TwitterContent = '';
            $scope.amount = '';
            $scope.cli = '';
            $scope.ddate = '';
            $scope.edi1 = '';

            $scope.Archived = '';

            $scope.packageName = '';
            $scope.notes = '';

            $scope.sdate = '';

            $scope.wri1 = '';
            $scope.singleDay = '';
            $scope.packList1 = '';
            $scope.submitted = false;

            $scope.hideAddUserForm = true;
            $scope.showSaveButton = true;
            $scope.hideNavBar = true;
            $scope.injectedObject = {
                'hour': '00',
                'mins': '00'
            };
        };


        $scope.cancelUser = function () {
            $scope.hideAddUserForm = false;
            $scope.hideNavBar = false;
            $scope.editForm = false;
            $scope.showContentSend = false;
            $scope.savedForm = false;


            $scope.taskToFilter = '';

            $scope.cli = '';
            $scope.edi1 = '';
            $scope.sta1 = '';
            $scope.wri1 = '';
            $scope.isArchievedFilter = '';

        };

        $scope.WeeklyPackageLists = [];

        var id = window.localStorage['id'];
        var memberId = window.localStorage['id'];
        var Level = window.localStorage['Level'];
        var consumer_key = window.localStorage['consumer_key'];
        var consumerSecret = window.localStorage['consumerSecret'];

        $scope.levelData = Level;
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
        /*Refresh Grid*/
        $scope.Refresh = function () {
            var user = {
                'user_id': id,
                'user_level': Level
            };

            var url = serviceUrlBase + 'WritingManagement.svc/GetAllPackagesList';
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
            APIs.GetAllPackagesList(user, params, authorizationHeader)
                .success(function (data, status) {
                    $scope.WeeklyPackageLists = data.WeeklyPackageLists;
                    $scope.returnedData = $scope.WeeklyPackageLists;
                    $scope.currentPage = 0;
                    $scope.Clients1 = data.Clients;
                    $scope.Editors1 = data.Editors;
                    $scope.Status1 = data.Status;
                    $scope.Writers1 = data.Writers;
                    $scope.TypeOfPackages1 = data.TypeOfPackages;

                }).error(function (data, status) {
                    $rootScope.slideDownAlertBox = 'slideDown';
                    growl.addErrorMessage('Something went wrong! Please try again later.', config);
                    $scope.hideAddUserForm = false;
                    $scope.editForm = false;
                    $scope.hideNavBar = false;
                });
        };

        $scope.Refresh();
        /*end of Refresh Grid*/

        $scope.startDate = $rootScope.result;


        var datevalue = new Date();

        datevalue.setHours(0, 0, 0, 0);
        $scope.checkErr = function (startDate, endDate) {
            $scope.errMessage1 = '';
            $scope.errMessage2 = '';
            $scope.startDate = startDate;
            $scope.endDate = endDate;


            if (new Date($scope.startDate) > new Date($scope.endDate)) {
                $scope.errMessage2 = 'End Date should be greater than start date';
                return false;
            }

            if (new Date($scope.startDate) < datevalue) {
                $scope.errMessage1 = 'Start date should not be before today.';
                return false;
            }

        };





        $scope.FilterBlogClient = function () {



            var url = FilterPackageList;
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
                'clientID': $scope.cli,
                'editorID': $scope.edi1,
                'showArchived': $scope.isArchievedFilter,
                'startDate': $scope.sdate,
                'status': $scope.sta1,
                'user_id': id,
                'user_level': Level,
                'writerID': $scope.wri1
            }

            APIs.FilterPackageList(data, params, authorizationHeader)
                .success(function (data, status) {
                    if (status == 200) {

                        $scope.currentPage = 0;

                        $scope.returnedData = undefined;
                        $scope.WeeklyPackageLists = data;



                    }
                }).error(function (data, status) {

                    $rootScope.slideDownAlertBox = 'slideDown';
                    growl.addErrorMessage('Something went wrong! Please try again later.', config);
                    $scope.hideAddUserForm = false;
                    $scope.editForm = false;
                    $scope.hideNavBar = false;
                });


        };

        $scope.Reset = function () {
            $scope.taskToFilter = '';
            $scope.Refresh();
            $scope.cli = '';
            $scope.edi1 = '';
            $scope.sta1 = '';
            $scope.wri1 = '';
            $scope.isArchievedFilter = '';
            $scope.startDate = '';


        };



        //reset Filter Function
        $scope.emptyFilterBlogClient = function () {
            $scope.startDate = $rootScope.result;
            $scope.endDate = $rootScope.result1;
            $scope.Refresh();
            $scope.blogclientName = '';


        };


        $scope.shortURL = function (longUrl) {
            APIs.shortenURL(longUrl).success(function (data) {
                for (var i = 0; i < $scope.MainDiv.length; i++) {

                    $scope.MainDiv[i].TwitterContent.shortedUrl = data;
                }
            });
        };

        $scope.resetURL = function () {
            for (var i = 0; i < $scope.MainDiv.length; i++) {
                $scope.MainDiv[i].TwitterContent.shortedUrl = '';
                $scope.MainDiv[i].TwitterContent.longUrl = '';
            }
            $scope.MainDiv[0].twContent.shortedUrl = '';
            $scope.MainDiv[0].twContent.longUrl = '';
        };

        //Short Url paclages   
        $scope.updateShortURL = function (longUrl, indexVal) {
            APIs.shortenURL(longUrl).success(function (data) {
                $scope.MainDiv1[indexVal].TwitterContent.shortedUrl = data;
            });
        };

        //Reset url packages
        $scope.updateResetURL = function (indexVal) {
            $scope.MainDiv1[indexVal].TwitterContent.shortedUrl = '';
            $scope.MainDiv1[indexVal].TwitterContent.longUrl = '';
        };


        $scope.fnPendingApproval = function () {
            $scope.currentPage = 0;
            $scope.taskToFilter = 'Pending';
            $scope.returnedData = $.grep($scope.WeeklyPackageLists, function (element, index) {
                return element.status == 'Pending Client Approval';
            });


            $scope.returnedData2 = $.grep($scope.WeeklyPackageLists, function (element, index) {
                return element.status == 'Pending Editor Approval';
            });


            $scope.returnedData.concat($scope.returnedData1)

        };

        $scope.fnAssigned = function () {
            $scope.currentPage = 0;
            $scope.taskToFilter = 'Assigned to writer';
            $scope.returnedData = $.grep($scope.WeeklyPackageLists, function (element, index) {
                return element.status == 'Assigned to writer';
            });
        };


        $scope.fndeclined = function () {
            $scope.currentPage = 0;
            $scope.taskToFilter = 'Declined by Editor';
            $scope.returnedData = $.grep($scope.WeeklyPackageLists, function (element, index) {
                return element.status == 'Declined by Editor';
            });
        };

        $scope.fnscheduled = function () {
            $scope.currentPage = 0;
            $scope.taskToFilter = 'Approved by Client and Scheduled';
            $scope.returnedData = $.grep($scope.WeeklyPackageLists, function (element, index) {
                return element.status == 'Approved by Client and Scheduled';
            });
        };
        $scope.fncancelled = function () {
            $scope.currentPage = 0;
            $scope.taskToFilter = 'Cancelled';

            $scope.returnedData = $.grep($scope.WeeklyPackageLists, function (element, index) {
                return element.status == 'Cancelled';
            });


        };

        $scope.fnArchived = function () {
            $scope.currentPage = 0;
            $scope.taskToFilter = 'Archived';
            $scope.returnedData = $.grep($scope.WeeklyPackageLists, function (element, index) {
                return element.status == 'Archived';
            });
        };

        $scope.Archived1 = function (detailID) {
            var id = {
                'id': detailID
            };
            var url = Archived + '/' + detailID;
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


            APIs.Archived(id, params, authorizationHeader)
                .success(function (data, status) {
                    if (status == 200) {
                        $rootScope.slideDownAlertBox = 'slideDown';
                        growl.addSuccessMessage(data, config);
                        $scope.Refresh();
                    }
                }).error(function (data, status) {
                    $rootScope.slideDownAlertBox = 'slideDown';
                    growl.addErrorMessage('Something went wrong! Please try again later.', config);
                    $scope.hideAddUserForm = false;
                    $scope.editForm = false;
                    $scope.hideNavBar = false;
                });



        };

        $scope.sendClientForApproval = function () {
            var id = {
                'id': $scope.packageId
            };
            var url = AdminApprove + '/' + $scope.packageId;
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


            APIs.AdminApprove(id, params, authorizationHeader)
                .success(function (data, status) {
                    if (status == 200) {
                        $rootScope.slideDownAlertBox = 'slideDown';
                        growl.addSuccessMessage(data, config);
                    }
                }).error(function (data, status) {
                    $rootScope.slideDownAlertBox = 'slideDown';
                    growl.addErrorMessage('Something went wrong! Please try again later.', config);
                    $scope.hideAddUserForm = false;
                    $scope.editForm = false;
                    $scope.hideNavBar = false;
                });
        };




        $scope.approveAsClient = function () {
            var id = {
                'id': $scope.packageId
            };
            var url = ClientApprove + '/' + $scope.packageId;
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


            APIs.ClientApprove(id, params, authorizationHeader)
                .success(function (data, status) {
                    if (status == 200) {
                        $rootScope.slideDownAlertBox = 'slideDown';
                        growl.addSuccessMessage(data, config);
                    }
                }).error(function (data, status) {
                    $rootScope.slideDownAlertBox = 'slideDown';
                    growl.addErrorMessage('Something went wrong! Please try again later.', config);
                    $scope.hideAddUserForm = false;
                    $scope.editForm = false;
                    $scope.hideNavBar = false;
                });
        };


        $scope.packageDelete1 = function (detailID) {


            var id = {
                'id': detailID
            };
            var url = DeleteWriterPackage + '/' + detailID;
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
                APIs.DeleteWriterPackage(id, params, authorizationHeader)
                    .success(function (data, status) {
                        if (status == 200) {
                            $rootScope.slideDownAlertBox = 'slideDown';
                            growl.addSuccessMessage(data, config);
                            $scope.Refresh();
                        }
                    }).error(function (data, status) {
                        $rootScope.slideDownAlertBox = 'slideDown';
                        growl.addErrorMessage('Something went wrong! Please try again later.', config);
                        $scope.hideAddUserForm = false;
                        $scope.editForm = false;
                        $scope.hideNavBar = false;
                    });
            }


        };

        $scope.GetContentsByFBPackId1 = function (detailID) {
            $scope.showContentSend = true;
            $scope.saveForm = false;
            $scope.packageId = detailID;

            $scope.showSaveButton = false;
            $scope.editForm = true;
            $scope.hideAddUserForm = true;


            var id = {
                'packageId': detailID
            };
            var url = GetContentsByFBPackId;
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



            APIs.GetContentsByFBPackId(id, params, authorizationHeader)
                .success(function (data, status) {
                    if (status == 200) {

                        if (data.isSingleDay == '0') {
                            $scope.UpdateshowOnlySevenDayPackage = true;
                            $scope.UpdateshowOnlySingleDayPackage = false;
                        }

                        if (data.isSingleDay == '1') {

                            $scope.UpdateshowOnlySingleDayPackage = true;
                            $scope.UpdateshowOnlySevenDayPackage = false;
                        };

                        $scope.dataTitile = data.Title;
                        $scope.FacebookContent = data.FacebookContent;
                        $scope.FbImageContent = data.FbImageContent;
                        $scope.TwitterContent = data.TwitterContent;
                        $scope.amount = data.amount;
                        $scope.cli = Number(data.clientID);
                        $scope.ddate = data.dueDate;
                        $scope.edi1 = Number(data.editorID);
                        data.id;
                        $scope.Archived = Number(data.isArchived);
                        data.is_fb;
                        data.is_tw;
                        data.memberID;
                        $scope.packageName = data.name;
                        $scope.notes = data.notes;
                        data.posting_time;
                        data.saveDate;
                        $scope.sdate = data.startDate;
                        $scope.ddate = data.dueDate;
                        data.status;
                        $scope.wri1 = Number(data.writerID);
                        $scope.singleDay = Number(data.isSingleDay);
                        $scope.packList1 = data.platformIdentity;



                        if ($scope.FacebookContent) {

                            if ($scope.FacebookContent.length > 0) {

                                $scope.MainDiv1 = [];
                                for (var i = 0; i < $scope.FacebookContent.length; i++) {
                                    $scope.FacebookContent[i].dataTitile1 = data.FacebookContent[i].GroupHeaderText;
                                    $scope.FacebookContent[i].imgLink = "data:image/png;base64, " + $scope.FacebookContent[i].imageStream;
                                    $scope.FacebookContent[i].weklyctrl = {};
                                    var postTime = dateFormat($scope.FacebookContent[i].ScheduleDate);
                                    /* $scope.FacebookContent[i].GroupHeaderText = postTime.date;*/
                                    $scope.FacebookContent[i].scheduleDate = postTime.date;
                                    $scope.FacebookContent[i].weklyctrl.injectedObject = injectedTimeFormat(postTime.hours);
                                    $scope.MainDiv1.push({
                                        'FacebookContent': $scope.FacebookContent[i],
                                        'FbImageContent': null,
                                        'TwitterContent': null
                                    })
                                };


                            };

                        };
                    }
                }).error(function (data, status) {
                    $rootScope.slideDownAlertBox = 'slideDown';
                    growl.addErrorMessage('Something went wrong! Please try again later.', config);
                    $scope.hideAddUserForm = false;
                    $scope.editForm = false;
                    $scope.hideNavBar = false;
                });



        };


        $scope.GetContentsByTWPackId1 = function (detailID) {
            $scope.showContentSend = true;
            $scope.saveForm = false;

            $scope.packageId = detailID;

            $scope.showSaveButton = false;
            $scope.editForm = true;
            $scope.hideAddUserForm = true;


            var id = {
                'packageId': detailID
            };
            var url = GetContentsByTWPackId;
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



            APIs.GetContentsByTWPackId(id, params, authorizationHeader)
                .success(function (data, status) {
                    if (status == 200) {

                        if (data.isSingleDay == '0') {
                            $scope.UpdateshowOnlySevenDayPackage = true;
                            $scope.UpdateshowOnlySingleDayPackage = false;
                        }

                        if (data.isSingleDay == '1') {

                            $scope.UpdateshowOnlySingleDayPackage = true;
                            $scope.UpdateshowOnlySevenDayPackage = false;
                        };

                        $scope.dataTitile = data.Title;
                        $scope.FacebookContent = data.FacebookContent;
                        $scope.FbImageContent = data.FbImageContent;
                        $scope.TwitterContent = data.TwitterContent;
                        $scope.amount = data.amount;
                        $scope.cli = Number(data.clientID);
                        $scope.ddate = data.dueDate;
                        $scope.edi1 = Number(data.editorID);
                        $scope.Archived = Number(data.isArchived);
                        $scope.packageName = data.name;
                        $scope.notes = data.notes;
                        $scope.sdate = data.startDate;
                        $scope.ddate = data.dueDate;
                        $scope.wri1 = Number(data.writerID);
                        $scope.singleDay = Number(data.isSingleDay);
                        $scope.packList1 = data.platformIdentity;



                        if ($scope.TwitterContent) {

                            if ($scope.TwitterContent.length > 0) {
                                $scope.MainDiv1 = [];
                                for (var i = 0; i < $scope.TwitterContent.length; i++) {
                                    $scope.TwitterContent[i].dataTitile1 = data.TwitterContent[i].GroupHeaderText;
                                    $scope.TwitterContent[i].imgLink = "data:image/png;base64, " + $scope.TwitterContent[i].imageStream;
                                    $scope.TwitterContent[i].weklyctrl = {};
                                    var postTime = dateFormat($scope.TwitterContent[i].ScheduleDate);
                                    /*  $scope.TwitterContent[i].GroupHeaderText = postTime.date;*/
                                    $scope.TwitterContent[i].twitsdate = postTime.date;
                                    $scope.TwitterContent[i].weklyctrl.injectedObject = injectedTimeFormat(postTime.hours);
                                    $scope.TwitterContent[i].scheduleDate = $scope.TwitterContent[i].twitsdate + ' ' + $scope.TwitterContent[i].weklyctrl.schdtime;
                                    $scope.MainDiv1.push({
                                        'FacebookContent': null,
                                        'FbImageContent': null,
                                        'TwitterContent': $scope.TwitterContent[i]
                                    })
                                };


                            };

                        };
                    }
                }).error(function (data, status) {
                    $rootScope.slideDownAlertBox = 'slideDown';
                    growl.addErrorMessage('Something went wrong! Please try again later.', config);
                    $scope.hideAddUserForm = false;
                    $scope.editForm = false;
                    $scope.hideNavBar = false;
                });



        };


        $scope.GetContentsByPackageId1 = function (detailID) {
            $scope.showContentSend = true;
            $scope.saveForm = false;
            $scope.showSaveButton = false;
            $scope.editForm = true;
            $scope.hideAddUserForm = true;

            $scope.packageId = detailID;


            var id = {
                'packageId': detailID
            };
            var url = GetContentsByPackageId;
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



            APIs.GetContentsByPackageId(id, params, authorizationHeader)
                .success(function (data, status) {
                    if (status == 200) {


                        if (data.status == '0') {
                            $scope.showContentIsReady = true;
                            $scope.showDeclineReason = false;
                        }

                        if (data.status == '1' && Level == 90) {
                            $scope.showDeclineReason = true;
                            $scope.showContentIsReady = false;
                        };

                        if (data.isSingleDay == '0') {
                            $scope.UpdateshowOnlySevenDayPackage = true;
                            $scope.UpdateshowOnlySingleDayPackage = false;
                        }

                        if (data.isSingleDay == '1') {

                            $scope.UpdateshowOnlySingleDayPackage = true;
                            $scope.UpdateshowOnlySevenDayPackage = false;
                        };

                        if (data.status == "1" || data.status == "2") {
                            $scope.showContentSend = false;
                            //$scope.showDeclineReason = true;
                        }

                        $scope.FacebookContent = data.FacebookContent;


                        $scope.FbImageContent = data.FbImageContent;
                        $scope.TwitterContent = data.TwitterContent;
                        $scope.amount = data.amount;
                        $scope.cli = Number(data.clientID);
                        $scope.ddate = data.dueDate;
                        $scope.edi1 = Number(data.editorID);
                        $scope.packageId = data.id;
                        $scope.Archived = Number(data.isArchived);

                        $scope.packageName = data.name;
                        $scope.notes = data.notes;

                        $scope.sdate = data.startDate;
                        $scope.ddate = data.dueDate;

                        $scope.wri1 = Number(data.writerID);
                        $scope.singleDay = Number(data.isSingleDay);
                        $scope.packList1 = data.platformIdentity;

                        if (!$scope.FacebookContent && !$scope.FbImageContent && $scope.TwitterContent) {
                            $scope.dataTitile = data.TwitterContent[0].GroupHeaderText;

                            $scope.MainDiv1 = [];
                            for (var i = 0; i < $scope.TwitterContent.length; i++) {
                                var postTime = dateFormat($scope.TwitterContent[i].ScheduleDate);
                                //                                $scope.FacebookContent[i].GroupHeaderText = postTime.date;

                                $scope.MainDiv1.push({
                                    'FacebookContent': null,
                                    'FbImageContent': null,
                                    'TwitterContent': $scope.TwitterContent[i]
                                })
                            };


                        };


                        if ($scope.FacebookContent && !$scope.FbImageContent && !$scope.TwitterContent) {
                            $scope.dataTitile = data.FacebookContent[0].GroupHeaderText;
                            $scope.UpdateshowOnlySevenDayPackage = true;
                            $scope.MainDiv1 = [];
                            for (var i = 0; i < $scope.FacebookContent.length; i++) {
                                var postTime = dateFormat($scope.FacebookContent[i].ScheduleDate);
                                /*  $scope.FacebookContent[i].GroupHeaderText = postTime.date;*/

                                $scope.MainDiv1.push({
                                    'FacebookContent': $scope.FacebookContent[i],
                                    'FbImageContent': null,
                                    'TwitterContent': null
                                })
                            };

                        };




                        if ($scope.FacebookContent && $scope.FbImageContent && $scope.TwitterContent) {

                            if ($scope.FacebookContent.length > 0) {
                                var postTime = dateFormat($scope.FacebookContent[0].ScheduleDate);
                                $scope.weklyctrl.injectedObject = injectedTimeFormat(postTime.hours);
                                $scope.MainDiv1 = [];
                                for (var i = 0; i < $scope.FacebookContent.length; i++) {
                                    $scope.FacebookContent[i].dataTitile1 = data.FacebookContent[i].GroupHeaderText;
                                    $scope.FacebookContent[i].imgLink = "data:image/png;base64, " + $scope.FacebookContent[i].imageStream;
                                    $scope.FbImageContent[i].imgLink = "data:image/png;base64, " + $scope.FbImageContent[i].imageStream;
                                    $scope.TwitterContent[i].imgLink = "data:image/png;base64, " + $scope.TwitterContent[i].imageStream;
                                    $scope.FacebookContent[i].weklyctrl = {};
                                    var postTime = dateFormat($scope.FacebookContent[i].ScheduleDate);
                                    $scope.FacebookContent[i].weklyctrl.injectedObject = injectedTimeFormat(postTime.hours);
                                    var postTime = dateFormat($scope.FbImageContent[i].ScheduleDate);
                                    $scope.FacebookContent[i].weklyctrl.injectedObject = injectedTimeFormat(postTime.hours);
                                    var postTime = dateFormat($scope.TwitterContent[i].ScheduleDate);
                                    $scope.FacebookContent[i].weklyctrl.injectedObject = injectedTimeFormat(postTime.hours);
                                    $scope.MainDiv1.push({
                                        'FacebookContent': $scope.FacebookContent[i],
                                        'FbImageContent': $scope.FbImageContent[i],
                                        'TwitterContent': $scope.TwitterContent[i]
                                    })


                                }


                            };

                        };
                    }
                }).error(function (data, status) {

                    $rootScope.slideDownAlertBox = 'slideDown';
                    growl.addErrorMessage('Something went wrong! Please try again later.', config);
                    $scope.hideAddUserForm = false;
                    $scope.editForm = false;
                    $scope.hideNavBar = false;

                });



        };

        $scope.UpdateshowOnlySevenDayPackage = false;
        $scope.UpdateshowOnlySingleDayPackage = false;




        $scope.SavePackage = function () {


            $scope.submitted = true;
            $scope.timeValue = $scope.weklyctrl.potime;



            var listOdAddUser123 = {
                'memberID': Number(memberId),
                'clientID': $scope.cli.toString(),
                'editorID': $scope.edi1,
                'writerID': $scope.wri1,
                'amount': Number($scope.amount),
                'name': $scope.packageName,
                'notes': $scope.notes,
                'posting_time': $scope.timeValue,
                'dueDate': $scope.ddate,
                'startDate': $scope.sdate,
                'platformIdentity': $scope.packList1
            }



            if (!$scope.singleDay) {
                listOdAddUser123.isSingleDay = 0;
            };

            if ($scope.singleDay == 1) {
                listOdAddUser123.isSingleDay = 1;
            };


            if (!$scope.ArchivedVal) {
                listOdAddUser123.isArchived = 0;
            } else {
                listOdAddUser123.isArchived = $scope.ArchivedVal;
            }

            $scope.packageDetails = listOdAddUser123;


            var url = CreatePackageDetail;
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
            if ($scope.amount && $scope.wri1 && $scope.edi1 && $scope.ddate && $scope.sdate && $scope.weklyctrl.potime && $scope.cli && $scope.packageName) { 
                APIs.CreatePackageDetail(listOdAddUser123, params, authorizationHeader)
                    .success(function (data, status) {
                        $scope.showContentSend = true;

                        if (status == 200) {


                            $scope.packList1 = data.platformIdentity;
                            if (data.status == '0') {
                                $scope.showContentIsReady = true;
                                $scope.showDeclineReason = false;
                            }
                            if (data.status == '1' && Level == 90) {
                                $scope.showDeclineReason = true;
                                $scope.showContentIsReady = false;
                            };
                            $scope.packageId = data.id;


                            $scope.dates = data.startDate;

                            if (data.isSingleDay == '1') {
                                $scope.showOnlySingleDayPackage = true;
                                $scope.showOnlySevenDayPackage = false;
                            }


                            if (data.isSingleDay == '0') {
                                $scope.showOnlySevenDayPackage = true;
                                $scope.showOnlySingleDayPackage = false;
                                $scope.DisableCheckBox = true;
                            }

                            $scope.savedForm = true;
                            $scope.FacebookContent = data.FacebookContent;
                            $scope.FbImageContent = data.FbImageContent;
                            $scope.TwitterContent = data.TwitterContent;

                            if ($scope.TwitterContent && !$scope.FacebookContent && !$scope.FbImageContent) {
                                $scope.dataTitile = data.TwitterContent[0].GroupHeaderText;
                                $scope.showOnlySevenDayPackage = true;
                                $scope.MainDiv = [];
                                for (var i = 0; i < $scope.TwitterContent.length; i++) {
                                    $scope.TwitterContent[i].dataTitile = data.TwitterContent[i].GroupHeaderText;
                                    $scope.TwitterContent[i].weklyctrl = {};
                                    var postTime = dateFormat($scope.TwitterContent[i].ScheduleDate);
                                    $scope.TwitterContent[i].GroupHeaderText = postTime.date;
                                    $scope.TwitterContent[i].scheduleDate = postTime.date;
                                    $scope.TwitterContent[i].weklyctrl.injectedObject = injectedTimeFormat(postTime.hours);
                                    $scope.TwitterContent[i].platform = 'Twitter';
                                    $scope.MainDiv.push({
                                        'FacebookContent': null,
                                        'FbImageContent': null,
                                        'TwitterContent': $scope.TwitterContent[i]
                                    })
                                };


                            };


                            if ($scope.FacebookContent && !$scope.FbImageContent && !$scope.TwitterContent) {
                                $scope.dataTitile = data.FacebookContent[0].GroupHeaderText;
                                $scope.showOnlySevenDayPackage = true;
                                $scope.MainDiv = [];
                                for (var i = 0; i < $scope.FacebookContent.length; i++) {
                                    $scope.FacebookContent[i].dataTitile = data.FacebookContent[i].GroupHeaderText;
                                    var postTime = dateFormat($scope.FacebookContent[i].ScheduleDate);
                                    $scope.FacebookContent[i].GroupHeaderText = postTime.date;
                                    $scope.FacebookContent[i].scheduleDate = postTime.date;
                                    $scope.FacebookContent[i].weklyctrl = {};
                                    $scope.FacebookContent[i].weklyctrl.injectedObject = injectedTimeFormat(postTime.hours);
                                    $scope.FacebookContent[i].platform = 'Facebook';
                                    $scope.MainDiv.push({
                                        'FacebookContent': $scope.FacebookContent[i],
                                        'FbImageContent': null,
                                        'TwitterContent': null
                                    })
                                };

                            };

                            console.log($scope.FacebookContent);
                            if ($scope.FacebookContent && $scope.FbImageContent && $scope.TwitterContent) {
                                $scope.dataTitile = data.FacebookContent[0].GroupHeaderText;
                                var postTime = dateFormat($scope.FacebookContent[0].ScheduleDate);
                                $scope.weklyctrl.injectedObject = injectedTimeFormat(postTime.hours);
                                $scope.MainDiv = [];
                                for (var i = 0; i < $scope.FacebookContent.length; i++) {
                                    $scope.FacebookContent[i].dataTitile = data.FacebookContent[i].GroupHeaderText;
                                    $scope.FacebookContent[i].imgLink = "data:image/png;base64, " + $scope.FacebookContent[i].imageStream;
                                    $scope.FbImageContent[i].imgLink = "data:image/png;base64, " + $scope.FbImageContent[i].imageStream;
                                    $scope.TwitterContent[i].imgLink = "data:image/png;base64, " + $scope.TwitterContent[i].imageStream;
                                    $scope.FacebookContent[i].weklyctrl = {};
                                    var postTime = dateFormat($scope.FacebookContent[i].ScheduleDate);
                                    $scope.FacebookContent[i].GroupHeaderText = postTime.date;
                                    $scope.FacebookContent[i].scheduleDate = postTime.date;
                                    $scope.FacebookContent[i].weklyctrl.injectedObject = injectedTimeFormat(postTime.hours);
                                    var postTime = dateFormat($scope.FbImageContent[i].ScheduleDate);
                                    $scope.FbImageContent[i].GroupHeaderText = postTime.date;
                                    $scope.FbImageContent[i].scheduleDate = postTime.date;
                                    var postTime = dateFormat($scope.TwitterContent[i].ScheduleDate);
                                    $scope.TwitterContent[i].GroupHeaderText = postTime.date;
                                    $scope.TwitterContent[i].scheduleDate = postTime.date;
                                    $scope.FbImageContent[i].platform = 'Facebook';
                                    $scope.MainDiv.push({
                                        'FacebookContent': $scope.FacebookContent[i],
                                        'FbImageContent': $scope.FbImageContent[i],
                                        'TwitterContent': $scope.TwitterContent[i]
                                    })
                                };


                            }

                        }
                    }).error(function (data, status) {

                        $rootScope.slideDownAlertBox = 'slideDown';
                        growl.addErrorMessage('Something went wrong! Please try again later.', config); 
                        $scope.hideAddUserForm = false;  
                        $scope.editForm = false;
                        $scope.hideNavBar = false;
                    });
            }
        };

        $scope.showContentIsReady = false;
        $scope.showDeclineReason = false;
        $scope.showContentSend = false;

        $scope.contentIsReady = function (value) {

            if (value) {
                if (confirm("Do you want to proceed?") == false) {
                    return;
                }

            }


            var id = {
                'id': $scope.packageId
            };
            var url = SendToEditor + '/' + $scope.packageId;
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


            APIs.SendToEditor(id, params, authorizationHeader)
                .success(function (data, status) {
                    if (status == 200) {
                        $rootScope.slideDownAlertBox = 'slideDown';
                        growl.addSuccessMessage(data, config);
                    }
                }).error(function (data, status) {
                    $rootScope.slideDownAlertBox = 'slideDown';
                    growl.addErrorMessage('Something went wrong! Please try again later.', config);
                    $scope.hideAddUserForm = false;
                    $scope.editForm = false;
                    $scope.hideNavBar = false;

                });
        };


        $scope.fnDeclineReason = function () {
            var id = {
                'id': $scope.packageId,
                'reason': $scope.declineReason
            };
            var url = AdminDecline;
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


            APIs.AdminDecline(id, params, authorizationHeader)
                .success(function (data, status) {
                    if (status == 200) {
                        $rootScope.slideDownAlertBox = 'slideDown';
                        growl.addSuccessMessage(data, config);
                    }
                }).error(function (data, status) {
                    $rootScope.slideDownAlertBox = 'slideDown';
                    growl.addErrorMessage('Something went wrong! Please try again later.', config);
                    $scope.hideAddUserForm = false;
                    $scope.editForm = false;
                    $scope.hideNavBar = false;
                });
        };


        $scope.fnApproveAndScheduleContent = function () {
            var id = {
                'id': $scope.packageId
            };
            var url = AdminApprove + '/' + $scope.packageId;
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


            APIs.AdminApprove(id, params, authorizationHeader)
                .success(function (data, status) {
                    if (status == 200) {
                        $rootScope.slideDownAlertBox = 'slideDown';
                        growl.addSuccessMessage(data, config);                                   
                    }
                }).error(function (data, status) {
                    $rootScope.slideDownAlertBox = 'slideDown';
                    growl.addErrorMessage('Something went wrong! Please try again later.', config);
                    $scope.hideAddUserForm = false;
                    $scope.editForm = false;
                    $scope.hideNavBar = false;
                });
        }




        $scope.FacebookContent = [];
        $scope.FbImageContent = [];
        $scope.TwitterContent = [];
        var nums = [];
        $scope.fnshowOnlySevenDayPackage = function () {

            if ($scope.MainDiv) {


                if ($scope.FacebookContent || $scope.packList1 == 'pack' || $scope.packList1 == 'facebook') {
                    for (var i = 0; i < $scope.FacebookContent.length; i++) {
                        $scope.FacebookContent[i].platform = 'Facebook';
                        if ($scope.FacebookContent[i].fb_picture) {
                            $scope.FacebookContent[i].imageStream = $scope.FacebookContent[i].fb_picture.base64;
                            $scope.FacebookContent[i].imageName = $scope.FacebookContent[i].fb_picture.filename;
                        };
                        if ($scope.FacebookContent[i].fb_picture == '') {
                            $scope.FacebookContent[i].imageStream = '';
                            $scope.FacebookContent[i].imageName = '';

                        }
                        $scope.FacebookContent[i].declineReason = $scope.FacebookContent[i].DeclineReason;
                        $scope.FacebookContent[i].fb_descr = $scope.FacebookContent[i].Description;
                        $scope.FacebookContent[i].fb_body = $scope.FacebookContent[i].Microblog;
                        $scope.FacebookContent[i].id = $scope.FacebookContent[i].ContentId;
                        $scope.FacebookContent[i].fb_link = $scope.FacebookContent[i].Titlelink;
                        $scope.FacebookContent[i].fb_title = $scope.FacebookContent[i].Title;

                        $scope.FacebookContent[i].scheduleDate = $scope.FacebookContent[i].scheduleDate + ' ' + $scope.FacebookContent[i].weklyctrl.potime;
                        $scope.FacebookContent[i].hospitalID = $scope.cli;
                        $scope.FacebookContent[i].isDeclined = $scope.FacebookContent[i].IsDeclined;
                    };
                };

                if ($scope.FbImageContent || $scope.packList1 == 'pack') {

                    for (var i = 0; i < $scope.FbImageContent.length; i++) {

                        $scope.FbImageContent[i].platform = 'Facebook';
                        if ($scope.FbImageContent[i].fb_picture) {
                            $scope.FbImageContent[i].imageStream = $scope.FbImageContent[i].fb_picture.base64;
                            $scope.FbImageContent[i].imageName = $scope.FbImageContent[i].fb_picture.filename;
                        };
                        if ($scope.FbImageContent[i].fb_picture == '') {
                            $scope.FbImageContent[i].imageStream = '';
                            $scope.FbImageContent[i].imageName = '';
                        }
                        $scope.FbImageContent[i].declineReason = $scope.FbImageContent[i].DeclineReason;
                        $scope.FbImageContent[i].fb_descr = $scope.FbImageContent[i].Description;
                        $scope.FbImageContent[i].fb_body = $scope.FbImageContent[i].Microblog;
                        $scope.FbImageContent[i].id = $scope.FbImageContent[i].ContentId;
                        $scope.FbImageContent[i].fb_link = $scope.FbImageContent[i].Titlelink;
                        $scope.FbImageContent[i].fb_title = $scope.FbImageContent[i].Title;
                        $scope.FbImageContent[i].hospitalID = $scope.cli;
                        $scope.FbImageContent[i].scheduleDate = $scope.FbImageContent[i].scheduleDate + ' ' + $scope.FacebookContent[i].weklyctrl.potime;
                        $scope.FbImageContent[i].isDeclined = $scope.FbImageContent[i].IsDeclined;
                    };
                };

                if ($scope.TwitterContent || $scope.packList1 == 'twitter' || $scope.packList1 == 'pack') {

                    for (var i = 0; i < $scope.TwitterContent.length; i++) {

                        $scope.TwitterContent[i].platform = 'Twitter';
                        if ($scope.TwitterContent[i].fb_picture) {
                            $scope.TwitterContent[i].imageStream = $scope.TwitterContent[i].fb_picture.base64;
                            $scope.TwitterContent[i].imageName = $scope.TwitterContent[i].fb_picture.filename;
                        };
                        if ($scope.TwitterContent[i].fb_picture == '') {
                            $scope.TwitterContent[i].imageStream = '';
                            $scope.TwitterContent[i].imageName = '';
                        }
                        $scope.TwitterContent[i].tw_body = $scope.TwitterContent[i].Microblog;
                        $scope.TwitterContent[i].id = $scope.TwitterContent[i].ContentId;
                        if ($scope.packList1 == 'pack') {
                            $scope.TwitterContent[i].scheduleDate = $scope.TwitterContent[i].scheduleDate + ' ' + $scope.FacebookContent[i].weklyctrl.potime;
                        }
                        if ($scope.packList1 == 'twitter') {
                            $scope.TwitterContent[i].scheduleDate = $scope.TwitterContent[i].scheduleDate + ' ' + $scope.TwitterContent[i].weklyctrl.potime;
                        }
                        $scope.TwitterContent[i].hospitalID = $scope.cli;

                    };
                };

            };

            if ($scope.MainDiv1) {


                if ($scope.FacebookContent || $scope.packList1 == 'pack' || $scope.packList1 == 'facebook') {
                    for (var i = 0; i < $scope.FacebookContent.length; i++) {

                        if ($scope.FacebookContent) {

                            $scope.FacebookContent[i].platform = 'Facebook'
                        };
                        if ($scope.FacebookContent[i].fb_picture) {
                            $scope.FacebookContent[i].imageStream = $scope.FacebookContent[i].fb_picture.base64;
                            $scope.FacebookContent[i].imageName = $scope.FacebookContent[i].fb_picture.filename || $scope.FacebookContent[i].imageName;
                        };
                        if ($scope.FacebookContent[i].imgLink.length > 25 && !$scope.FacebookContent[i].fb_picture.base64) {
                            var splitedImg = $scope.FacebookContent[i].imgLink.split(',');
                            $scope.FacebookContent[i].imageStream = splitedImg[1];
                            delete $scope.FacebookContent[i].imgLink;
                        };
                        if ($scope.FacebookContent[i].fb_picture == '' && $scope.FacebookContent[i].imgLink == '') {

                            $scope.FacebookContent[i].imageStream = '';
                            $scope.FacebookContent[i].imageName = '';
                            delete $scope.FacebookContent[i].imgLink;

                        }
                        $scope.FacebookContent[i].declineReason = $scope.FacebookContent[i].DeclineReason;
                        $scope.FacebookContent[i].fb_descr = $scope.FacebookContent[i].Description;

                        if ($scope.packList1 == 'pack') {

                            var postTime = dateFormat($scope.FacebookContent[i].ScheduleDate);
                            $scope.FacebookContent[i].scheduleDate = postTime.date;
                            if ($scope.FacebookContent[i].weklyctrl) {

                                $scope.FacebookContent[i].scheduleDate = $scope.FacebookContent[i].scheduleDate + ' ' + $scope.FacebookContent[i].weklyctrl.potime;

                            }
                        }
                        if ($scope.packList1 == 'facebook') {

                            if ($scope.FacebookContent[i].weklyctrl) {

                                $scope.FacebookContent[i].scheduleDate = $scope.FacebookContent[i].GroupHeaderText + ' ' + $scope.FacebookContent[i].weklyctrl.potime;

                            }
                        } else if (!$scope.FacebookContent[i].weklyctrl) {
                            $scope.FacebookContent[i].scheduleDate = $scope.FacebookContent[i].scheduleDate;
                        }
                        $scope.FacebookContent[i].fb_body = $scope.FacebookContent[i].Microblog;
                        $scope.FacebookContent[i].id = $scope.FacebookContent[i].ContentId;
                        $scope.FacebookContent[i].fb_link = $scope.FacebookContent[i].Titlelink;
                        $scope.FacebookContent[i].fb_title = $scope.FacebookContent[i].Title;
                        $scope.FacebookContent[i].hospitalID = $scope.cli;
                        $scope.FacebookContent[i].isDeclined = $scope.FacebookContent[i].isDeclined;
                    };
                };

                if ($scope.FbImageContent || $scope.packList1 == 'pack') {

                    for (var i = 0; i < $scope.FbImageContent.length; i++) {

                        if ($scope.FbImageContent) {

                            $scope.FbImageContent[i].platform = 'Facebook';

                        };
                        var postTime = dateFormat($scope.FbImageContent[i].ScheduleDate);
                        $scope.FbImageContent[i].scheduleDate = postTime.date;
                        if ($scope.FacebookContent[i].weklyctrl) {
                            $scope.FbImageContent[i].scheduleDate = $scope.FbImageContent[i].scheduleDate + ' ' + $scope.FacebookContent[i].weklyctrl.potime;
                        }
                        $scope.FbImageContent[i].scheduleDate = $scope.FbImageContent[i].scheduleDate;
                        if ($scope.FbImageContent[i].fb_picture) {
                            $scope.FbImageContent[i].imageStream = $scope.FbImageContent[i].fb_picture.base64;
                            $scope.FbImageContent[i].imageName = $scope.FbImageContent[i].fb_picture.filename || $scope.FbImageContent[i].imageName;
                        };
                        if ($scope.FbImageContent[i].imgLink.length > 25 && !$scope.FbImageContent[i].fb_picture.base64) {
                            var splitedImg = $scope.FbImageContent[i].imgLink.split(',');
                            $scope.FbImageContent[i].imageStream = splitedImg[1];
                            delete $scope.FbImageContent[i].imgLink;
                        };
                        if ($scope.FbImageContent[i].fb_picture == '' && $scope.FbImageContent[i].imgLink == '') {

                            $scope.FbImageContent[i].imageStream = '';
                            $scope.FbImageContent[i].imageName = '';
                            delete $scope.FbImageContent[i].imgLink;

                        }
                        $scope.FbImageContent[i].declineReason = $scope.FbImageContent[i].DeclineReason;
                        $scope.FbImageContent[i].fb_descr = $scope.FbImageContent[i].Description;
                        $scope.FbImageContent[i].fb_body = $scope.FbImageContent[i].Microblog;
                        $scope.FbImageContent[i].id = $scope.FbImageContent[i].ContentId;
                        $scope.FbImageContent[i].fb_link = $scope.FbImageContent[i].Titlelink;
                        $scope.FbImageContent[i].fb_title = $scope.FbImageContent[i].Title;
                        $scope.FbImageContent[i].hospitalID = $scope.cli;
                        $scope.FbImageContent[i].isDeclined = $scope.FbImageContent[i].IsDeclined;

                    };
                };

                if ($scope.TwitterContent || $scope.packList1 == 'twitter' || $scope.packList1 == 'pack') {

                    for (var i = 0; i < $scope.TwitterContent.length; i++) {

                        if ($scope.TwitterContent) {

                            $scope.TwitterContent[i].platform = 'Twitter'
                        };
                        if ($scope.TwitterContent[i].fb_picture) {
                            $scope.TwitterContent[i].imageStream = $scope.TwitterContent[i].fb_picture.base64;
                            $scope.TwitterContent[i].imageName = $scope.TwitterContent[i].fb_picture.filename || $scope.TwitterContent[i].imageName;
                        };
                        if ($scope.TwitterContent[i].imgLink.length > 25 && !$scope.TwitterContent[i].fb_picture) {
                            var splitedImg = $scope.TwitterContent[i].imgLink.split(',');
                            $scope.TwitterContent[i].imageStream = splitedImg[1];
                            delete $scope.TwitterContent[i].imgLink;
                        };
                        if ($scope.TwitterContent[i].fb_picture == '' && $scope.TwitterContent[i].imgLink == '') {
                            $scope.TwitterContent[i].imageStream = '';
                            $scope.TwitterContent[i].imageName = '';
                            delete $scope.TwitterContent[i].imgLink;

                        }
                        if ($scope.packList1 == 'twitter' && $scope.TwitterContent[i].weklyctrl) {
                            var postTime = dateFormat($scope.TwitterContent[i].ScheduleDate);
                            $scope.weklyctrl.schdtime = postTime.hours;
                            $scope.TwitterContent[i].scheduleDate = $scope.TwitterContent[i].twitsdate + ' ' + $scope.TwitterContent[i].weklyctrl.schdtime;
                        } else if (!$scope.TwitterContent[i].weklyctrl) {
                            $scope.TwitterContent[i].scheduleDate = $scope.TwitterContent[i].scheduleDate;
                        } else if ($scope.packList1 == 'pack') {
                            var postTime = dateFormat($scope.TwitterContent[i].ScheduleDate);
                            $scope.TwitterContent[i].scheduleDate = postTime.date;
                            $scope.weklyctrl.potime = postTime.hours;

                            $scope.TwitterContent[i].scheduleDate = $scope.TwitterContent[i].scheduleDate + ' ' + $scope.FacebookContent[i].weklyctrl.potime;
                        }

                        $scope.TwitterContent[i].tw_body = $scope.TwitterContent[i].Microblog;
                        $scope.TwitterContent[i].id = $scope.TwitterContent[i].ContentId;
                        $scope.TwitterContent[i].hospitalID = $scope.cli;



                    };
                };

            };





            if ($scope.FacebookContent) {
                for (var i = 0; i < $scope.FacebookContent.length; i++) {
                    delete $scope.FacebookContent[i].ScheduleDate;
                    delete $scope.FacebookContent[i].fb_picture;
                    /* delete $scope.weklyctrl;*/

                    if ($scope.FacebookContent[i].Declined == true) {
                        $scope.FacebookContent[i].isDeclined = 1;
                    } else {

                        $scope.FacebookContent[i].isDeclined = 0;
                    }

                }
            }
            if ($scope.FbImageContent) {
                for (var i = 0; i < $scope.FbImageContent.length; i++) {
                    delete $scope.FbImageContent[i].fb_picture;
                    delete $scope.FbImageContent[i].ScheduleDate;

                    if ($scope.FbImageContent[i].Declined == true) {
                        $scope.FbImageContent[i].isDeclined = 1;
                    } else {

                        $scope.FbImageContent[i].isDeclined = 0;
                    }

                }
            }
            if ($scope.TwitterContent) {
                for (var i = 0; i < $scope.TwitterContent.length; i++) {
                    delete $scope.TwitterContent[i].fb_picture;
                    delete $scope.TwitterContent[i].ScheduleDate;
                    delete $scope.TwitterContent[i].twitsdate;

                    $scope.TwitterContent[i].declineReason = $scope.TwitterContent[i].DeclineReason


                    if ($scope.TwitterContent[i].Declined == true) {
                        $scope.TwitterContent[i].isDeclined = 1;
                    } else {

                        $scope.TwitterContent[i].isDeclined = 0;
                    }


                }
            }
            $scope.packageDetails = {
                'id': parseInt($scope.packageId),
                'memberID': Number(memberId),
                'clientID': parseInt($scope.cli.toString()),
                'editorID': $scope.edi1,
                'writerID': $scope.wri1,
                'amount': Number($scope.amount),
                'name': $scope.packageName,
                'notes': $scope.notes,
                'posting_time': $scope.weklyctrl.potime,
                'isSingleDay': $scope.singleDay || '0',
                'dueDate': $scope.ddate,
                'startDate': $scope.sdate,
                'platformIdentity': $scope.packList1,
                'isArchived': $scope.ArchivedVal
            }
            if ($scope.packList1 == 'pack') {


                nums = $scope.FacebookContent.concat($scope.FbImageContent, $scope.TwitterContent);


                var listOdAddUser123 =       {
                    'packageDetail': $scope.packageDetails,
                    'contentDetials': nums
                }
            } else if ($scope.packList1 == 'twitter') {


                var listOdAddUser123 =       {
                    'packageDetail': $scope.packageDetails,
                    'contentDetials': $scope.TwitterContent
                }
            } else if ($scope.packList1 == 'facebook') {


                var listOdAddUser123 =       {
                    'packageDetail': $scope.packageDetails,
                    'contentDetials': $scope.FacebookContent
                }
            }








            var url = UpdatePackageContents;
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
            if ($scope.amount && $scope.wri1 && $scope.edi1 && $scope.ddate && $scope.sdate && $scope.weklyctrl.potime && $scope.cli && $scope.packageName) { 
                APIs.UpdatePackageContents(listOdAddUser123, params, authorizationHeader)
                    .success(function (data, status) {
                        if (status == 200) {
                            $scope.hideAddUserForm = false;
                            $scope.hideNavBar = false;
                            $scope.showOnlySingleDayPackage = false;
                            $scope.showOnlySevenDayPackage = false;

                            $scope.UpdateshowOnlySevenDayPackage = false;
                            $scope.UpdateshowOnlySingleDayPackage = false;
                            $scope.Refresh();
                            $scope.cancelUser();
                            $rootScope.slideDownAlertBox = 'slideDown';
                            growl.addSuccessMessage('updated Successfully', config);
                        }
                    }).error(function (data, status) {
                        $rootScope.slideDownAlertBox = 'slideDown';
                        growl.addErrorMessage('Something went wrong! Please try again later.', config);   
                        $scope.hideAddUserForm = false;  
                        $scope.editForm = false;
                        $scope.hideNavBar = false;

                    });

            }
        };


        $scope.getImage = function (data) {
            return 'data:image/jpeg;base64,' + data;
        }


        $scope.fnshowOnlySingleDayPackage = function () {

            $scope.FacebookContent[0].platform = 'Facebook'
            $scope.FbImageContent[0].platform = 'Facebook'
            $scope.TwitterContent[0].platform = 'Twitter'

            if ($scope.FacebookContent[0].fb_picture) {
                $scope.FacebookContent[0].imageStream = $scope.FacebookContent[0].fb_picture.base64;
                $scope.FacebookContent[0].imageName = $scope.FacebookContent[0].fb_picture.filename || $scope.FacebookContent[0].imageName;
            }
            if ($scope.FacebookContent[0].imgLink.length > 25 && !$scope.FacebookContent[0].fb_picture.base64) {
                var splitedImg = $scope.FacebookContent[0].imgLink.split(',');
                $scope.FacebookContent[0].imageStream = splitedImg[1];
                delete $scope.FacebookContent[0].imgLink;
            };
            if ($scope.FacebookContent[0].fb_picture == '' && $scope.FacebookContent[0].imgLink == '') {
                $scope.FacebookContent[0].imageStream = '';
                $scope.FacebookContent[0].imageName = '';
                delete $scope.FacebookContent[0].imgLink;
            }
            if ($scope.FbImageContent[0].fb_picture) {
                $scope.FbImageContent[0].imageStream = $scope.FbImageContent[0].fb_picture.base64;
                $scope.FbImageContent[0].imageName = $scope.FbImageContent[0].fb_picture.filename || $scope.FbImageContent[0].imageName;
            }
            if ($scope.FbImageContent[0].imgLink.length > 25 && !$scope.FbImageContent[0].fb_picture.base64) {
                var splitedImg = $scope.FbImageContent[0].imgLink.split(',');
                $scope.FbImageContent[0].imageStream = splitedImg[1];
                delete $scope.FbImageContent[0].imgLink;
            }
            if ($scope.FbImageContent[0].fb_picture == '' && $scope.FbImageContent[0].imgLink == '') {
                $scope.FbImageContent[0].imageStream = '';
                $scope.FbImageContent[0].imageName = '';
                delete $scope.FbImageContent[0].imgLink;
            }
            if ($scope.TwitterContent[0].fb_picture) {
                $scope.TwitterContent[0].imageStream = $scope.TwitterContent[0].fb_picture.base64;
                $scope.TwitterContent[0].imageName = $scope.TwitterContent[0].fb_picture.filename || $scope.TwitterContent[0].imageName;

            };
            if ($scope.TwitterContent[0].fb_picture == '' && $scope.TwitterContent[0].imgLink == '') {
                $scope.TwitterContent[0].imageStream = '';
                $scope.TwitterContent[0].imageName = '';
                delete $scope.TwitterContent[0].imgLink;
            }
            if ($scope.TwitterContent[0].imageStream && $scope.TwitterContent[0].imgLink.length > 25 && !$scope.TwitterContent[0].fb_picture) {

                var splitedImg = $scope.TwitterContent[0].imgLink.split(',');
                $scope.TwitterContent[0].imageStream = splitedImg[1];
                delete $scope.TwitterContent[0].imgLink;

            };
            $scope.FacebookContent[0].declineReason = $scope.FacebookContent[0].DeclineReason;
            $scope.FbImageContent[0].declineReason = $scope.FbImageContent[0].DeclineReason;

            $scope.FacebookContent[0].fb_descr = $scope.FacebookContent[0].Description;
            $scope.FbImageContent[0].fb_descr = $scope.FbImageContent[0].Description;

            $scope.FacebookContent[0].fb_body = $scope.FacebookContent[0].Microblog;
            $scope.FbImageContent[0].fb_body = $scope.FbImageContent[0].Microblog;
            $scope.TwitterContent[0].tw_body = $scope.TwitterContent[0].Microblog;

            $scope.FacebookContent[0].id = $scope.FacebookContent[0].ContentId;
            $scope.FbImageContent[0].id = $scope.FbImageContent[0].ContentId;
            $scope.TwitterContent[0].id = $scope.TwitterContent[0].ContentId;

            $scope.FacebookContent[0].fb_link = $scope.FacebookContent[0].Titlelink;
            $scope.FbImageContent[0].fb_link = $scope.FbImageContent[0].Titlelink;

            $scope.FacebookContent[0].fb_title = $scope.FacebookContent[0].Title;
            $scope.FbImageContent[0].fb_title = $scope.FbImageContent[0].Title;


            $scope.FacebookContent[0].hospitalID = $scope.cli;
            $scope.FbImageContent[0].hospitalID = $scope.cli;
            $scope.TwitterContent[0].hospitalID = $scope.cli;

            if ($scope.weklyctrl.posttime) {
                var postTime = dateFormat($scope.FacebookContent[0].ScheduleDate);
                $scope.FacebookContent[0].scheduleDate = postTime.date;
                var postTime = dateFormat($scope.FbImageContent[0].ScheduleDate);
                $scope.FbImageContent[0].scheduleDate = postTime.date;
                var postTime = dateFormat($scope.TwitterContent[0].ScheduleDate);
                $scope.TwitterContent[0].scheduleDate = postTime.date;
                console.log($scope.FacebookContent[0].scheduleDate);
                $scope.FacebookContent[0].scheduleDate = $scope.FacebookContent[0].scheduleDate + ' ' + $scope.weklyctrl.posttime;
                $scope.FbImageContent[0].scheduleDate = $scope.FbImageContent[0].scheduleDate + ' ' + $scope.weklyctrl.posttime;
                $scope.TwitterContent[0].scheduleDate = $scope.TwitterContent[0].scheduleDate + ' ' + $scope.weklyctrl.posttime;
            } else if (!$scope.weklyctrl.posttime) {
                $scope.FacebookContent[0].scheduleDate = $scope.FacebookContent[0].ScheduleDate;
                $scope.FbImageContent[0].scheduleDate = $scope.FbImageContent[0].ScheduleDate;
                $scope.TwitterContent[0].scheduleDate = $scope.TwitterContent[0].ScheduleDate;
            }

            $scope.FacebookContent[0].isDeclined = $scope.FacebookContent[0].IsDeclined;
            $scope.FbImageContent[0].isDeclined = $scope.FbImageContent[0].IsDeclined;

            $scope.submitted = true;
            delete $scope.FacebookContent[0].ScheduleDate;
            delete $scope.TwitterContent[0].ScheduleDate;
            delete $scope.FbImageContent[0].ScheduleDate;
            delete $scope.FacebookContent[0].fb_picture;
            delete $scope.FbImageContent[0].fb_picture;
            delete $scope.TwitterContent[0].fb_picture;
            $scope.TwitterContent[0].declineReason = $scope.TwitterContent[0].DeclineReason
            if ($scope.TwitterContent[0].Declined == true) {
                $scope.TwitterContent[0].isDeclined = 1;
            } else {

                $scope.TwitterContent[0].isDeclined = 0;
            }

            $scope.FacebookContent[0].declineReason = $scope.FacebookContent[0].DeclineReason
            if ($scope.FacebookContent[0].Declined == true) {
                $scope.FacebookContent[0].isDeclined = 1;
            } else {

                $scope.FacebookContent[0].isDeclined = 0;
            }
            $scope.FbImageContent[0].declineReason = $scope.FbImageContent[0].DeclineReason
            if ($scope.FbImageContent[0].Declined == true) {
                $scope.FbImageContent[0].isDeclined = 1;
            } else {

                $scope.FbImageContent[0].isDeclined = 0;
            }
            delete $scope.weklyctrl;
            $scope.packageDetails = {
                'id': parseInt($scope.packageId),
                'memberID': Number(memberId),
                'clientID': parseInt($scope.cli.toString()),
                'editorID': $scope.edi1,
                'writerID': $scope.wri1,
                'amount': Number($scope.amount),
                'name': $scope.packageName,
                'notes': $scope.notes,
                /* 'posting_time': $scope.weklyctrl.potime,*/
                'isSingleDay': $scope.singleDay || '1',
                'dueDate': $scope.ddate,
                'startDate': $scope.sdate,
                'platformIdentity': $scope.packList1,
                'isArchived': $scope.ArchivedVal
            }
            var listOdAddUser123 =       {
                'packageDetail': $scope.packageDetails,
                'contentDetials': [$scope.FacebookContent[0], {}, {}, {}, {}, {}, {}, $scope.FbImageContent[0], {}, {}, {}, {}, {}, {}, $scope.TwitterContent[0], {}, {}, {}, {}, {}, {}]
            }

            var url = UpdatePackageContents;
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
            if ($scope.amount && $scope.wri1 && $scope.edi1 && $scope.ddate && $scope.sdate && $scope.cli && $scope.packageName) { 
                APIs.UpdatePackageContents(listOdAddUser123, params, authorizationHeader)
                    .success(function (data, status) {
                        if (status == 200) {
                            $scope.hideAddUserForm = false;
                            $scope.cancelUser();
                            $scope.hideNavBar = false;
                            $scope.showOnlySingleDayPackage = false;
                            $scope.showOnlySevenDayPackage = false;

                            $scope.UpdateshowOnlySevenDayPackage = false;
                            $scope.UpdateshowOnlySingleDayPackage = false;
                            $scope.Refresh();
                            growl.addSuccessMessage('updated Successfully', config);
                        }
                    }).error(function (data, status) {

                        $rootScope.slideDownAlertBox = 'slideDown';
                        growl.addErrorMessage('Something went wrong! Please try again later.', config);
                        $scope.hideAddUserForm = false;
                        $scope.editForm = false;
                        $scope.hideNavBar = false;
                    });
            }
        };



        $scope.savedForm = false;
        $scope.showOnlySingleDayPackage = false;
        $scope.showOnlySevenDayPackage = false;
        $scope.DisableCheckBox = false;
        /*

        $scope.removeBlah1 = function () {
        document.getElementById('blah1').src = '';
        };

        $scope.removeBlah = function () {
        document.getElementById('blah').src = '';
        };
        */

        $scope.removefacepackImg = function (fbindex) {
            if (!fbindex) {
                $scope.FacebookContent[0].fb_picture = '';
                $scope.FacebookContent[0].imgLink = '';
                document.getElementById('facepackImg').src = '';
            } else {

                $scope.FacebookContent[fbindex].fb_picture = '';
                $scope.FacebookContent[fbindex].imgLink = '';
                document.getElementById('facepackImg' + fbindex).src = '';

            }
        }
        $scope.removefbipackImg = function (fbiindex) {
            if (!fbiindex) {
                $scope.FbImageContent[0].fb_picture = '';
                $scope.FbImageContent[0].imgLink = '';
                document.getElementById('fbipackImg').src = '';
            } else {

                $scope.FbImageContent[fbiindex].fb_picture = '';
                $scope.FbImageContent[fbiindex].imgLink = '';
                document.getElementById('fbipackImg1' + fbiindex).src = '';

            }
        }
        $scope.removetwitpackImg = function (twitindex) {
            if (!twitindex) {
                $scope.TwitterContent[0].fb_picture = '';
                $scope.TwitterContent[0].imgLink = '';
                document.getElementById('twitpackImg').src = '';
            } else {

                $scope.TwitterContent[twitindex].fb_picture = '';
                $scope.TwitterContent[twitindex].imgLink = '';
                document.getElementById('twitpackImg1' + twitindex).src = '';


            }
        }





        //Date format

        function dateFormat(scheduleDate) {

            var res = scheduleDate.split(' ');
            var result = {
                date: res[0],
                hours: res[1]
            };
            return result;

        }

        function injectedTimeFormat(time) {
            var res = time.split(':');
            return {
                'hour': res[0],
                'mins': res[1]
            };
        }






        //Sorting
        $scope.userManagementSort = function (asc, header) {

            if (asc) {
                $scope.WeeklyPackageLists.sort(predicatByAsc(header));

            }
            if (!asc) {
                $scope.WeeklyPackageLists.sort(predicatByDes(header));

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
                return Math.ceil($scope.WeeklyPackageLists.length / $scope.itemsPerPage) - 1;
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