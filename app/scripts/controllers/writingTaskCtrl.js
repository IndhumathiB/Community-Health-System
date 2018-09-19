'use strict';

angular.module('chsApp')
    .controller('writingTaskCtrl', function ($scope, $http, $rootScope, $location, $cookies, $filter, APIs, growl) {

        $rootScope.bodylayout = '';
        $rootScope.showSideBar = true;
        $scope.submitted = false;
        $scope.TaskLists = [];
        $scope.clientApprovalBtn = false;
        $scope.approveScheduleBtn = false;

        $rootScope.resetURL = function () {
            $scope.shortedUrl = '';
            $scope.longUrl = '';
        };
        $rootScope.shortURL = function (longUrl) {
            APIs.shortenURL(longUrl).success(function (data) {
                $scope.shortedUrl = data;

            });
        };
        $scope.injectedObject = {
            'hour': '00',
            'mins': '00'
        };

        $('#timePicker input[type=text]').addClass('form-control');

        $('#timePicker div').addClass('timepick');
        /*Global Var*/
        $rootScope.slideDownAlertBox = '';
        var config = {};

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
            var url = serviceUrlBase + 'WritingManagement.svc/GetAllWritingTasks';
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
            APIs.GetAllWritingTasks(params, authorizationHeader)
                .success(function (data, status) {


                    $scope.TaskLists = data.TaskLists;
                    $scope.CategoryLookup = data.CategoryLookup;
                    $scope.EditorLookup = data.EditorLookup;
                    $scope.PlatformLookup = data.PlatformLookup;
                    $scope.StatusLookup = data.StatusLookup;
                    $scope.WriterLookup = data.WriterLookup;
                    $scope.ClientLookUp = data.ClientLookup;
                    $scope.StatusLookup = data.StatusLookup;

                }).error(function (data, status) {
                    $rootScope.slideDownAlertBox = 'slideDown';
                    growl.addErrorMessage('Something went wrong! Please try again later.', config);
                    $scope.hideAddUserForm = false;
                });
        };
        $scope.Refresh();




        //Remove image Writing Task
        $scope.removetaskfb = function () {
            $scope.TaskimgLink = '';
            $scope.imagename = '';
            document.getElementById('taskfb').src = '';
        }
        $scope.removetasktwit = function () {
            $scope.TaskimgLink = '';
            $scope.imagename = '';
            document.getElementById('tasktwit').src = '';
        }
        $scope.removetaskblg = function () {
            $scope.TaskimgLink = '';
            $scope.imagename = '';
            document.getElementById('taskblg').src = '';
        }


        $scope.Reset = function () {
            $scope.returnedData = undefined;
            $scope.taskToFilter = undefined;
            $scope.Refresh();
            $scope.currentPage = 0;
        };


        $scope.shri = function (val) {

            $scope.currentPage = 0;
            $scope.returnedData = $.grep($scope.TaskLists, function (element, index) {
                return element.Status == val;
            });
        };

        /*end of Refresh Grid*/




        $scope.AddUser = function () {
            $scope.submitted = true;
            var listOdAddUser123 = {
                'memberID': parseInt(id),
                'title': $scope.title,
                'descr': $scope.brife,
                'amount': parseInt($scope.amount),
                'categoryID': parseInt($scope.Category.id),
                'writerID': parseInt($scope.Writer.id),
                'editorID': parseInt($scope.Editor.id),
                'clientID': parseInt($scope.Client.id),
                'platform': $scope.Platform.PName,
                'dueDate': $scope.ddate,
                'scheduleDate': $scope.sdate + ' ' + $scope.ctrl.stime1,
                'status': parseInt($scope.Status.id)
            }

            var url = serviceUrlBase + 'WritingManagement.svc/CreateWritingTask';
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
   if($scope.title && $scope.ddate && $scope.sdate  && $scope.Status && $scope.Editor && $scope.Writer && $scope.Client && $scope.Category && $scope.ctrl.stime1 && $scope.amount && $scope.Platform)
                {
            APIs.CreateWritingTask(listOdAddUser123, params, authorizationHeader)
                .success(function (data, status) {
                    if (status == 200 || status == 201) {
                        //

                        $rootScope.slideDownAlertBox = 'slideDown';
                        growl.addSuccessMessage(data, config);
                        $scope.hideAddUserForm = false;
                        $scope.Refresh();
                        $scope.hideNavBar = false;
                    }
                }).error(function (data, status) {
                    $rootScope.slideDownAlertBox = 'slideDown';
                    growl.addErrorMessage('Something went wrong! Please try again later.', config);
                    $scope.hideAddUserForm = false;

                });
                }

        };

        $scope.showAddForm = function () {
            $scope.injectedObject = {
                'hour': '00',
                'mins': '00'
            };
            $scope.submitted = false;
            $scope.title = '';
            $scope.ddate = '';
            $scope.sdate = '';
            $scope.Status = '';
            $scope.Editor = '';
            $scope.Writer = '';
            $scope.Client = '';
            $scope.Category = '';
            $scope.platform = '';
            $scope.amount = '';
            $scope.brife = '';
            $scope.Notes = '';
            $scope.Logs = '';
            $scope.declineReason = '';
            $scope.hideAddUserForm = true;
            $scope.showSaveButton = true;
            $scope.hideNavBar = true;
        };


        $scope.cancelUser = function () {
            $scope.hideAddUserForm = false;
            $scope.hideNavBar = false;
            $scope.editForm = false;
        };

        /*end of Add User*/


        $scope.platformChanging = function (platfrmValue) {
            if (platfrmValue == 'fb') {
                $scope.dispalyFBContent = true;
                $scope.dispalyTWContent = false;
                $scope.dispalyBlogContent = false;

            } else if (platfrmValue == 'tw') {
                $scope.dispalyTWContent = true;
                $scope.dispalyBlogContent = false;
                $scope.dispalyFBContent = false;
            } else if (platfrmValue == 'wp') {
                $scope.dispalyBlogContent = true;
                $scope.dispalyFBContent = false;
                $scope.dispalyTWContent = false;



            }
        };



        $scope.fnFilter = function () {

            $scope.Refresh();


        };


        $scope.shwmsg = false;
        $scope.shwmsg500 = false;

        $scope.dispalyBlogContent = false;
        $scope.dispalyTWContent = false;
        $scope.dispalyFBContent = false;

        /*edit User*/
        $scope.fnGetInfo = function (updateUserData) {
            $scope.showSaveButton = false;
            $scope.editForm = true;
            $scope.hideAddUserForm = true;
            $scope.id = updateUserData;

            $scope.editId = updateUserData;

            var url = serviceUrlBase + 'WritingManagement.svc/GetDetailsWritingTask/' + updateUserData;
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
            APIs.GetDetailsWritingTask(listOdAddUser1, params, authorizationHeader)
                .success(function (data, status) {
                    if (status == 200) {
                        if (data.status == '1') {
                            $scope.clientApprovalBtn = true;
                            $scope.approveScheduleBtn = true;
                        } else {
                            $scope.clientApprovalBtn = false;
                            $scope.approveScheduleBtn = false;
                        }

                        $scope.imagename = data.imageName;
                        $scope.TaskimgLink = "data:image/png;base64, " + data.imageStream;

                        $scope.title = data.title;

                        var split = data.scheduleDate.split(' ');
                        $scope.sdate = split[0];
                        var splits = split[1].split(':');
                        $scope.ctrl.stime1 = splits[0] + ':' + splits[1];
                        if (splits[0] >= 10) {
                            $rootScope.hour = splits[0];
                        } else {
                            $rootScope.hour = splits[0];
                        }
                        $rootScope.minutes = splits[1];

                        $scope.injectedObject = {
                            'hour': $rootScope.hour,
                            'mins': $rootScope.minutes
                        };
                        $scope.ddate = data.dueDate;
                        $scope.Editor = data.editorID;
                        $scope.Writer = data.writerID;
                        $scope.Client = data.clientID;
                        $scope.Category = data.categoryID;
                        $scope.Platform =   data.platformCode;
                        $scope.amount = data.amount;
                        $scope.brife = data.descr;
                        $scope.Notes = data.notes;
                        $scope.Logs = data.logs;
                        $scope.declineReason = data.reason;
                        $scope.Status = data.status.toString();
                        $scope.FBmyfile = "";
                        $scope.twmyfile = "";
                        $scope.wpmyfile = "";
                        if (data.platform == 'Facebook') {
                            $scope.dispalyFBContent = true;
                            $scope.dispalyTWContent = false;
                            $scope.dispalyBlogContent = false;
                            $scope.fbmicro = data.fb_body;
                            $scope.fbtitle = data.fb_title;
                            $scope.fbtitlelink = data.fb_link;
                            $scope.fbdes = data.fb_descr;
                            $scope.FBmyfile = data.fb_picture;
                            $scope.gridID = data.memberID;
                            $scope.myfile = data.fb_picture;
                        } else if (data.platform == 'Twitter') {
                            $scope.dispalyTWContent = true;
                            $scope.dispalyBlogContent = false;
                            $scope.dispalyFBContent = false;
                            $scope.twmicro = data.tw_body;
                            $scope.twmyfile = data.tw_picture;
                        } else if (data.platform == 'Blog') {
                            $scope.dispalyBlogContent = true;
                            $scope.dispalyFBContent = false;
                            $scope.dispalyTWContent = false;
                            $scope.btitle = data.wp_title;
                            $scope.htmlcontent = data.wp_content;
                            $scope.tags = data.wp_tag;
                            $scope.wpmyfile = data.wp_picture;


                        };




                    }


                }).error(function (data, status) {
                    $rootScope.slideDownAlertBox = 'slideDown';
                    growl.addErrorMessage('Something went wrong! Please try again later.', config);
                    $scope.hideAddUserForm = false;
                });
        };

        $scope.declineWriter = function () {

            var listOdAddUser123 = {
                'id': parseInt($scope.id),
                'title': $scope.title,
                'reason': $scope.declineReason,
                'writerID': parseInt($scope.Writer)
            }


            var url = serviceUrlBase + 'WritingManagement.svc/DeclineWritingTask';
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
            APIs.DeclineWritingTask(listOdAddUser123, params, authorizationHeader)
                .success(function (data, status) {
                    if (status == 200) {
                        $rootScope.slideDownAlertBox = 'slideDown';
                        growl.addSuccessMessage(data, config);

                    }
                }).error(function (data, status) {
                    $rootScope.slideDownAlertBox = 'slideDown';
                    growl.addErrorMessage('Something went wrong! Please try again later.', config);
                    $scope.hideAddUserForm = false;

                });

        };

        $scope.editUserSubmit = function () {



            var today = new Date();
            var dd = today.getDate();
            var mm = today.getMonth() + 1;
            var yyyy = today.getFullYear();
            if (dd < 10) {
                dd = '0' + dd
            }
            if (mm < 10) {
                mm = '0' + mm
            }
            $scope.SaveDateFormat = mm + '/' + dd + '/' + yyyy;
            var timestamp1 = Number(new Date());
            $scope.savedate = '\/Date(' + timestamp1 + ')\/';

            $scope.submitted = true;

            var url = serviceUrlBase + 'WritingManagement.svc/UpdateWritingTask';
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
                'title': $scope.title,
                'descr': $scope.brife,
                'amount': parseInt($scope.amount),
                'categoryID': parseInt($scope.Category),
                'writerID': parseInt($scope.Writer),
                'editorID': parseInt($scope.Editor),
                'clientID': parseInt($scope.Client),
                'dueDate': $scope.ddate,
                'scheduleDate': $scope.sdate + ' ' + $scope.ctrl.stime1,
                'status': parseInt($scope.Status),
                'logs': $scope.Logs,
                'notes': $scope.Notes,
                'reason': $scope.declineReason,
                'saveDate': $rootScope.SaveDateFormat
            }


            if ($scope.Platform == 'fb') {

                var f = {
                    'name': $scope.FBmyfile.filename,
                    'base64': $scope.FBmyfile.base64,
                    'filesize': $scope.FBmyfile.filesize,
                    'filetype': $scope.FBmyfile.filetype
                }
                if ($scope.FBmyfile) {
                    listOdAddUser.imageName = f.name || $scope.imagename;
                    listOdAddUser.imageStream = f.base64;
                }
                if ($scope.FBmyfile == '' || $scope.FBmyfile == null || $scope.TaskimgLink == null || $scope.TaskimgLink == '') {
                    listOdAddUser.imageName = '';
                    listOdAddUser.imageStream = '';
                }

                if (!$scope.FBmyfile || $scope.TaskimgLink.length > 25) {
                    var splitedImg = $scope.TaskimgLink.split(',');
                    listOdAddUser.imageStream = splitedImg[1];
                    listOdAddUser.imageName = $scope.imagename;
                    delete $scope.TaskimgLink;
                }

                listOdAddUser.platform = 'Facebook';
                listOdAddUser.fb_body = $scope.fbmicro;
                listOdAddUser.fb_descr = $scope.fbdes;
                listOdAddUser.fb_link = $scope.fbtitlelink;
                listOdAddUser.fb_title = $scope.fbtitle;


            }
            if ($scope.Platform == 'tw') {


                var f1 = {
                    'name': $scope.twmyfile.filename,
                    'base64': $scope.twmyfile.base64,
                    'filesize': $scope.twmyfile.filesize,
                    'filetype': $scope.twmyfile.filetype
                }

                if ($scope.twmyfile) {
                    listOdAddUser.imageName = f1.name || $scope.imagename;
                    listOdAddUser.imageStream = f1.base64;
                }
                if ($scope.twmyfile == '' || $scope.twmyfile == null || $scope.TaskimgLink == '' || $scope.TaskimgLink == null) {
                    listOdAddUser.imageName = '';
                    listOdAddUser.imageStream = '';
                }

                if (!$scope.twmyfile || $scope.TaskimgLink.length > 25) {


                    var splitedImg = $scope.TaskimgLink.split(',');
                    listOdAddUser.imageStream = splitedImg[1];
                    listOdAddUser.imageName = $scope.imagename;
                    delete $scope.TaskimgLink;
                }

                listOdAddUser.platform = 'Twitter';
                listOdAddUser.tw_body = $scope.twmicro;

            }

            if ($scope.Platform == 'wp') {

                var f2 = {
                    'name': $scope.wpmyfile.filename,
                    'base64': $scope.wpmyfile.base64,
                    'filesize': $scope.wpmyfile.filesize,
                    'filetype': $scope.wpmyfile.filetype
                }
                if ($scope.wpmyfile) {

                    listOdAddUser.imageName = f2.name || $scope.imagename;
                    listOdAddUser.imageStream = f2.base64;
                }
                if ($scope.wpmyfile == '' || $scope.wpmyfile == null || $scope.TaskimgLink == null || $scope.TaskimgLink == '') {
                    listOdAddUser.imageName = '';
                    listOdAddUser.imageStream = '';
                }
                if (!$scope.wpmyfile || $scope.TaskimgLink.length > 25) {
                    var splitedImg = $scope.TaskimgLink.split(',');
                    listOdAddUser.imageStream = splitedImg[1];
                    listOdAddUser.imageName = $scope.imagename;
                    delete $scope.TaskimgLink;
                }

                listOdAddUser.platform = 'Blog';
                listOdAddUser.wp_category = '';
                listOdAddUser.wp_content = $scope.htmlcontent;
                listOdAddUser.wp_tag = $scope.tags;
                listOdAddUser.wp_title = $scope.btitle;

            }
            APIs.UpdateWritingTask(listOdAddUser, params, authorizationHeader)
                .success(function (data, status) {
                    if (status == 200) {

                        $rootScope.slideDownAlertBox = 'slideDown';
                        growl.addSuccessMessage(data, config);
                        $scope.hideAddUserForm = false;
                        $scope.editForm = false;
                        $scope.Refresh();

                    }
                }).error(function (data, status) {
                    $rootScope.slideDownAlertBox = 'slideDown';
                    growl.addErrorMessage('Something went wrong! Please try again later.', config);
                    $scope.hideAddUserForm = false;
                    $scope.editForm = false;

                });

        };
        /*end of edit User*/


        $scope.ScheduleAndApproval = function () {



            var url1 = UpdateWritingTask;
            var method1 = 'POST';
            var oAuthDatas1 = authSignature(consumer_key, consumerSecret, url1, method1);
            var params1 = {
                'oauth_consumer_key': oAuthDatas1.msgParameters[0][1],
                'oauth_signature_method': oAuthDatas1.msgParameters[1][1],
                'oauth_version': oAuthDatas1.msgParameters[2][1],
                'oauth_timestamp': oAuthDatas1.msgParameters[3][1],
                'oauth_nonce': oAuthDatas1.msgParameters[4][1],
                'oauth_signature': oAuthDatas1.msgParameters[5][1]
            }

            var authorizationHeader1 = OAuth.getAuthorizationHeader(oAuthDatas1.relam, oAuthDatas1.msgParameters);



            $scope.submitted = true;
            var url = ScheduleAndApproval;
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


            var listOdAddUser = {
                'id': $scope.id,
                'MemberID': id,
                'categoryID': $scope.Category,
                'expireDate': $scope.ddate,
                'hospitalID': $scope.Client.toString(),
                'notes': $scope.Notes,
                'platform': $scope.Platform,
                'title': $scope.title,
                'status': 9,
                'scheduleDate': $scope.sdate + ' ' + $scope.ctrl.stime1

            }

            if ($scope.Platform == 'fb') {

                var f = {
                    'name': $scope.FBmyfile.filename,
                    'base64': $scope.FBmyfile.base64,
                    'filesize': $scope.FBmyfile.filesize,
                    'filetype': $scope.FBmyfile.filetype
                }
                if ($scope.FBmyfile) {
                    listOdAddUser.imageName = f.name || $scope.imagename;
                    listOdAddUser.imageStream = f.base64;
                }
                if ($scope.FBmyfile == '' || $scope.FBmyfile == null || $scope.TaskimgLink == null || $scope.TaskimgLink == '') {
                    listOdAddUser.imageName = '';
                    listOdAddUser.imageStream = '';
                }

                if (!$scope.FBmyfile || $scope.TaskimgLink.length > 25) {
                    var splitedImg = $scope.TaskimgLink.split(',');
                    listOdAddUser.imageStream = splitedImg[1];
                    listOdAddUser.imageName = $scope.imagename;
                    delete $scope.TaskimgLink;
                }

                listOdAddUser.platform = 'Facebook';
                listOdAddUser.fb_body = $scope.fbmicro;
                listOdAddUser.fb_descr = $scope.fbdes;
                listOdAddUser.fb_link = $scope.fbtitlelink;
                listOdAddUser.fb_title = $scope.fbtitle;


            }
            if ($scope.Platform == 'tw') {


                var f1 = {
                    'name': $scope.twmyfile.filename,
                    'base64': $scope.twmyfile.base64,
                    'filesize': $scope.twmyfile.filesize,
                    'filetype': $scope.twmyfile.filetype
                }

                if ($scope.twmyfile) {
                    listOdAddUser.imageName = f1.name || $scope.imagename;
                    listOdAddUser.imageStream = f1.base64;
                }
                if ($scope.twmyfile == '' || $scope.twmyfile == null || $scope.TaskimgLink == '' || $scope.TaskimgLink == null) {
                    listOdAddUser.imageName = '';
                    listOdAddUser.imageStream = '';
                }

                if (!$scope.twmyfile || $scope.TaskimgLink.length > 25) {


                    var splitedImg = $scope.TaskimgLink.split(',');
                    listOdAddUser.imageStream = splitedImg[1];
                    listOdAddUser.imageName = $scope.imagename;
                    delete $scope.TaskimgLink;
                }

                listOdAddUser.platform = 'Twitter';
                listOdAddUser.tw_body = $scope.twmicro;

            }

            if ($scope.Platform == 'wp') {

                var f2 = {
                    'name': $scope.wpmyfile.filename,
                    'base64': $scope.wpmyfile.base64,
                    'filesize': $scope.wpmyfile.filesize,
                    'filetype': $scope.wpmyfile.filetype
                }
                if ($scope.wpmyfile) {

                    listOdAddUser.imageName = f2.name || $scope.imagename;
                    listOdAddUser.imageStream = f2.base64;
                }
                if ($scope.wpmyfile == '' || $scope.wpmyfile == null || $scope.TaskimgLink == null || $scope.TaskimgLink == '') {
                    listOdAddUser.imageName = '';
                    listOdAddUser.imageStream = '';
                }
                if (!$scope.wpmyfile || $scope.TaskimgLink.length > 25) {
                    var splitedImg = $scope.TaskimgLink.split(',');
                    listOdAddUser.imageStream = splitedImg[1];
                    listOdAddUser.imageName = $scope.imagename;
                    delete $scope.TaskimgLink;
                }

                listOdAddUser.platform = 'Blog';
                listOdAddUser.wp_category = '';
                listOdAddUser.wp_content = $scope.htmlcontent;
                listOdAddUser.wp_tag = $scope.tags;
                listOdAddUser.wp_title = $scope.btitle;

            }
            $scope.listOdAddUser1 = angular.copy(listOdAddUser);

            $scope.listOdAddUser1.status = 2

            APIs.UpdateWritingTask($scope.listOdAddUser1, params1, authorizationHeader1)
                .success(function (data, status) {
                    if (status == 200) {


                    }
                }).error(function (data, status) {
                    $rootScope.slideDownAlertBox = 'slideDown';
                    growl.addErrorMessage('Something went wrong! Please try again later.', config);
                });


            APIs.ScheduleAndApproval(listOdAddUser, params, authorizationHeader)
                .success(function (data, status) {
                    if (status == 200) {

                        $rootScope.slideDownAlertBox = 'slideDown';
                        growl.addSuccessMessage(data, config);
                        $scope.AddUserForm = false;
                        $scope.gridview = true;
                        $scope.hideNavBar = false;
                        $scope.hideAddUserForm = false;
                        $scope.wpmyfile = '';
                        $scope.twmyfile = '';
                        $scope.FBmyfile = '';
                    }
                }).error(function (data, status) {
                    $rootScope.slideDownAlertBox = 'slideDown';
                    growl.addErrorMessage('Something went wrong! Please try again later.', config);
                });
            /*  }*/

        };


        //Client Approval

        $scope.SendClientApproval = function () {




            $scope.submitted = true;

            var url1 = UpdateWritingTask;
            var method1 = 'POST';
            var oAuthDatas1 = authSignature(consumer_key, consumerSecret, url1, method1);
            var params1 = {
                'oauth_consumer_key': oAuthDatas1.msgParameters[0][1],
                'oauth_signature_method': oAuthDatas1.msgParameters[1][1],
                'oauth_version': oAuthDatas1.msgParameters[2][1],
                'oauth_timestamp': oAuthDatas1.msgParameters[3][1],
                'oauth_nonce': oAuthDatas1.msgParameters[4][1],
                'oauth_signature': oAuthDatas1.msgParameters[5][1]
            }


            var authorizationHeader1 = OAuth.getAuthorizationHeader(oAuthDatas1.relam, oAuthDatas1.msgParameters);



            var url = SendClientApproval;
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
            var listOdAddUser = {
                'id': $scope.id,
                'MemberID': id,
                'categoryID': $scope.Category,
                'expireDate': $scope.ddate,
                'hospitalID': $scope.Client.toString(),
                'notes': $scope.Notes,
                'platform': $scope.Platform,
                'title': $scope.title,
                'status': 5,
                'scheduleDate': $scope.sdate + ' ' + $scope.ctrl.stime1
            }

            if ($scope.Platform == 'fb') {
                if ($scope.FBmyfile) {

                    var f = {
                        'name': $scope.FBmyfile.filename,
                        'base64': $scope.FBmyfile.base64,
                        'filesize': $scope.FBmyfile.filesize,
                        'filetype': $scope.FBmyfile.filetype
                    }
                    listOdAddUser.imageName = f.name;
                    listOdAddUser.imageStream = f.base64;
                };
                listOdAddUser.platform = 'Facebook';
                listOdAddUser.fb_body = $scope.fbmicro;
                listOdAddUser.fb_descr = $scope.fbdes;
                // listOdAddUser.fb_link=$scope.fbtitlelink;
                listOdAddUser.fb_title = $scope.fbtitle;


            }
            if ($scope.Platform == 'tw') {
                if ($scope.twmyfile) {
                    var f1 = {
                        'name': $scope.twmyfile.filename,
                        'base64': $scope.twmyfile.base64,
                        'filesize': $scope.twmyfile.filesize,
                        'filetype': $scope.twmyfile.filetype
                    }

                    listOdAddUser.imageName = f1.name;
                    listOdAddUser.imageStream = f1.base64;
                };
                listOdAddUser.platform = 'Twitter';
                listOdAddUser.tw_body = $scope.twmicro;

            }

            if ($scope.Platform == 'wp') {
                if ($scope.wpmyfile) {
                    var f2 = {
                        'name': $scope.wpmyfile.filename,
                        'base64': $scope.wpmyfile.base64,
                        'filesize': $scope.wpmyfile.filesize,
                        'filetype': $scope.wpmyfile.filetype
                    }
                    listOdAddUser.imageName = f2.name;
                    listOdAddUser.imageStream = f2.base64;
                };
                listOdAddUser.platform = 'Blog';
                listOdAddUser.wp_category = '';
                listOdAddUser.wp_content = $scope.htmlcontent;
                listOdAddUser.wp_tag = $scope.tags;
                listOdAddUser.wp_title = $scope.btitle;

            }

            $scope.listOdAddUser1 = angular.copy(listOdAddUser);

            $scope.listOdAddUser1.status = 2;
            APIs.UpdateWritingTask($scope.listOdAddUser1, params1, authorizationHeader1)
                .success(function (data, status) {
                    if (status == 200) {}
                }).error(function (data, status) {
                    $rootScope.slideDownAlertBox = 'slideDown';
                    growl.addErrorMessage('Something went wrong! Please try again later.', config);
                });

            APIs.SendClientApproval(listOdAddUser, params, authorizationHeader)
                .success(function (data, status) {
                    if (status == 200) {
                        $rootScope.slideDownAlertBox = 'slideDown';
                        growl.addSuccessMessage(data, config);
                        $scope.AddUserForm = false;
                        $scope.hideNavBar = false;
                        $scope.gridview = true;
                        $scope.hideAddUserForm = false;
                        //  $scope.Refresh();
                        $scope.wpmyfile = '';
                        $scope.twmyfile = '';
                        $scope.FBmyfile = '';
                    }
                }).error(function (data, status) {
                    $rootScope.slideDownAlertBox = 'slideDown';
                    growl.addErrorMessage('Something went wrong! Please try again later.', config);
                });

        };

        /*load based on userType selection*/
        $scope.changeUserType = function (newVal) {
            if (!newVal) {
                $scope.showHospitalField = false;
            } else if (newVal.name == 'Supervisor' || newVal.name == 'Client') {
                $scope.showHospitalField = true;
            } else {
                $scope.showHospitalField = false;
            }
        };
        /*end of load based on userType selection*/


        /*filter List based on UserType*/
        $scope.$watch('selectUserType', function (newVal, oldVal) {
            if (!newVal) {
                $scope.EnterPriseAdmin = true;
                $scope.Supervisor = true;
                $scope.Client = true;
                $scope.FreelanceWriter = true;
                $scope.BallyWhoAdmin = true;
            } else if (newVal.name == 'EnterPrise Admin') {
                $scope.EnterPriseAdmin = true;
                $scope.Supervisor = false;
                $scope.Client = false;
                $scope.FreelanceWriter = false;
                $scope.BallyWhoAdmin = false;
            } else if (newVal.name == 'Supervisor') {
                $scope.EnterPriseAdmin = false;
                $scope.Supervisor = true;
                $scope.Client = false;
                $scope.FreelanceWriter = false;
                $scope.BallyWhoAdmin = false;
            } else if (newVal.name == 'Client') {
                $scope.EnterPriseAdmin = false;
                $scope.Supervisor = false;
                $scope.Client = true;
                $scope.FreelanceWriter = false;
                $scope.BallyWhoAdmin = false;
            } else if (newVal.name == 'Freelance Writer') {
                $scope.EnterPriseAdmin = false;
                $scope.Supervisor = false;
                $scope.Client = false;
                $scope.FreelanceWriter = true;
                $scope.BallyWhoAdmin = false;
            } else if (newVal.name == 'BallyWho Admin') {
                $scope.EnterPriseAdmin = false;
                $scope.Supervisor = false;
                $scope.Client = false;
                $scope.FreelanceWriter = false;
                $scope.BallyWhoAdmin = true;
            }
        });
        /*end of filter List based on UserType*/


        /*Delete User*/
        $scope.fnDelete = function (idValue) {
            var id = {
                'id': idValue
            };
            var url = serviceUrlBase + 'WritingManagement.svc/DeleteWritingTask/' + idValue;
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
                APIs.DeleteWritingTask(id, params, authorizationHeader)
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
                    $scope.hideAddUserForm = false;

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
                    $scope.hideAddUserForm = false;
                });
        };
        /*end of Activate User*/




        //Sorting
        $scope.userManagementSort = function (asc, header) {

            if (asc) {
                $scope.TaskLists.sort(predicatByAsc(header));

            }
            if (!asc) {
                $scope.TaskLists.sort(predicatByDes(header));

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
                return Math.ceil($scope.TaskLists.length / $scope.itemsPerPage) - 1;
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