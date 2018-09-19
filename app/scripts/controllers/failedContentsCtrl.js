'use strict';

angular.module('chsApp')
    .controller('failedContentsCtrl', function ($scope, $http, $rootScope, $location, $cookies, APIs, growl) {
        $scope.radioValues = {};
        $scope.submitted = false;
        $rootScope.showSideBar = true;
        $scope.Packages = false;

        $rootScope.bodylayout = '';
        $rootScope.slideDownAlertBox = '';
        var config = {};

        $scope.AddUserForm = false;

        $scope.cancelUser = function () {
            $scope.writingtask = false;
            $scope.hideEditForm = false;
            $scope.AddUserForm = false;
            $scope.gridview = true;
            $scope.Packages = false;
            $scope.hideNavBar = false;
            $scope.editForm = false;
            $scope.manageContentForm = false;


        };

        $scope.shortURL = function (longUrl) {
            APIs.shortenURL(longUrl).success(function (data) {
                $scope.shortedUrl = data;

            });
        };
        $scope.resetURL = function () {
            $scope.shortedUrl = '';
            $scope.longUrl = '';
        };


        $('#timePicker input[type=text]').addClass('form-control');
        $('#timePicker div').addClass('timepick');

        $scope.failedContentDatas = [];
        var id = window.localStorage['id'];
        var Level = window.localStorage['Level'];
        var consumer_key = window.localStorage['consumer_key'];
        var consumerSecret = window.localStorage['consumerSecret'];
        $scope.ShowAdminForm = false;
        if (Level == 30 || Level == 90 || Level == 50) {
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

        //Refresh Grid
        $scope.Refresh = function () {
            var user = {
                'user_id': id,
                'user_level': Level
            };
            var url = GetFailedContents;
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
            APIs.GetFailedContents(user, params, authorizationHeader)
                .success(function (data, status) {
                    $scope.failedContentDatas = data.FailedContent;
                    $scope.CategoryList = data.CategoryList;
                    $scope.Client = data.Client;

                }).error(function (data, status) {
                    $rootScope.slideDownAlertBox = 'slideDown';
                    growl.addErrorMessage('Something went wrong! Please try again later.', config);
                });
        };

        $scope.Refresh();
        //end of Refresh Grid

        $scope.Platformnames = [{
            'PName': 'FB',
            'id': 'fb'
}, {
            'PName': 'FB Image',
            'id': 'fi'
}, {
            'PName': 'TW',
            'id': 'tw'
}, {
            'PName': 'Blog',
            'id': 'wp'
}];



        //Mark As Read function    
        $scope.MarkAsRead = function () {
            var url = MarkAsRead;
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
            APIs.MarkAsRead(params, authorizationHeader)
                .success(function (data, status) {
                    if (status == 200) {};

                }).error(function (data, status) {
                    $rootScope.slideDownAlertBox = 'slideDown';
                    growl.addErrorMessage('Something went wrong! Please try again later.', config);
                });

        };

        //Get single content
        $scope.AddUserForm = false;
        $scope.onlyforAdd = false;
        $scope.GetFailedContentById = function (failedData) {
            $scope.onlyforAdd = false;
            $scope.showSaveButton = false;
            $scope.editForm = true;
            $scope.hideAddUserForm = true;
            $scope.AddUserForm = true;
            $scope.Editfailed = true;
            $scope.manageFBIpic = '';
            $scope.manageFBPic = '';
            $scope.manageTwtpic = '';
            $scope.manageBlogImg = '';

            $scope.clientId = failedData.id;

            var user = {
                'id': parseInt(failedData.id)
            };

            var url = GetFailedContentById;
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
            APIs.GetFailedContentById(user, params, authorizationHeader)
                .success(function (data, status) {
                    if (status == 200) {

                        $scope.packageId = data.id;
                        $scope.imagename = data.imageName;
                        $scope.imgLink = "data:image/png;base64, " + data.imageStream;
                        $scope.manageCategoryType = Number(data.categoryID);
                        $scope.manageExpryDate = data.expireDate;
                        $scope.auditCategoryType = data.wp_category;
                        var val1 = data.hospitalID;
                        $scope.manageClient = val1.split(',').map(function (val1) {
                            return Number(val1);
                        });
                        $scope.manageNotes = data.notes;
                        $scope.radioValues.manage = data.platform;
                        $scope.manageTitle = data.title;
                        var split1 = data.scheduleDate.split(' ');
                        $scope.contentpostDate = split1[0];
                        var splits = split1[1].split(':');
                        $scope.ctrl.time2 = splits[0] + ':' + splits[1];
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


                        $scope.manageCategoryType = Number(data.categoryID);
                        $scope.approveScheduleButton = false;
                        $scope.clientApprovalButton = false;
                        $scope.manageFBMblog = data.fb_body;
                        $scope.manageFBDescrip = data.fb_descr;
                        $scope.manageFBTitle = data.fb_title;
                        $scope.manageBlogcontent = data.wp_content;
                        $scope.manageBlogTag = data.wp_tag;
                        $scope.manageBlogTitl = data.wp_title;
                        $scope.manageFBTlLink = data.fb_link;
                        $scope.manageFBIdesc = data.fb_descr;
                        $scope.manageTwtMblog = data.tw_body;
                        $scope.scheduleButtons = false;
                        $scope.approveScheduleButton = true;
                        $scope.clientApprovalButton = true;

                        if (valueFor == 'schedule') {
                            data.status = '0';
                            $scope.scheduleButtons = false;
                        };
                        if (valueFor == 'Reschedule') {
                            data.status = '0';
                            $scope.scheduleButtons = true;
                        }
                        if (valueFor == 'Decline') {
                            data.status = '5';

                        }

                        $scope.statusValue = data.status;


                        if (data.status == '5') {

                            $scope.showclientDeclineReason = true;
                            $scope.showClientapprove = true;
                            $scope.showClientdecline = true;
                            $scope.approveScheduleButton = true;
                            $scope.clientApprovalButton = true;

                        }
                        if (data.status == '0') {

                            if (data.hospitalID != null && data.hospitalID.split(',').length == 1 && Level == '90') {
                                $scope.clientHide = false;
                                $scope.manageClientValue = parseInt(data.hospitalID);
                            } else {
                                $scope.clientHide = true;
                            }

                        }



                    };

                }).error(function (data, status) {
                    $rootScope.slideDownAlertBox = 'slideDown';
                    growl.addErrorMessage('Something went wrong! Please try again later.', config);
                });


        };


        //Re-Send to Client for Approval status 9

        $scope.reSendtoClientApproval = function () {

            var dataValue = {
                'id': $scope.editId
            }


            var url = ReSend + '/' + $scope.editId;
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
            APIs.ReSend(dataValue, params, authorizationHeader)
                .success(function (data, status) {
                    if (status == 200 || status == 201) { 
                        $rootScope.slideDownAlertBox = 'slideDown';
                        growl.addSuccessMessage(data, config);
                    }
                }).error(function (data, status) {
                    $rootScope.slideDownAlertBox = 'slideDown';
                    growl.addErrorMessage('Something went wrong! Please try again later.', config);

                });

        };


        //Update Report       
        $scope.manageTwtpic = '';
        $scope.manageFBIpic = '';
        $scope.manageFBPic = '';
        $scope.manageBlogImg = '';
        $scope.AddManageContent = function () {

            var myDate = $scope.contentpostDate;
            $scope.contentpostDate2 = myDate + ' ' + $scope.ctrl.time2;

            $scope.submitted = true;
            var url = SaveContentTemplate;
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
            var auditorlistUpdate = {
                'id': $scope.clientId,
                'MemberID': id,
                'categoryID': $scope.manageCategoryType,
                'expireDate': $scope.manageExpryDate,
                'hospitalID': $scope.manageClient.toString(),
                'notes': $scope.manageNotes,
                'platform': $scope.radioValues.manage,
                'title': $scope.manageTitle,
                'scheduleDate': $scope.contentpostDate2
            }

            if ($scope.radioValues.manage == 'wp') {
                var blog = {
                    'name': $scope.manageBlogImg.filename,
                    'base64': $scope.manageBlogImg.base64,
                    'filesize': $scope.manageBlogImg.filesize,
                    'filetype': $scope.manageBlogImg.filetype
                }
                if ($scope.manageBlogImg) {
                    auditorlistUpdate.imageName = blog.name || $scope.imagename;
                    auditorlistUpdate.imageStream = blog.base64;
                }
                if ($scope.manageBlogImg == '' || $scope.imgLink == '') {
                    auditorlistUpdate.imageName = '';
                    auditorlistUpdate.imageStream = '';
                }
                if (!$scope.manageBlogImg || $scope.imgLink.length > 25) {
                    var splitedImg = $scope.imgLink.split(',');
                    auditorlistUpdate.imageStream = splitedImg[1];
                    auditorlistUpdate.imageName = $scope.imagename;
                    /*delete $scope.imgLink; */
                }
                auditorlistUpdate.wp_content = $scope.manageBlogcontent;
                auditorlistUpdate.wp_tag = $scope.manageBlogTag;
                auditorlistUpdate.wp_title = $scope.manageBlogTitl;
                auditorlistUpdate.wp_category = '';
            } else if ($scope.radioValues.manage == 'fb') {
                var fb = {
                    'name': $scope.manageFBPic.filename,
                    'base64': $scope.manageFBPic.base64,
                    'filesize': $scope.manageFBPic.filesize,
                    'filetype': $scope.manageFBPic.filetype
                }
                if ($scope.manageFBPic) {
                    auditorlistUpdate.imageName = fb.name || $scope.imagename;
                    auditorlistUpdate.imageStream = fb.base64;
                }
                if ($scope.manageFBPic == '' || $scope.imgLink == '') {
                    auditorlistUpdate.imageName = '';
                    auditorlistUpdate.imageStream = '';
                }
                if (!$scope.manageFBPic || $scope.imgLink.length > 25) {
                    var splitedImg = $scope.imgLink.split(',');
                    auditorlistUpdate.imageStream = splitedImg[1];
                    auditorlistUpdate.imageName = $scope.imagename;
                    /*delete $scope.imgLink; */
                }
                auditorlistUpdate.fb_body = $scope.manageFBMblog;
                auditorlistUpdate.fb_descr = $scope.manageFBDescrip;
                auditorlistUpdate.fb_title = $scope.manageFBTitle;
                auditorlistUpdate.fb_link = $scope.manageFBTlLink;
            } else if ($scope.radioValues.manage == 'fi') {
                var fbimage = {
                    'name': $scope.manageFBIpic.filename,
                    'base64': $scope.manageFBIpic.base64,
                    'filesize': $scope.manageFBIpic.filesize,
                    'filetype': $scope.manageFBIpic.filetype
                }
                if ($scope.manageFBIpic) {
                    auditorlistUpdate.imageName = fbimage.name || $scope.imagename;
                    auditorlistUpdate.imageStream = fbimage.base64;
                }
                if ($scope.manageFBIpic == '' || $scope.imgLink == '') {
                    auditorlistUpdate.imageName = '';
                    auditorlistUpdate.imageStream = '';
                }
                if (!$scope.manageFBIpic || $scope.imgLink.length > 25) {
                    var splitedImg = $scope.imgLink.split(',');
                    auditorlistUpdate.imageStream = splitedImg[1];
                    auditorlistUpdate.imageName = $scope.imagename;
                    /* delete $scope.imgLink;*/
                }
                auditorlistUpdate.fb_descr = $scope.manageFBIdesc;
            } else if ($scope.radioValues.manage == 'tw') {
                var twit = {
                    'name': $scope.manageTwtpic.filename,
                    'base64': $scope.manageTwtpic.base64,
                    'filesize': $scope.manageTwtpic.filesize,
                    'filetype': $scope.manageTwtpic.filetype
                }

                if ($scope.manageTwtpic) {
                    auditorlistUpdate.imageName = twit.name || $scope.imagename;
                    auditorlistUpdate.imageStream = twit.base64;
                }
                if ($scope.manageTwtpic == '' || $scope.imgLink == '') {
                    auditorlistUpdate.imageName = '';
                    auditorlistUpdate.imageStream = '';
                }
                if (!$scope.manageTwtpic || $scope.imgLink.length > 25) {
                    var splitedImg = $scope.imgLink.split(',');
                    auditorlistUpdate.imageStream = splitedImg[1];
                    auditorlistUpdate.imageName = $scope.imagename;
                    /* delete $scope.imgLink;   */
                }
                auditorlistUpdate.tw_body = $scope.manageTwtMblog;
            }
            if ($scope.manageCategoryType && $scope.manageExpryDate && $scope.manageClient && $scope.radioValues.manage && $scope.manageTitle) {
                APIs.SaveContentTemplate(auditorlistUpdate, params, authorizationHeader)
                    .success(function (data, status) {
                        if (status == 200) {
                            $scope.editForm = false;
                            $scope.failedContentForm = false;
                            $rootScope.slideDownAlertBox = 'slideDown';
                            growl.addSuccessMessage("Template updated successfully", config);
                            $scope.hideAddUserForm = false;
                            $scope.Refresh();
                            $scope.manageFBIpic = '';
                            $scope.manageFBPic = '';
                            $scope.manageTwtpic = '';
                        }
                    }).error(function (data, status) {
                        $rootScope.slideDownAlertBox = 'slideDown';
                        growl.addErrorMessage('Something went wrong! Please try again later.', config);
                    });
            } else {
                $rootScope.slideDownAlertBox = 'slideDown';
                growl.addErrorMessage('please fill the required fields!', config);
            }
        };


        $scope.SendClientApproval = function () {
            $scope.submitted = true;
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
            };

            var authorizationHeader = OAuth.getAuthorizationHeader(oAuthDatas.relam, oAuthDatas.msgParameters);
            var auditorlistUpdate = {
                'id': $scope.clientId,
                'MemberID': id,
                'categoryID': $scope.manageCategoryType,
                'expireDate': $scope.manageExpryDate,
                'hospitalID': $scope.manageClient.toString(),
                'notes': $scope.manageNotes,
                'platform': $scope.radioValues.manage,
                'title': $scope.manageTitle,
                'scheduleDate': $scope.contentpostDate
            };

            if ($scope.radioValues.manage == 'wp') {
                var blog = {
                    'name': $scope.manageBlogImg.filename,
                    'base64': $scope.manageBlogImg.base64,
                    'filesize': $scope.manageBlogImg.filesize,
                    'filetype': $scope.manageBlogImg.filetype
                }
                if ($scope.manageBlogImg) {
                    auditorlistUpdate.imageName = blog.name || $scope.imagename;
                    auditorlistUpdate.imageStream = blog.base64;
                }
                if ($scope.manageBlogImg == '' || $scope.imgLink == '') {
                    auditorlistUpdate.imageName = '';
                    auditorlistUpdate.imageStream = '';
                }
                if (!$scope.manageBlogImg || $scope.imgLink.length > 25) {
                    var splitedImg = $scope.imgLink.split(',');
                    auditorlistUpdate.imageStream = splitedImg[1];
                    auditorlistUpdate.imageName = $scope.imagename;
                    delete $scope.imgLink;
                }

                auditorlistUpdate.wp_content = $scope.manageBlogcontent;
                auditorlistUpdate.wp_tag = $scope.manageBlogTag;
                auditorlistUpdate.wp_title = $scope.manageBlogTitl;
                auditorlistUpdate.wp_category = '';
            } else if ($scope.radioValues.manage == 'fb') {
                var fb = {
                    'name': $scope.manageFBPic.filename,
                    'base64': $scope.manageFBPic.base64,
                    'filesize': $scope.manageFBPic.filesize,
                    'filetype': $scope.manageFBPic.filetype
                }
                if ($scope.manageFBPic) {
                    auditorlistUpdate.imageName = fb.name || $scope.imagename;
                    auditorlistUpdate.imageStream = fb.base64;
                }
                if ($scope.manageFBPic == '' || $scope.imgLink == '') {
                    auditorlistUpdate.imageName = '';
                    auditorlistUpdate.imageStream = '';
                }
                if (!$scope.manageFBPic || $scope.imgLink.length > 25) {
                    var splitedImg = $scope.imgLink.split(',');
                    auditorlistUpdate.imageStream = splitedImg[1];
                    auditorlistUpdate.imageName = $scope.imagename;
                    delete $scope.imgLink;
                }

                auditorlistUpdate.fb_body = $scope.manageFBMblog;
                auditorlistUpdate.fb_descr = $scope.manageFBDescrip;
                auditorlistUpdate.fb_title = $scope.manageFBTitle;
                auditorlistUpdate.fb_link = $scope.manageFBTlLink;
            } else if ($scope.radioValues.manage == 'fi') {
                var fbimage = {
                    'name': $scope.manageFBIpic.filename,
                    'base64': $scope.manageFBIpic.base64,
                    'filesize': $scope.manageFBIpic.filesize,
                    'filetype': $scope.manageFBIpic.filetype
                }

                if ($scope.manageFBIpic) {
                    auditorlistUpdate.imageName = fbimage.name || $scope.imagename;
                    auditorlistUpdate.imageStream = fbimage.base64;
                }
                if ($scope.manageFBIpic == '' || $scope.imgLink == '') {
                    auditorlistUpdate.imageName = '';
                    auditorlistUpdate.imageStream = '';
                }
                if (!$scope.manageFBIpic || $scope.imgLink.length > 25) {
                    var splitedImg = $scope.imgLink.split(',');
                    auditorlistUpdate.imageStream = splitedImg[1];
                    auditorlistUpdate.imageName = $scope.imagename;
                    delete $scope.imgLink;
                }

                auditorlistUpdate.fb_descr = $scope.manageFBIdesc;
            } else if ($scope.radioValues.manage == 'tw') {
                var twit = {
                    'name': $scope.manageTwtpic.filename,
                    'base64': $scope.manageTwtpic.base64,
                    'filesize': $scope.manageTwtpic.filesize,
                    'filetype': $scope.manageTwtpic.filetype
                }
                if ($scope.manageTwtpic) {
                    auditorlistUpdate.imageName = twit.name || $scope.imagename;
                    auditorlistUpdate.imageStream = twit.base64;
                }
                if ($scope.manageTwtpic == '' || $scope.imgLink == '') {
                    auditorlistUpdate.imageName = '';
                    auditorlistUpdate.imageStream = '';
                }
                if (!$scope.manageTwtpic || $scope.imgLink.length > 25) {
                    var splitedImg = $scope.imgLink.split(',');
                    auditorlistUpdate.imageStream = splitedImg[1];
                    auditorlistUpdate.imageName = $scope.imagename;
                    delete $scope.imgLink;
                }

                auditorlistUpdate.tw_body = $scope.manageTwtMblog;
            }
            APIs.SendClientApproval(auditorlistUpdate, params, authorizationHeader)
                .success(function (data, status) {
                    if (status == 200) {
                        $scope.editForm = false;
                        $rootScope.slideDownAlertBox = 'slideDown';
                        growl.addSuccessMessage(data, config);
                        $scope.hideAddUserForm = false;
                        $scope.Refresh();
                        $scope.manageFBIpic = '';
                        $scope.manageFBPic = '';
                        $scope.manageTwtpic = '';
                    }
                }).error(function (data, status) {
                    $rootScope.slideDownAlertBox = 'slideDown';
                    growl.addErrorMessage('Something went wrong! Please try again later.', config);
                });


        };

        $scope.ScheduleAndApproval = function () {
            var myDate = $scope.contentpostDate;
            $scope.contentpostDate2 = myDate + ' ' + $scope.ctrl.time2;

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
            var auditorlistUpdate = {
                'id': $scope.clientId,
                'MemberID': id,
                'categoryID': $scope.manageCategoryType,
                'expireDate': $scope.manageExpryDate,
                'hospitalID': $scope.manageClient.toString(),
                'notes': $scope.manageNotes,
                'platform': $scope.radioValues.manage,
                'title': $scope.manageTitle,
                'scheduleDate': $scope.contentpostDate2

            }
            if ($scope.radioValues.manage == 'wp') {
                var blog = {
                    'name': $scope.manageBlogImg.filename,
                    'base64': $scope.manageBlogImg.base64,
                    'filesize': $scope.manageBlogImg.filesize,
                    'filetype': $scope.manageBlogImg.filetype
                }
                if ($scope.manageBlogImg) {
                    auditorlistUpdate.imageName = blog.name || $scope.imagename;
                    auditorlistUpdate.imageStream = blog.base64;
                }
                if ($scope.manageBlogImg == '' || $scope.imgLink == '') {
                    auditorlistUpdate.imageName = '';
                    auditorlistUpdate.imageStream = '';
                }
                if (!$scope.manageBlogImg || $scope.imgLink.length > 25) {
                    var splitedImg = $scope.imgLink.split(',');
                    auditorlistUpdate.imageStream = splitedImg[1];
                    auditorlistUpdate.imageName = $scope.imagename;
                    delete $scope.imgLink;
                }

                auditorlistUpdate.wp_content = $scope.manageBlogcontent;
                auditorlistUpdate.wp_tag = $scope.manageBlogTag;
                auditorlistUpdate.wp_title = $scope.manageBlogTitl;
                auditorlistUpdate.wp_category = '';
            } else if ($scope.radioValues.manage == 'fb') {
                var fb = {
                    'name': $scope.manageFBPic.filename,
                    'base64': $scope.manageFBPic.base64,
                    'filesize': $scope.manageFBPic.filesize,
                    'filetype': $scope.manageFBPic.filetype
                }
                if ($scope.manageFBPic) {
                    auditorlistUpdate.imageName = fb.name || $scope.imagename;
                    auditorlistUpdate.imageStream = fb.base64;
                }
                if ($scope.manageFBPic == '' || $scope.imgLink == '') {
                    auditorlistUpdate.imageName = '';
                    auditorlistUpdate.imageStream = '';
                }
                if (!$scope.manageFBPic || $scope.imgLink.length > 25) {
                    var splitedImg = $scope.imgLink.split(',');
                    auditorlistUpdate.imageStream = splitedImg[1];
                    auditorlistUpdate.imageName = $scope.imagename;
                    delete $scope.imgLink;
                }

                auditorlistUpdate.fb_body = $scope.manageFBMblog;
                auditorlistUpdate.fb_descr = $scope.manageFBDescrip;
                auditorlistUpdate.fb_title = $scope.manageFBTitle;
                auditorlistUpdate.fb_link = $scope.manageFBTlLink;
            } else if ($scope.radioValues.manage == 'fi') {
                var fbimage = {
                    'name': $scope.manageFBIpic.filename,
                    'base64': $scope.manageFBIpic.base64,
                    'filesize': $scope.manageFBIpic.filesize,
                    'filetype': $scope.manageFBIpic.filetype
                }

                if ($scope.manageFBIpic) {
                    auditorlistUpdate.imageName = fbimage.name || $scope.imagename;
                    auditorlistUpdate.imageStream = fbimage.base64;
                }
                if ($scope.manageFBIpic == '' || $scope.imgLink == '') {
                    auditorlistUpdate.imageName = '';
                    auditorlistUpdate.imageStream = '';
                }
                if (!$scope.manageFBIpic || $scope.imgLink.length > 25) {
                    var splitedImg = $scope.imgLink.split(',');
                    auditorlistUpdate.imageStream = splitedImg[1];
                    auditorlistUpdate.imageName = $scope.imagename;
                    delete $scope.imgLink;
                }

                auditorlistUpdate.fb_descr = $scope.manageFBIdesc;
            } else if ($scope.radioValues.manage == 'tw') {
                var twit = {
                    'name': $scope.manageTwtpic.filename,
                    'base64': $scope.manageTwtpic.base64,
                    'filesize': $scope.manageTwtpic.filesize,
                    'filetype': $scope.manageTwtpic.filetype
                }
                if ($scope.manageTwtpic) {
                    auditorlistUpdate.imageName = twit.name || $scope.imagename;
                    auditorlistUpdate.imageStream = twit.base64;
                }
                if ($scope.manageTwtpic == '' || $scope.imgLink == '') {
                    auditorlistUpdate.imageName = '';
                    auditorlistUpdate.imageStream = '';
                }
                if (!$scope.manageTwtpic || $scope.imgLink.length > 25) {
                    var splitedImg = $scope.imgLink.split(',');
                    auditorlistUpdate.imageStream = splitedImg[1];
                    auditorlistUpdate.imageName = $scope.imagename;
                    delete $scope.imgLink;
                }

                auditorlistUpdate.tw_body = $scope.manageTwtMblog;
            }
            if ($scope.manageCategoryType && $scope.manageExpryDate && $scope.manageClient && $scope.radioValues.manage && $scope.manageTitle && $scope.contentpostDate && $scope.ctrl.time2) {
                APIs.ScheduleAndApproval(auditorlistUpdate, params, authorizationHeader)
                    .success(function (data, status) {
                        if (status == 200) {
                            $scope.editForm = false;
                            $rootScope.slideDownAlertBox = 'slideDown';
                            growl.addSuccessMessage(data, config);
                            $scope.hideAddUserForm = false;
                            $scope.Refresh();
                            $scope.manageFBIpic = '';
                            $scope.manageFBPic = '';
                            $scope.manageTwtpic = '';
                        }
                    }).error(function (data, status) {
                        $rootScope.slideDownAlertBox = 'slideDown';
                        growl.addErrorMessage('Something went wrong! Please try again later.', config);
                    });
            }

        };

        // Client Approve for status 5

        $scope.fnStatus5Approve = function () {

            var dataValue = {
                'memberID': parseInt(id),
                'id': $scope.editId
            }

            var url = ApproveContent;
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
            APIs.ApproveContent(dataValue, params, authorizationHeader)
                .success(function (data, status) {
                    if (status == 200 || status == 201) { 
                        $rootScope.slideDownAlertBox = 'slideDown';
                        growl.addSuccessMessage(data, config);
                    }
                }).error(function (data, status) {
                    $rootScope.slideDownAlertBox = 'slideDown';
                    growl.addErrorMessage('Something went wrong! Please try again later.', config);

                });


        };

        // Client Decline for status 5

        $scope.fnStatus5Decline = function () {

            var dataValue = {
                'declineReason': $scope.satus5declineReason,
                'id': $scope.editId
            }
            var url = DeclineContentSave;
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
            APIs.DeclineContentSave(dataValue, params, authorizationHeader)
                .success(function (data, status) {
                    if (status == 200 || status == 201) { 
                        $rootScope.slideDownAlertBox = 'slideDown';
                        growl.addSuccessMessage(data, config);
                    }
                }).error(function (data, status) {
                    $rootScope.slideDownAlertBox = 'slideDown';
                    growl.addErrorMessage('Something went wrong! Please try again later.', config);

                });


        }

        $scope.fnReSchedule = function () {

            var DataToBeSent = {
                'id': $scope.scheduleId,
                'MemberID': parseInt(id),
                'scheduleDate': $scope.contentpostDate + ' ' + $scope.ctrl.time2

            };


            var url = ReScheduleContent;
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

            APIs.ReScheduleContent(DataToBeSent, params, authorizationHeader)
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

        };


        $scope.SaveContentTemplate = function () {

            $scope.showSaveButton = false; 

            $scope.submitted = true;
            var url = SaveContentTemplate;
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


            var auditorlistUpdate = {
                'id': $scope.clientId,
                'MemberID': id,
                'categoryID': $scope.manageCategoryType,
                'expireDate': $scope.manageExpryDate,
                'hospitalID': $scope.manageClient.toString(),
                'notes': $scope.manageNotes,
                'platform': $scope.radioValues.manage,
                'title': $scope.manageTitle,
                'scheduleDate': $scope.contentpostDate + ' ' + $scope.ctrl.time2
            }

            if ($scope.radioValues.manage == 'wp') {
                var blog = {
                    'name': $scope.manageBlogImg.filename,
                    'base64': $scope.manageBlogImg.base64,
                    'filesize': $scope.manageBlogImg.filesize,
                    'filetype': $scope.manageBlogImg.filetype
                }
                if ($scope.manageBlogImg) {
                    auditorlistUpdate.imageName = blog.name || $scope.imagename;
                    auditorlistUpdate.imageStream = blog.base64;
                }
                if ($scope.manageBlogImg == '' || $scope.imgLink == '') {
                    auditorlistUpdate.imageName = '';
                    auditorlistUpdate.imageStream = '';
                }
                if (!$scope.manageBlogImg || $scope.imgLink.length > 25) {
                    var splitedImg = $scope.imgLink.split(',');
                    auditorlistUpdate.imageStream = splitedImg[1];
                    auditorlistUpdate.imageName = $scope.imagename;
                    /*delete $scope.imgLink;  */
                }

                auditorlistUpdate.wp_content = $scope.manageBlogcontent;
                auditorlistUpdate.wp_tag = $scope.manageBlogTag;
                auditorlistUpdate.wp_title = $scope.manageBlogTitl;
                auditorlistUpdate.wp_category = '';
            } else if ($scope.radioValues.manage == 'fb') {
                var fb = {
                    'name': $scope.manageFBPic.filename,
                    'base64': $scope.manageFBPic.base64,
                    'filesize': $scope.manageFBPic.filesize,
                    'filetype': $scope.manageFBPic.filetype
                }
                if ($scope.manageFBPic) {
                    auditorlistUpdate.imageName = fb.name || $scope.imagename;
                    auditorlistUpdate.imageStream = fb.base64;
                }
                if ($scope.manageFBPic == '' || $scope.imgLink == '') {
                    auditorlistUpdate.imageName = '';
                    auditorlistUpdate.imageStream = '';
                }
                if (!$scope.manageFBPic || $scope.imgLink.length > 25) {
                    var splitedImg = $scope.imgLink.split(',');
                    auditorlistUpdate.imageStream = splitedImg[1];
                    auditorlistUpdate.imageName = $scope.imagename;
                    /*  delete $scope.imgLink;  */
                }

                auditorlistUpdate.fb_body = $scope.manageFBMblog;
                auditorlistUpdate.fb_descr = $scope.manageFBDescrip;
                auditorlistUpdate.fb_title = $scope.manageFBTitle;
                auditorlistUpdate.fb_link = $scope.manageFBTlLink;
            } else if ($scope.radioValues.manage == 'fi') {
                var fbimage = {
                    'name': $scope.manageFBIpic.filename,
                    'base64': $scope.manageFBIpic.base64,
                    'filesize': $scope.manageFBIpic.filesize,
                    'filetype': $scope.manageFBIpic.filetype
                }

                if ($scope.manageFBIpic) {
                    auditorlistUpdate.imageName = fbimage.name || $scope.imagename;
                    auditorlistUpdate.imageStream = fbimage.base64;
                }
                if ($scope.manageFBIpic == '' || $scope.imgLink == '') {
                    auditorlistUpdate.imageName = '';
                    auditorlistUpdate.imageStream = '';
                }
                if (!$scope.manageFBIpic || $scope.imgLink.length > 25) {
                    var splitedImg = $scope.imgLink.split(',');
                    auditorlistUpdate.imageStream = splitedImg[1];
                    auditorlistUpdate.imageName = $scope.imagename;
                    /* delete $scope.imgLink; */
                }

                auditorlistUpdate.fb_descr = $scope.manageFBIdesc;
            } else if ($scope.radioValues.manage == 'tw') {
                var twit = {
                    'name': $scope.manageTwtpic.filename,
                    'base64': $scope.manageTwtpic.base64,
                    'filesize': $scope.manageTwtpic.filesize,
                    'filetype': $scope.manageTwtpic.filetype
                }
                if ($scope.manageTwtpic) {
                    auditorlistUpdate.imageName = twit.name || $scope.imagename;
                    auditorlistUpdate.imageStream = twit.base64;
                }
                if ($scope.manageTwtpic == '' || $scope.imgLink == '') {
                    auditorlistUpdate.imageName = '';
                    auditorlistUpdate.imageStream = '';
                }
                if (!$scope.manageTwtpic || $scope.imgLink.length > 25) {
                    var splitedImg = $scope.imgLink.split(',');
                    auditorlistUpdate.imageStream = splitedImg[1];
                    auditorlistUpdate.imageName = $scope.imagename;
                    /* delete $scope.imgLink; */
                }

                auditorlistUpdate.tw_body = $scope.manageTwtMblog;
            }
            /*   if ($scope.manageCategoryType && $scope.manageExpryDate && $scope.manageClient && $scope.manageNotes && $scope.radioValues.manage && $scope.manageTitle) {*/
            APIs.SaveContentTemplate(auditorlistUpdate, params, authorizationHeader)
                .success(function (data, status) {
                    if (status == 200) {
                        $rootScope.slideDownAlertBox = 'slideDown';
                        growl.addSuccessMessage(data, config);
                        $scope.hideAddUserForm = false;
                        $scope.Refresh();
                        $scope.manageFBIpic = '';
                        $scope.manageFBPic = '';
                        $scope.manageTwtpic = '';

                    }
                }).error(function (data, status) {
                    $rootScope.slideDownAlertBox = 'slideDown';
                    growl.addErrorMessage('Something went wrong! Please try again later.', config);

                });
            /*   }*/
        };

        //Schedule Functon
        $scope.scheduleButton1 = function () {
            $scope.showSaveButton = false; 
            $scope.submitted = true;
            var url = ScheduledContent;
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

            if ($scope.manageClientValue == '') {

                var split1 = $scope.manageClient.toString().split(',')[0];
                $scope.ClientValue = split1;
            } else {
                $scope.ClientValue = $scope.manageClientValue;
            }
            var auditorlistUpdate = {
                'id': 0,
                'MemberID': id,
                'categoryID': $scope.manageCategoryType,
                'expireDate': $scope.manageExpryDate,

                'hospitalID': $scope.ClientValue,
                'status': 9,
                'notes': $scope.manageNotes,
                'platform': $scope.radioValues.manage,

                'title': $scope.manageTitle,
                'scheduleDate': $scope.contentpostDate + ' ' + $scope.ctrl.time2
            }

            if ($scope.radioValues.manage == 'wp') {
                var blog = {
                    'name': $scope.manageBlogImg.filename,
                    'base64': $scope.manageBlogImg.base64,
                    'filesize': $scope.manageBlogImg.filesize,
                    'filetype': $scope.manageBlogImg.filetype
                }
                if ($scope.manageBlogImg) {
                    auditorlistUpdate.imageName = blog.name || $scope.imagename;
                    auditorlistUpdate.imageStream = blog.base64;
                }
                if ($scope.manageBlogImg == '' || $scope.imgLink == '') {
                    auditorlistUpdate.imageName = '';
                    auditorlistUpdate.imageStream = '';
                }
                if (!$scope.manageBlogImg || $scope.imgLink.length > 25) {
                    var splitedImg = $scope.imgLink.split(',');
                    auditorlistUpdate.imageStream = splitedImg[1];
                    auditorlistUpdate.imageName = $scope.imagename;
                    delete $scope.imgLink;
                }

                auditorlistUpdate.wp_content = $scope.manageBlogcontent;
                auditorlistUpdate.wp_tag = $scope.manageBlogTag;
                auditorlistUpdate.wp_title = $scope.manageBlogTitl;
                auditorlistUpdate.wp_category = '';
            } else if ($scope.radioValues.manage == 'fb') {
                var fb = {
                    'name': $scope.manageFBPic.filename,
                    'base64': $scope.manageFBPic.base64,
                    'filesize': $scope.manageFBPic.filesize,
                    'filetype': $scope.manageFBPic.filetype
                }
                if ($scope.manageFBPic) {
                    auditorlistUpdate.imageName = fb.name || $scope.imagename;
                    auditorlistUpdate.imageStream = fb.base64;
                }
                if ($scope.manageFBPic == '' || $scope.imgLink == '') {
                    auditorlistUpdate.imageName = '';
                    auditorlistUpdate.imageStream = '';
                }
                if (!$scope.manageFBPic || $scope.imgLink.length > 25) {
                    var splitedImg = $scope.imgLink.split(',');
                    auditorlistUpdate.imageStream = splitedImg[1];
                    auditorlistUpdate.imageName = $scope.imagename;
                    delete $scope.imgLink;
                }

                auditorlistUpdate.fb_body = $scope.manageFBMblog;
                auditorlistUpdate.fb_descr = $scope.manageFBDescrip;
                auditorlistUpdate.fb_title = $scope.manageFBTitle;
                auditorlistUpdate.fb_link = $scope.manageFBTlLink;
            } else if ($scope.radioValues.manage == 'fi') {
                var fbimage = {
                    'name': $scope.manageFBIpic.filename,
                    'base64': $scope.manageFBIpic.base64,
                    'filesize': $scope.manageFBIpic.filesize,
                    'filetype': $scope.manageFBIpic.filetype
                }

                if ($scope.manageFBIpic) {
                    auditorlistUpdate.imageName = fbimage.name || $scope.imagename;
                    auditorlistUpdate.imageStream = fbimage.base64;
                }
                if ($scope.manageFBIpic == '' || $scope.imgLink == '') {
                    auditorlistUpdate.imageName = '';
                    auditorlistUpdate.imageStream = '';
                }
                if (!$scope.manageFBIpic || $scope.imgLink.length > 25) {
                    var splitedImg = $scope.imgLink.split(',');
                    auditorlistUpdate.imageStream = splitedImg[1];
                    auditorlistUpdate.imageName = $scope.imagename;
                    delete $scope.imgLink;
                }

                auditorlistUpdate.fb_descr = $scope.manageFBIdesc;
            } else if ($scope.radioValues.manage == 'tw') {
                var twit = {
                    'name': $scope.manageTwtpic.filename,
                    'base64': $scope.manageTwtpic.base64,
                    'filesize': $scope.manageTwtpic.filesize,
                    'filetype': $scope.manageTwtpic.filetype
                }
                if ($scope.manageTwtpic) {
                    auditorlistUpdate.imageName = twit.name || $scope.imagename;
                    auditorlistUpdate.imageStream = twit.base64;
                }
                if ($scope.manageTwtpic == '' || $scope.imgLink == '') {
                    auditorlistUpdate.imageName = '';
                    auditorlistUpdate.imageStream = '';
                }
                if (!$scope.manageTwtpic || $scope.imgLink.length > 25) {
                    var splitedImg = $scope.imgLink.split(',');
                    auditorlistUpdate.imageStream = splitedImg[1];
                    auditorlistUpdate.imageName = $scope.imagename;
                    delete $scope.imgLink;
                }

                auditorlistUpdate.tw_body = $scope.manageTwtMblog;
            }
            APIs.ScheduledContent(auditorlistUpdate, params, authorizationHeader)
                .success(function (data, status) {
                    if (status == 200) {
                        $rootScope.slideDownAlertBox = 'slideDown';
                        growl.addSuccessMessage(data, config);
                        $scope.hideAddUserForm = false;
                        /*$scope.Refresh();*/
                        $scope.manageFBIpic = '';
                        $scope.manageFBPic = '';
                        $scope.manageTwtpic = '';
                    }
                }).error(function (data, status) {
                    $rootScope.slideDownAlertBox = 'slideDown';
                    growl.addErrorMessage('Something went wrong! Please try again later.', config);

                });

        };


        //Schedule Button
        $scope.scheduleButton = function () {

            if ($scope.checkboxModel.value2 == 'YES') {
                $scope.SaveContentTemplate();
                $scope.scheduleButton1();
                $scope.checkboxModel.value2 = 'NO';
            } else if ($scope.checkboxModel.value2 != 'YES') {
                $scope.scheduleButton1();

            }

        };

        //Remove image Singlecontent
        $scope.removefbsingle = function () {
            $scope.imagename = '';
            $scope.imgLink = '';
            document.getElementById('fbsingle').src = '';
        }
        $scope.removefacebkImg = function () {
            $scope.imagename = '';
            $scope.imgLink = '';
            document.getElementById('facebkImg').src = '';
        }
        $scope.removesingletwt = function () {
            $scope.imagename = '';
            $scope.imgLink = '';
            document.getElementById('singletwt').src = '';
        }
        $scope.removesingleblg = function () {
            $scope.imagename = '';
            $scope.imgLink = '';
            document.getElementById('singleblg').src = '';
        }



        //Sorting
        $scope.failedContentSort = function (asc, header) {

            if (asc) {
                $scope.failedContentDatas.sort(predicatByAsc(header));

            }
            if (!asc) {
                $scope.failedContentDatas.sort(predicatByDes(header));

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


            return Math.ceil($scope.failedContentDatas.length / $scope.itemsPerPage) - 1;


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