'use strict';

angular.module('chsApp')
    .controller('manageContentCtrl', function ($scope, $http, $filter, $rootScope, $routeParams, $location, $cookies, APIs, growl) {
        $scope.radioValues = {};
        $rootScope.bodylayout = '';
        $rootScope.showSideBar = true;
        $scope.submitted = false;
        $scope.manageContentDatas = [];
        /*$scope.injectedObject={};*/
        $scope.injectedObject = {
            'hour': '00',
            'mins': '00'
        };
        $scope.clientApprovalBtn = false;
        $scope.approveScheduleBtn = false;
        $scope.approveScheduleButton = true;
        $scope.clientApprovalButton = true;
        $rootScope.slideDownAlertBox = '';
        var config = {};

        //Reset Url for Single content     
        $scope.resetURL = function () {
            $scope.shortedUrl = '';
            $scope.longUrl = '';
        };

        //Short Url for Single content    
        $scope.shortURL = function (longUrl) {
            APIs.shortenURL(longUrl).success(function (data) {
                $scope.shortedUrl = data;

            });
        };


        $('#timePicker input[type=text]').addClass('form-control');
        $('#timePicker div').addClass('timepick');


        /*Global Var*/
        $scope.showclientDeclineReason = false;
        $scope.packageForm = false;
        $scope.EnterPriseAdmin = true;
        $scope.Supervisor = true;
        $scope.Client = true;
        $scope.FreelanceWriter = true;
        $scope.BallyWhoAdmin = true;
        $scope.showHospitalField = false;
        $scope.showSaveButton = true;
        $scope.editForm = false;
        $scope.hideAddUserForm = false;
        $scope.hideEditForm = false;
        var consumer_key = window.localStorage['consumer_key'];
        var consumerSecret = window.localStorage['consumerSecret'];
        var id = window.localStorage['id'];
        var memberID = window.localStorage['id'];
        var Level = window.localStorage['Level'];
        $scope.levelData = Level;

        $scope.ShowAdminForm = false;
        if (Level == 30 || Level == 90 || Level == 50) {
            $scope.ShowAdminForm = true;
        };
        /*end of Global Var*/
        if (Level == 90) {
            $scope.showAdminapprove = true;
            $scope.showClientapprove = true;
        };
        $scope.date = new Date();

        $scope.gridview = true;
        if (consumerSecret != undefined || consumer_key != undefined) {
            if (consumer_key.length == 0 || consumerSecret.length == 0) {

                window.location = '/#/login';
                return;

            }
        } else {
            window.location = '/#/login';
            return;
        }
        //Create new form
        $scope.showAddForm = function () {
            $scope.shortedUrl = '';
            $scope.longUrl = '';
            $scope.approveScheduleButton = false;
            $scope.clientApprovalButton = false;
            $scope.setscheduleDateForm = false;
            $scope.onlyforAdd = true;
            $scope.statusValue = undefined;
            $scope.submitted = false;
            $scope.writingtask = false;
            $scope.submitted = false;
            $scope.Packages = false;
            $scope.hideEditForm = false;
            $scope.AddUserForm = true;
            $scope.showSaveButton = true;
            $scope.hideNavBar = true;
            $scope.gridview = false;
            $scope.manageTitle = '';
            $scope.manageCategoryType = '';
            $scope.radioValues.manage = '';
            $scope.radioValues.manage = 'fb';
            $scope.manageClient = '';
            //  $scope.manageExpryDate = '';

            var now = moment(new Date()).format("MM/DD/YYYY");
            var new_date = moment(now, "MM/DD/YYYY").add(14, 'days');

            $scope.manageExpryDate = moment(new_date).format("MM/DD/YYYY")


            $scope.manageNotes = '';
            $scope.manageFBMblog = '';
            $scope.manageFBTitle = '';
            $scope.auditFBTlLink = '';
            $scope.manageFBDescrip = '';
            $scope.manageFBPic = '';
            $scope.manageFBIdesc = '';
            $scope.manageFBIpic = '';
            $scope.manageTwtMblog = '';
            $scope.manageTwtpic = '';
            $scope.manageBlogTitl = '';
            $scope.manageBlogcontent = '';
            $scope.manageBlogTag = '';
            $scope.manageBlogImg = '';
            $scope.contentpostDate = '';
            var new_date1 = moment(now, "MM/DD/YYYY").add(7, 'days');
            $scope.contentpostDate = moment(new_date1).format("MM/DD/YYYY")
            $scope.manageFBTlLink = '';
            $scope.imgLink = '';
            $scope.removefbsingle();
            $scope.removefacebkImg();
            $scope.removesingletwt();
            $scope.removesingleblg();
            $scope.injectedObject = {
                'hour': '08',
                'mins': '00'
            };
        }

        //Cancel Form                 
        $scope.cancelUser = function () {
            $scope.setscheduleDateForm = false;
            $scope.writingtask = false;
            $scope.hideEditForm = false;
            $scope.AddUserForm = false;
            $scope.gridview = true;
            $scope.Packages = false;
            $scope.hideNavBar = false;
            $scope.editForm = false;
            if ($routeParams.id || $routeParams.status) {
                window.location = '/#/Dashboard';
            }

        };


        //Decline Reason      
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
            }
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
                });
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

        //Package Admin Approval    
        $scope.packSendAdminApproval = function () {

            var id = {
                'id': $scope.editId
            };
            var url = AdminApprove + '/' + $scope.editId;
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
                });


        };

        //Package Client Approval     
        $scope.SendpackClientApproval = function () {
            var id = {
                'id': $scope.editId
            };
            var url = ClientApprove + '/' + $scope.editId;
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


            APIs.ClientApprove(id, params, authorizationHeader)
                .success(function (data, status) {
                    if (status == 200) {
                        $rootScope.slideDownAlertBox = 'slideDown';
                        growl.addSuccessMessage(data, config);
                    }
                }).error(function (data, status) {
                    $rootScope.slideDownAlertBox = 'slideDown';
                    growl.addErrorMessage('Something went wrong! Please try again later.', config);
                });

        };


        //Delete User
        $scope.fnDelete = function (Permission, idValue) {

            if (Permission.lnkDelete == true) {
                var id = {
                    'id': idValue 
                };
                var url = DeleteContent;
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
                var Delete1 = confirm('Are You sure you want to delete?');
                if (Delete1 == true) {
                    APIs.DeleteContent(id, params, authorizationHeader)
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

            if (Permission.lnkDeletePack == true) {
                var id = {
                    'id': idValue 
                };
                var url = DeleteWriterPackage + '/' + idValue ;
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
                        });
                }

            };

            if (Permission.lnkDeleteTask == true) {
                var id = {
                    'id': idValue 
                };
                var url = DeleteTask + '/' + idValue ;
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

                var Delete1 = confirm('Are you sure you want to delete?');
                if (Delete1 == true) {
                    APIs.DeleteTask(id, params, authorizationHeader)
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

        }

        //Reschdule Content
        $scope.fnReSchedule = function () {
            $scope.contentpostDate2 = $scope.contentpostDate + ' ' + $scope.ctrl.time2;
            var DataToBeSent = {
                'id': $scope.scheduleId,
                'MemberID': parseInt(id),
                'scheduleDate': $scope.contentpostDate2

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
                        $scope.cancelUser();
                    }
                }).error(function (data, status) {
                    $rootScope.slideDownAlertBox = 'slideDown';
                    growl.addErrorMessage('Something went wrong! Please try again later.', config);
                });

        };


        //Archive Content    
        $scope.fnArchive = function (Permission, idValue) {

            if (Permission.lnkArchive == true) {

                var id = {
                    'id': parseInt(idValue) 
                };
                var url = ArchieveContent1;
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

                APIs.ArchieveContent1(id, params, authorizationHeader)
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

            if (Permission.lnkArchivePack == true) {

                var id = {
                    'id': parseInt(idValue) 
                };
                var url = Archived + '/' + idValue 
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
                    });

            };


        };


        //Approve Content    
        $scope.fnApprove = function (idValue) {
            var id = {
                'id': idValue,
                'MemberID': id
            };
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
            }
            var authorizationHeader = OAuth.getAuthorizationHeader(oAuthDatas.relam, oAuthDatas.msgParameters);

            APIs.ApproveContent(id, params, authorizationHeader)
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

        //Cancel Content    
        $scope.fnCancel = function (idValue) {
            var id = {
                'id': idValue 
            };
            var url = CancelContent;
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

            APIs.CancelContent(id, params, authorizationHeader)
                .success(function (data, status) {
                    if (status == 200) {
                        $rootScope.slideDownAlertBox = 'slideDown';
                        growl.addSuccessMessage(data, config);
                        $scope.Refresh();
                        $scope.hideNavBar = false;
                        $scope.showSaveButton = false;
                        $scope.AddUserForm = false;
                        $scope.gridview = true;
                    }
                }).error(function (data, status) {
                    $rootScope.slideDownAlertBox = 'slideDown';
                    growl.addErrorMessage('Something went wrong! Please try again later.', config);
                });

        };



        //Decline Client   

        $scope.ClientDecline = function () {

            var id = {
                'id': $scope.packageId,
                'reason': $scope.clientdeclineReason
            };
            var url = ClientDecline;
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


            APIs.ClientDecline(id, params, authorizationHeader)
                .success(function (data, status) {
                    if (status == 200) {
                        $rootScope.slideDownAlertBox = 'slideDown';
                        growl.addSuccessMessage(data, config); 
                    }
                }).error(function (data, status) {
                    $rootScope.slideDownAlertBox = 'slideDown';
                    growl.addErrorMessage('Something went wrong! Please try again later.', config);
                });
        }


        $scope.ClientApprove = function () {
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
            }
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
                });
        }


        //Export As PDF  
        $scope.fnExportsAsPDF = function (idValue, PlatformName) {


            if (PlatformName == 'Twitter Pack' || PlatformName == 'Facebook Pack' || PlatformName == 'Daily Pack' || PlatformName == 'Package') {
                PlatformName = 'package';

            } else if (PlatformName == 'Facebook' || PlatformName == 'Twitter' || PlatformName == 'Blog') {
                PlatformName = 'content';
            }

            var id = {
                'id': idValue,

                'platform': PlatformName

            };
            var url = ExportAsPDF;
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

            APIs.ExportAsPDF(id, params, authorizationHeader)
                .success(function (data, status) {
                    if (status == 200) {
                        $rootScope.slideDownAlertBox = 'slideDown';
                        growl.addSuccessMessage(data, config);
                        window.open(pdfUrl + data, '_blank'); 

                    }
                }).error(function (data, status) {
                    $rootScope.slideDownAlertBox = 'slideDown';
                    growl.addErrorMessage('Something went wrong! Please try again later.', config);
                });

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

        //Remove image Writing Task
        $scope.removetaskfb = function () {
            $scope.imagename = '';
            $scope.TaskimgLink = '';
            document.getElementById('taskfb').src = '';
        }
        $scope.removetasktwit = function () {
            $scope.imagename = '';
            $scope.TaskimgLink = '';
            document.getElementById('tasktwit').src = '';
        }
        $scope.removetaskblg = function () {
            $scope.imagename = '';
            $scope.TaskimgLink = '';
            document.getElementById('taskblg').src = '';
        }

        //Remove image Packages
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




        // Export As Word          
        $scope.fnExportsAsWord = function (idValue, PlatformName) {


            if (PlatformName == 'Twitter Pack' || PlatformName == 'Facebook Pack' || PlatformName == 'Daily Pack' || PlatformName == 'Package') {
                PlatformName = 'package';

            } else if (PlatformName == 'Facebook' || PlatformName == 'Twitter' || PlatformName == 'Blog') {
                PlatformName = 'content';
            }

            var id = {
                'id': idValue,

                'platform': PlatformName

            };
            var url = ExportAsWord;
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

            APIs.ExportAsWord(id, params, authorizationHeader)
                .success(function (data, status) {
                    if (status == 200) {
                        $rootScope.slideDownAlertBox = 'slideDown';
                        growl.addSuccessMessage(data, config);
                        window.open(pdfUrl + data, '_blank'); 


                    }
                }).error(function (data, status) {
                    $rootScope.slideDownAlertBox = 'slideDown';
                    growl.addErrorMessage('Something went wrong! Please try again later.', config);
                });

        };




        //Refresh Grid
        $scope.Refresh = function () {
            var user = {
                'user_id': id,
                'user_level': Level
            };

            var url = GetAllContents;
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
            APIs.GetAllContents(user, params, authorizationHeader)
                .success(function (data, status) {
                    $scope.manageContentDatas = data.ContentList;

                    $scope.CategoryList = data.FilterContent.CategoryList;
                    $scope.Clientnames = data.FilterContent.Client;
                    $scope.Editornames = data.FilterContent.Editor;
                    $scope.Platformnames1 = data.FilterContent.FilterPlatform;
                    $scope.Platformnames = data.FilterContent.Platform;
                    $scope.Statusnames = data.FilterContent.Status;
                    $scope.Writernames = data.FilterContent.Writer;
                    $scope.currentPage = 0

                    if ($scope.taskToFilter) {
                        $scope.returnedData = $.grep($scope.manageContentDatas, function (element, index) {
                            return element.StatusName == $scope.taskToFilter;
                        });
                    } else {
                        $scope.returnedData = $scope.manageContentDatas;
                    }
                    $scope.contentKeyword = '';
                    $scope.contentClient = '';

                    $scope.contentPlatform = '';
                    $scope.contentEditor = '';

                    if ($scope.contentStatus) {} else {
                        $scope.contentStatus = '';
                    }

                    $scope.contentWriter = '';
                    $scope.contentstartDate = '';
                    $scope.contentendDate = '';

                }).error(function (data, status) {
                    $rootScope.slideDownAlertBox = 'slideDown';
                    growl.addErrorMessage('Something went wrong! Please try again later.', config);
                });
        };



        $scope.Refresh();

        //Filter Contents
        $scope.FilterByContents = function () {

            var url = FilterByContents;
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
            var data = {
                'member_id': Number(id) || '',
                'level': Number(Level) || '',
                'keyword': $scope.contentKeyword || '',
                'clientID': $scope.contentClient || '',
                'status': $scope.contentStatus || '',
                'platform': $scope.contentPlatform || '',
                'startDate': $scope.contentstartDate || '',
                'endDate': $scope.contentendDate || '',
                'editorID': $scope.contentEditor || '',
                'writerId': $scope.contentWriter || ''

            }

            APIs.FilterByContents(data, params, authorizationHeader)
                .success(function (data, status) {
                    if (status == 200) {
                        $scope.taskToFilter = undefined;
                        $scope.manageContentDatas = data;
                        $scope.currentPage = 0;
                        $scope.returnedData = $scope.manageContentDatas;



                    }
                }).error(function (data, status) {
                    $rootScope.slideDownAlertBox = 'slideDown';
                    growl.addErrorMessage('Something went wrong! Please try again later.', config);

                });


        };

        //reset Filter Function
        $scope.emptyFilterByContents = function () {
            $scope.Refresh();
            $scope.contentKeyword = '';
            $scope.contentClient = '';
            $scope.contentStatus = '';
            $scope.contentPlatform = '';
            $scope.contentEditor = '';
            $scope.contentWriter = '';
            $scope.contentstartDate = '';
            $scope.contentendDate = '';
            $scope.taskToFilter = undefined;
            $scope.currentPage = 0;
            window.location = '/#/ContentManagement/ManageContent';
        };


        //Schedule And Approval
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
                auditorlistUpdate.imageName = blog.name;
                auditorlistUpdate.imageStream = blog.base64;
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
                auditorlistUpdate.imageName = fb.name;
                auditorlistUpdate.imageStream = fb.base64;
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
                auditorlistUpdate.imageName = fbimage.name;
                auditorlistUpdate.imageStream = fbimage.base64;
                auditorlistUpdate.fb_descr = $scope.manageFBIdesc;
            } else if ($scope.radioValues.manage == 'tw') {
                var twit = {
                    'name': $scope.manageTwtpic.filename,
                    'base64': $scope.manageTwtpic.base64,
                    'filesize': $scope.manageTwtpic.filesize,
                    'filetype': $scope.manageTwtpic.filetype
                }

                auditorlistUpdate.imageName = twit.name;
                auditorlistUpdate.imageStream = twit.base64;
                auditorlistUpdate.tw_body = $scope.manageTwtMblog;
            }
            if ($scope.manageCategoryType && $scope.manageExpryDate && $scope.manageClient && $scope.radioValues.manage && $scope.manageTitle && $scope.contentpostDate && $scope.ctrl.time2) {
                APIs.ScheduleAndApproval(auditorlistUpdate, params, authorizationHeader)
                    .success(function (data, status) {
                        if (status == 200) {

                            $rootScope.slideDownAlertBox = 'slideDown';
                            growl.addSuccessMessage(data, config);
                            $scope.AddUserForm = false;
                            $scope.gridview = true;
                            $scope.hideNavBar = false;
                            $scope.hideAddUserForm = false;
                            $scope.Refresh();
                            $scope.manageTitle = '';
                            $scope.manageCategoryType = '';
                            $scope.radioValues.manage = '';
                            $scope.manageClient = '';
                            $scope.manageExpryDate = '';
                            $scope.manageNotes = '';
                            $scope.manageFBMblog = '';
                            $scope.manageFBTitle = '';
                            $scope.auditFBTlLink = '';
                            $scope.manageFBDescrip = '';
                            $scope.manageFBPic = '';
                            $scope.manageFBIdesc = '';
                            $scope.manageFBIpic = '';
                            $scope.manageTwtMblog = '';
                            $scope.manageTwtpic = '';
                            $scope.manageBlogTitl = '';
                            $scope.manageBlogcontent = '';
                            $scope.manageBlogTag = '';
                            $scope.manageBlogImg = '';
                            $scope.contentpostDate = '';
                        }
                    }).error(function (data, status) {
                        $rootScope.slideDownAlertBox = 'slideDown';
                        growl.addErrorMessage('Something went wrong! Please try again later.', config);
                    });
            }

        };




        //Client Approval

        $scope.SendClientApproval = function () {

            var myDate = $scope.contentpostDate;
            $scope.contentpostDate2 = myDate + ' ' + $scope.ctrl.time2;
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
                APIs.SendClientApproval(auditorlistUpdate, params, authorizationHeader)
                    .success(function (data, status) {
                        if (status == 200) {
                            $rootScope.slideDownAlertBox = 'slideDown';
                            growl.addSuccessMessage(data, config);
                            $scope.AddUserForm = false;
                            $scope.hideNavBar = false;
                            $scope.gridview = true;
                            $scope.hideAddUserForm = false;
                            $scope.Refresh();
                            $scope.manageTitle = '';
                            $scope.manageCategoryType = '';
                            $scope.radioValues.manage = '';
                            $scope.manageClient = '';
                            $scope.manageExpryDate = '';
                            $scope.manageNotes = '';
                            $scope.manageFBMblog = '';
                            $scope.manageFBTitle = '';
                            $scope.auditFBTlLink = '';
                            $scope.manageFBDescrip = '';
                            $scope.manageFBPic = '';
                            $scope.manageFBIdesc = '';
                            $scope.manageFBIpic = '';
                            $scope.manageTwtMblog = '';
                            $scope.manageTwtpic = '';
                            $scope.manageBlogTitl = '';
                            $scope.manageBlogcontent = '';
                            $scope.manageBlogTag = '';
                            $scope.manageBlogImg = '';
                            $scope.contentpostDate = '';
                        }
                    }).error(function (data, status) {
                        $rootScope.slideDownAlertBox = 'slideDown';
                        growl.addErrorMessage('Something went wrong! Please try again later.', config);
                    });

            }
        };



        $scope.manageTwtpic = '';
        $scope.manageFBIpic = '';
        $scope.manageFBPic = '';
        $scope.manageBlogImg = '';
        //Save Single Content
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
                auditorlistUpdate.imageName = blog.name;
                auditorlistUpdate.imageStream = blog.base64;
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
                auditorlistUpdate.imageName = fb.name;
                auditorlistUpdate.imageStream = fb.base64;
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
                auditorlistUpdate.imageName = fbimage.name;
                auditorlistUpdate.imageStream = fbimage.base64;
                auditorlistUpdate.fb_descr = $scope.manageFBIdesc;
            } else if ($scope.radioValues.manage == 'tw') {
                var twit = {
                    'name': $scope.manageTwtpic.filename,
                    'base64': $scope.manageTwtpic.base64,
                    'filesize': $scope.manageTwtpic.filesize,
                    'filetype': $scope.manageTwtpic.filetype
                }

                auditorlistUpdate.imageName = twit.name;
                auditorlistUpdate.imageStream = twit.base64;
                auditorlistUpdate.tw_body = $scope.manageTwtMblog;

            }
            if ($scope.manageCategoryType && $scope.manageExpryDate && $scope.manageClient && $scope.radioValues.manage && $scope.manageTitle && $scope.contentpostDate && $scope.ctrl.time2) {
                APIs.SaveContentTemplate(auditorlistUpdate, params, authorizationHeader)
                    .success(function (data, status) {
                        if (status == 200) {
                            $scope.hideNavBar = false;
                            $scope.showSaveButton = false;
                            $scope.AddUserForm = false;
                            $scope.gridview = true;
                            $rootScope.slideDownAlertBox = 'slideDown';
                            growl.addSuccessMessage('Template saved successfully', config);
                            $scope.hideAddUserForm = false;
                            $scope.Refresh();
                            $scope.manageTitle = '';
                            $scope.manageCategoryType = '';
                            $scope.radioValues.manage = '';
                            $scope.manageClient = '';
                            $scope.manageExpryDate = '';
                            $scope.manageNotes = '';
                            $scope.manageFBMblog = '';
                            $scope.manageFBTitle = '';
                            $scope.auditFBTlLink = '';
                            $scope.manageFBDescrip = '';
                            $scope.manageFBPic = '';
                            $scope.manageFBIdesc = '';
                            $scope.manageFBIpic = '';
                            $scope.manageTwtMblog = '';
                            $scope.manageTwtpic = '';
                            $scope.manageBlogTitl = '';
                            $scope.manageBlogcontent = '';
                            $scope.manageBlogTag = '';
                            $scope.manageBlogImg = '';
                            $scope.contentpostDate = '';
                        }
                    }).error(function (data, status) {
                        $rootScope.slideDownAlertBox = 'slideDown';
                        growl.addErrorMessage('Something went wrong! Please try again later.', config);

                    });
            }
        };




        //Set schedule Date in Single Content  

        $scope.statusValues = [{
            'SName': 'Pending Client Approval',
            'id': 5
}, {
            'SName': 'Scheduled',
            'id': 9
}]
        $scope.statusvalues = $scope.statusValues[0].id;
        $scope.fnSetSchedule = function () {

            $scope.contentpostDate2 = $scope.contentpostDate + ' ' + $scope.ctrl.time2;

            var id = {
                'id': $scope.scheduleId,
                'status': $scope.statusvalues,
                'scheduleDate': $scope.contentpostDate2
            };
            var url = SetScheduleDate;
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

            APIs.SetScheduleDate(id, params, authorizationHeader)
                .success(function (data, status) {
                    if (status == 200) {
                        $rootScope.slideDownAlertBox = 'slideDown';
                        growl.addSuccessMessage(data, config);
                        $scope.gridview = true;
                        $scope.setscheduleDateForm = false;
                        $scope.Refresh();
                    }
                }).error(function (data, status) {
                    $rootScope.slideDownAlertBox = 'slideDown';
                    growl.addErrorMessage('Something went wrong! Please try again later.', config);
                });

        };



        $scope.setscheduleDateForm = false;

        //Getting Schedule Date and Time
        $scope.setSchedule = function (id, valueFor1) {
            $scope.scheduleId = id;
            var user = {
                'id': $scope.scheduleId
            };

            var url = GetContentById + '/' + $scope.scheduleId;
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
            APIs.GetContentById(user, params, authorizationHeader, $scope.scheduleId)
                .success(function (data, status) {
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



                }).error(function (data, status) {});
            if (valueFor1 == 'SetSchedule') {

                $scope.setscheduleDateForm = true;
                $scope.gridview = false;
            }
        };


        //Edit Manage Contents  
        /*$scope.MainDiv1 = [];*/
        $scope.EditContents = function (editId, idValue, platformType, valueFor) {


            $scope.imgLink = '';
            /* $scope.updateShortURL();
            $scope.updateResetURL();*/
            $scope.setscheduleDateForm = false;
            $scope.shortedUrl = '';
            $scope.longUrl = '';
            $scope.submitted = false;
            $scope.onlyforAdd = false;
            $scope.editType = editId;
            $scope.editId = idValue;
            $scope.showSaveButton = false;
            $scope.hideNavBar = false;
            $scope.editForm = true;


            //Edit Single Content
            if (editId.lnkEdit == true) {

                $scope.Packages = false;
                $scope.gridview = false;
                $scope.hideEditForm = false;
                $scope.AddUserForm = true;
                $scope.dailyPack = false;
                $scope.writingtask = false;
                $scope.clientId = idValue;

                var user = {
                    'id': idValue
                };

                var url = GetContentById + '/' + idValue;
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
                APIs.GetContentById(user, params, authorizationHeader, idValue)
                    .success(function (data, status) {
                        if (status == 200) {

                            $scope.packageId = data.id;
                            $scope.manageCategoryType = Number(data.categoryID);
                            $scope.manageExpryDate = data.expireDate;
                            $scope.auditCategoryType = data.wp_category;
                            $scope.imagename = data.imageName;

                            $scope.imgLink = "data:image/png;base64, " + data.imageStream;
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
            }

            //Edit Twitter Pack
            if (editId.lnkEditTwPack == true) {

                $scope.gridview = false;
                $scope.clientId = idValue;
                $scope.hideEditForm = false;
                $scope.hideAddUserForm = false;
                $scope.dailyPack = false;
                $scope.Packages = true;
                $scope.writingtask = false;

                var user = {
                    'packageId': idValue
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
                }
                var authorizationHeader = OAuth.getAuthorizationHeader(oAuthDatas.relam, oAuthDatas.msgParameters);
                APIs.GetContentsByTWPackId(user, params, authorizationHeader)
                    .success(function (data, status) {

                        if (status == 200) {
                            $scope.packageId = data.id;
                            if (data.status == '0') {
                                $scope.showContentIsReady = true;
                                $scope.showDeclineReason = false;
                            }
                            if (data.status == '1' && Level == 90) {
                                $scope.showDeclineReason = true;
                                $scope.showContentIsReady = false;
                            };
                            if (Level != 90 && Level != 20 && Level != 3) {
                                if (data.status == '2') {
                                    $scope.showclientDeclineReason = true;
                                    $scope.showClientapprove = true;
                                    $scope.showClientdecline = true;
                                }

                                if (data.status == '22') {
                                    $scope.showCancel = true;
                                }

                            }
                            $scope.plaformTyp = data.platformIdentity;
                            $scope.UpdateshowOnlySevenDayPackage = true;
                            $scope.FacebookContent = data.FacebookContent;
                            $scope.TwitterContent = data.TwitterContent;
                            $scope.FbImageContent = data.FbImageContent;

                            if ($scope.TwitterContent) {

                                if ($scope.TwitterContent.length > 0) {
                                    $scope.MainDiv1 = [];
                                    for (var i = 0; i < $scope.TwitterContent.length; i++) {
                                        $scope.TwitterContent[i].dataTitle = data.TwitterContent[i].GroupHeaderText;
                                        $scope.TwitterContent[i].imgLink = "data:image/png;base64, " + $scope.TwitterContent[i].imageStream;
                                        $scope.TwitterContent[i].weklyctrl = {};
                                        var postTime = dateFormat($scope.TwitterContent[i].ScheduleDate);
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

                            $scope.edi1 = Number(data.editorID);
                            $scope.wri1 = Number(data.writerID);
                            $scope.packageName = data.name;
                            $scope.amount = data.amount;
                            $scope.cli = Number(data.clientID);
                            $scope.ddate = data.dueDate;
                            $scope.ArchivedVal = data.isArchived;
                            $scope.singleDay = data.isSingleDay;
                            $scope.notes = data.notes;
                            $scope.sdate = data.startDate;

                        };

                    }).error(function (data, status) {
                        $rootScope.slideDownAlertBox = 'slideDown';
                        growl.addErrorMessage('Something went wrong! Please try again later.', config);
                    });
            }

            //Edit Writing Task
            if (editId.lnkEditTask == true) {
                $scope.gridview = false;
                $scope.hideEditForm = true;
                $scope.hideAddUserForm = false;
                $scope.dailyPack = false;
                $scope.Packages = false;
                $scope.packageForm = false;
                $scope.clientId = idValue;
                $scope.writingtask = true;

                var user = {
                    'id': idValue
                };

                var url = GetTaskContentById + '/' + idValue;
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
                APIs.GetTaskContentById(user, params, authorizationHeader, idValue)
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
                            $scope.packageId = data.id;
                            $scope.title = data.title;
                            $scope.ddate = data.dueDate;
                            $scope.saveDate = data.saveDate;
                            $scope.sdate = data.scheduleDate;
                            var split1 = data.dueDate.split(' ');
                            var split = data.scheduleDate.split(' ');
                            $scope.sdate = split[0];
                            $scope.ddate = split1[0];
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
                            $scope.Status1 = data.status.toString();
                            $scope.Editor = Number(data.editorID);
                            $scope.Writer = Number(data.writerID);
                            $scope.Client = Number(data.clientID);
                            $scope.manageClientValue = Number(data.clientID);
                            $scope.Category = Number(data.categoryID);
                            $scope.Platform = data.platformCode;
                            $scope.amount = data.amount;
                            $scope.brife = data.descr;
                            $scope.Notes = data.notes;
                            $scope.Logs = data.logs;
                            $scope.declineReason = data.reason;

                            $scope.Createdby = data.createdBy;
                            if (data.platformCode == 'fb') {
                                $scope.dispalyFBContent = true;
                                $scope.dispalyTWContent = false;
                                $scope.dispalyBlogContent = false;
                                $scope.fbmicro = data.fb_body;
                                $scope.fbtitle = data.fb_title;
                                $scope.fbtitlelink = data.fb_link;
                                $scope.fbdes = data.fb_descr;
                                $scope.FBmyfile = data.fb_picture;
                                $scope.gridID = data.memberID;




                            } else if (data.platformCode == 'tw') {
                                $scope.dispalyTWContent = true;
                                $scope.dispalyBlogContent = false;
                                $scope.dispalyFBContent = false;
                                $scope.twmicro = data.tw_body;
                                $scope.twmyfile = data.tw_picture;


                            } else if (data.platformCode == 'wp') {
                                $scope.dispalyBlogContent = true;
                                $scope.dispalyFBContent = false;
                                $scope.dispalyTWContent = false;
                                $scope.btitle = data.wp_title;
                                $scope.htmlcontent = data.wp_content;
                                $scope.tags = data.wp_tag;
                                $scope.wpmyfile = data.wp_picture;


                            };


                        };

                    }).error(function (data, status) {
                        $rootScope.slideDownAlertBox = 'slideDown';
                        growl.addErrorMessage('Something went wrong! Please try again later.', config);
                    });
            }

            //Edit Packages
            if (editId.lnkEditPack == true) {
                $scope.gridview = false;
                $scope.clientId = idValue;
                $scope.hideEditForm = false;
                $scope.hideAddUserForm = false;
                $scope.dailyPack = false;
                $scope.Packages = true;
                $scope.writingtask = false;


                var user = {
                    'packageId': idValue
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
                }
                var authorizationHeader = OAuth.getAuthorizationHeader(oAuthDatas.relam, oAuthDatas.msgParameters);
                APIs.GetContentsByPackageId(user, params, authorizationHeader)
                    .success(function (data, status) {

                        if (status == 200) {
                            $scope.packageId = data.id;
                            if (data.status == '0') {
                                $scope.showContentIsReady = true;
                                $scope.showDeclineReason = false;
                            }
                            if (data.status == '1' && Level == 90) {
                                $scope.showDeclineReason = true;
                                $scope.showContentIsReady = false;
                            };


                            if (Level != 90 && Level != 20 && Level != 3) {
                                if (data.status == '2') {

                                    $scope.showclientDeclineReason = true;
                                    $scope.showClientapprove = true;
                                    $scope.showClientdecline = true;
                                }

                                if (data.status == '22') {
                                    $scope.showCancel = true;
                                }

                            }
                            $scope.plaformTyp = data.platformIdentity;

                            $scope.checkSinglepack = data.isSingleDay;
                            if (data.isSingleDay == '0') {
                                $scope.showSingleDayCheckBox = false;
                                $scope.UpdateshowOnlySingleDayPackage = false;
                                $scope.UpdateshowOnlySevenDayPackage = true;
                            } else if (data.isSingleDay == '1') {
                                $scope.showSingleDayCheckBox = true;
                                $scope.UpdateshowOnlySingleDayPackage = true;
                                $scope.UpdateshowOnlySevenDayPackage = false;


                                if (data.status == '5') {
                                    $scope.showclientDeclineReason = true;
                                    $scope.showClientapprove = true;
                                    $scope.showClientdecline = true;
                                }
                            }

                            $scope.FacebookContent = data.FacebookContent;
                            $scope.TwitterContent = data.TwitterContent;
                            $scope.FbImageContent = data.FbImageContent;
                            if ($scope.FacebookContent && $scope.FbImageContent && $scope.TwitterContent) {
                                $scope.dataTitle = data.FacebookContent[0].GroupHeaderText;
                                if ($scope.FacebookContent.length > 0) {
                                    var postTime = dateFormat($scope.FacebookContent[0].ScheduleDate);
                                    $scope.weklyctrl.injectedObject = injectedTimeFormat(postTime.hours);

                                    $scope.MainDiv1 = [];
                                    for (var i = 0; i < $scope.FacebookContent.length; i++) {
                                        $scope.FacebookContent[i].imgLink = "data:image/png;base64, " + $scope.FacebookContent[i].imageStream;
                                        $scope.FbImageContent[i].imgLink = "data:image/png;base64, " + $scope.FbImageContent[i].imageStream;
                                        $scope.TwitterContent[i].imgLink = "data:image/png;base64, " + $scope.TwitterContent[i].imageStream;
                                        $scope.FacebookContent[i].dataTitle = data.FacebookContent[i].GroupHeaderText;
                                        $scope.FacebookContent[i].weklyctrl = {};
                                        var postTime = dateFormat($scope.FacebookContent[i].ScheduleDate);
                                        $scope.FacebookContent[i].scheduleDate = postTime.date;
                                        $scope.FacebookContent[i].weklyctrl.injectedObject = injectedTimeFormat(postTime.hours);
                                        var postTime = dateFormat($scope.FbImageContent[i].ScheduleDate);
                                        $scope.FbImageContent[i].scheduleDate = postTime.date;
                                        $scope.FacebookContent[i].weklyctrl.injectedObject = injectedTimeFormat(postTime.hours);
                                        var postTime = dateFormat($scope.TwitterContent[i].ScheduleDate);
                                        $scope.TwitterContent[i].scheduleDate = postTime.date;
                                        $scope.FacebookContent[i].weklyctrl.injectedObject = injectedTimeFormat(postTime.hours);
                                        $scope.MainDiv1.push({
                                            'FacebookContent': $scope.FacebookContent[i],
                                            'FbImageContent': $scope.FbImageContent[i],
                                            'TwitterContent': $scope.TwitterContent[i]
                                        })


                                    }



                                };

                            };
                            $scope.plaformTyp = data.platformIdentity;

                            $scope.edi1 = Number(data.editorID);
                            $scope.wri1 = Number(data.writerID);
                            $scope.packageName = data.name;
                            $scope.amount = data.amount;
                            $scope.cli = Number(data.clientID);
                            $scope.ddate = data.dueDate;
                            $scope.ArchivedVal = data.isArchived;
                            $scope.singleDay = data.isSingleDay;
                            $scope.notes = data.notes;
                            $scope.sdate = data.startDate;
                            $scope.ctrl.potime = data.posting_time;
                        };

                    }).error(function (data, status) {
                        $rootScope.slideDownAlertBox = 'slideDown';
                        growl.addErrorMessage('Something went wrong! Please try again later.', config);
                    });
            }

            //Edit Facebook Pack
            if (editId.lnkEditFbPack == true || editId == 'lnkEditFbPack') {
                $scope.gridview = false;
                $scope.packageForm = true;
                $scope.clientId = idValue;
                $scope.hideEditForm = false;
                $scope.hideAddUserForm = false;
                $scope.dailyPack = false;
                $scope.Packages = true;
                $scope.writingtask = false;
                var user = {
                    'packageId': idValue
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
                }
                var authorizationHeader = OAuth.getAuthorizationHeader(oAuthDatas.relam, oAuthDatas.msgParameters);
                APIs.GetContentsByFBPackId(user, params, authorizationHeader)
                    .success(function (data, status) {

                        if (status == 200) {
                            $scope.packageId = data.id;
                            if (Level != 90 && Level != 20 && Level != 3) {
                                if (data.status == '2') {
                                    $scope.showclientDeclineReason = true;
                                    $scope.showClientapprove = true;
                                    $scope.showClientdecline = true;
                                }

                                if (data.status == '22') {
                                    $scope.showCancel = true;
                                }

                            }

                            if (data.status == '0') {
                                $scope.showContentIsReady = true;
                                $scope.showDeclineReason = false;
                            }
                            if (data.status == '1' && Level == 90) {
                                $scope.showDeclineReason = true;
                                $scope.showContentIsReady = false;
                            };

                            $scope.plaformTyp = data.platformIdentity;
                            $scope.UpdateshowOnlySevenDayPackage = true;
                            $scope.FacebookContent = data.FacebookContent;
                            $scope.TwitterContent = data.TwitterContent;
                            $scope.FbImageContent = data.FbImageContent;


                            if ($scope.FacebookContent) {

                                if ($scope.FacebookContent.length > 0) {

                                    $scope.MainDiv1 = [];
                                    for (var i = 0; i < $scope.FacebookContent.length; i++) {
                                        $scope.FacebookContent[i].dataTitle = data.FacebookContent[i].GroupHeaderText;
                                        $scope.FacebookContent[i].imgLink = "data:image/png;base64, " + $scope.FacebookContent[i].imageStream;
                                        $scope.FacebookContent[i].weklyctrl = {};
                                        var postTime = dateFormat($scope.FacebookContent[i].ScheduleDate);
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

                            $scope.edi1 = Number(data.editorID);
                            $scope.wri1 = Number(data.writerID);
                            $scope.packageName = data.name;
                            $scope.amount = data.amount;
                            $scope.cli = Number(data.clientID);
                            $scope.ddate = data.dueDate;
                            $scope.ArchivedVal = data.isArchived;
                            $scope.singleDay = data.isSingleDay;
                            $scope.notes = data.notes;
                            $scope.sdate = data.startDate;
                            $scope.ctrl.potime = data.posting_time;


                        };

                    }).error(function (data, status) {
                        $rootScope.slideDownAlertBox = 'slideDown';
                        growl.addErrorMessage('Something went wrong! Please try again later.', config);
                    });
            }

        };


        //Decline Writer

        $scope.declineWriter = function () {
            var listOdAddUser123 = {
                'id': $scope.clientId,
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
            }
            var authorizationHeader = OAuth.getAuthorizationHeader(oAuthDatas.relam, oAuthDatas.msgParameters);
            if ($scope.declineReason && $scope.title && $scope.Writer) {
                APIs.DeclineWritingTask(listOdAddUser123, params, authorizationHeader)
                    .success(function (data, status) {
                        if (status == 200) {
                            $rootScope.slideDownAlertBox = 'slideDown';
                            growl.addSuccessMessage(data, config);
                        }
                    }).error(function (data, status) {
                        $rootScope.slideDownAlertBox = 'slideDown';
                        growl.addErrorMessage('Something went wrong! Please try again later.', config);


                    });
            }

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
                    /* delete $scope.imgLink;  */
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
            /* if ($scope.manageCategoryType && $scope.manageExpryDate && $scope.manageClient && $scope.manageNotes && $scope.radioValues.manage && $scope.manageTitle) {*/
            APIs.SaveContentTemplate(auditorlistUpdate, params, authorizationHeader)
                .success(function (data, status) {
                    if (status == 200) {


                        $rootScope.slideDownAlertBox = 'slideDown';
                        growl.addSuccessMessage(data, config);
                        /* $scope.hideAddUserForm = false;*/
                        /* $scope.Refresh();*/

                    }
                }).error(function (data, status) {
                    $rootScope.slideDownAlertBox = 'slideDown';
                    growl.addErrorMessage('Something went wrong! Please try again later.', config);

                });
            /*   }*/
        };


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
                    /* delete $scope.imgLink;*/
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
                    /* delete $scope.imgLink; */
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
                    /* delete $scope.imgLink;   */
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
                    /*delete $scope.imgLink; */
                }

                auditorlistUpdate.tw_body = $scope.manageTwtMblog;
            }

            APIs.ScheduledContent(auditorlistUpdate, params, authorizationHeader)
                .success(function (data, status) {
                    if (status == 200) {

                        $rootScope.slideDownAlertBox = 'slideDown';
                        growl.addSuccessMessage(data, config);
                        $scope.hideAddUserForm = false;
                        /*  $scope.cancelUser();*/
                        /* $scope.Refresh();*/
                    }
                }).error(function (data, status) {
                    $rootScope.slideDownAlertBox = 'slideDown';
                    growl.addErrorMessage('Something went wrong! Please try again later.', config);

                });

        };

        $scope.checkboxModel = {

            value2: 'NO'
        };

        $scope.scheduleButton = function () {

            if ($scope.checkboxModel.value2 == 'YES') {
                $scope.SaveContentTemplate();
                $scope.scheduleButton1();
                $scope.checkboxModel.value2 = 'NO';
            } else if ($scope.checkboxModel.value2 != 'YES') {

                $scope.scheduleButton1();

            }

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
            }
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
            }
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


        };


        //Schedule And Approval
        $scope.ScheduleAndApprovalTask = function () {

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
                'id': $scope.packageId,
                'MemberID': id,
                'categoryID': $scope.Category,
                'expireDate': $scope.ddate,
                'hospitalID': $scope.Client.toString(),
                'notes': $scope.Notes,
                'platform': $scope.Platform,
                'title': $scope.title,
                'scheduleDate': $scope.sdate

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
            /* if ($scope.title && $scope.ddate && $scope.sdate && $scope.ctrl.stime1 && $scope.Status1 && $scope.editor && $scope.writer && $scope.client && $scope.category && $scope.amount) {*/
            APIs.ScheduleAndApproval(listOdAddUser, params, authorizationHeader)
                .success(function (data, status) {
                    if (status == 200) {
                        $scope.writingtask = false;
                        $rootScope.slideDownAlertBox = 'slideDown';
                        growl.addSuccessMessage(data, config);
                        $scope.AddUserForm = false;
                        $scope.gridview = true;
                        $scope.hideNavBar = false;
                        $scope.hideAddUserForm = false;
                        $scope.Refresh();
                        $scope.wpmyfile = '';
                        $scope.twmyfile = '';
                        $scope.FBmyfile = '';

                    }
                }).error(function (data, status) {
                    $rootScope.slideDownAlertBox = 'slideDown';
                    growl.addErrorMessage('Something went wrong! Please try again later.', config);
                });
            /*    }*/

        };




        //Client Approval

        $scope.SendClientApprovalTask = function () {

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
            }

            var authorizationHeader = OAuth.getAuthorizationHeader(oAuthDatas.relam, oAuthDatas.msgParameters);
            var listOdAddUser = {
                'id': $scope.packageId,
                'MemberID': id,
                'categoryID': $scope.Category,
                'expireDate': $scope.ddate,
                'hospitalID': $scope.Client.toString(),
                'notes': $scope.Notes,
                'platform': $scope.Platform,
                'title': $scope.title,
                'scheduleDate': $scope.sdate
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
            /*if ($scope.title && $scope.ddate && $scope.sdate && $scope.ctrl.stime1 && $scope.Status1 && $scope.Editor && $scope.Writer && $scope.Client && $scope.Category && $scope.amount) {*/
            APIs.SendClientApproval(listOdAddUser, params, authorizationHeader)
                .success(function (data, status) {
                    if (status == 200) {
                        $scope.writingtask = false;
                        $rootScope.slideDownAlertBox = 'slideDown';
                        growl.addSuccessMessage(data, config);
                        $scope.AddUserForm = false;
                        $scope.hideNavBar = false;
                        $scope.gridview = true;
                        $scope.hideAddUserForm = false;
                        $scope.Refresh();
                        $scope.wpmyfile = '';
                        $scope.twmyfile = '';
                        $scope.FBmyfile = '';

                    }
                }).error(function (data, status) {
                    $rootScope.slideDownAlertBox = 'slideDown';
                    growl.addErrorMessage('Something went wrong! Please try again later.', config);
                });

            /*}*/
        };


        //Update Manage Content Package

        $scope.FacebookContent = [];
        $scope.FbImageContent = [];
        $scope.TwitterContent = [];
        var nums = [];
        $scope.updateContents = function () {
            $scope.hideNavBar = false;
            $scope.submitted = true;

            //Writing Task Update

            if ($scope.editType.lnkEditTask == true) {
                var myDate = $scope.sdate;
                $scope.dueDate123 = myDate + ' ' + $scope.ctrl.stime1;


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
                }

                var authorizationHeader = OAuth.getAuthorizationHeader(oAuthDatas.relam, oAuthDatas.msgParameters);
                var listOdAddUser = {
                    'id': parseInt($scope.editId),
                    'title': $scope.title,
                    'descr': $scope.brife,
                    'amount': parseInt($scope.amount),
                    'categoryID': parseInt($scope.Category),
                    'writerID': parseInt($scope.Writer),
                    'editorID': parseInt($scope.Editor),
                    'clientID': parseInt($scope.Client),
                    'dueDate': $scope.ddate,
                    'scheduleDate': $scope.dueDate123,
                    'platform': $scope.Platform,
                    'status': parseInt($scope.Status1),
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
                if ($scope.title && $scope.ddate && $scope.sdate && $scope.ctrl.stime1 && $scope.Status1 && $scope.Editor && $scope.Writer && $scope.Client && $scope.Category && $scope.amount) {
                    APIs.UpdateWritingTask(listOdAddUser, params, authorizationHeader)
                        .success(function (data, status) {
                            if (status == 200) {
                                if ($routeParams.id || $routeParams.status) {
                                    window.location = '/#/Dashboard';
                                } else {
                                    $scope.hideNavBar = false;
                                    $scope.editForm = false;
                                    $rootScope.slideDownAlertBox = 'slideDown';
                                    growl.addSuccessMessage('Template updated successfully', config);
                                    $scope.gridview = true;
                                    $scope.editForm = false;
                                    $scope.writingtask = false;
                                    $scope.Refresh();
                                }
                            }
                        }).error(function (data, status) {
                            $rootScope.slideDownAlertBox = 'slideDown';
                            growl.addErrorMessage('Something went wrong! Please try again later.', config);

                        });
                }

            }


            //Package Update

            if ($scope.plaformTyp == 'pack' && $scope.editType.lnkEditPack == true || $scope.plaformTyp == 'facebook' && $scope.editType.lnkEditFbPack == true || $scope.plaformTyp == 'twitter' && $scope.editType.lnkEditTwPack == true) {

                var myDate = $scope.sdate;
                $scope.contentpostDate2 = myDate + ' ' + $scope.ctrl.potime;
                $scope.manageDueDate1 = $scope.ddate + ' ' + $scope.ctrl.potime;

                if ($scope.singleDay == '0') {
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
                                $scope.TwitterContent[i].weklyctrl.schdtime = postTime.hours;
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


                }







                if ($scope.singleDay == '1') {

                    if ($scope.FacebookContent || $scope.plaformTyp == 'pack') {

                        if (!$scope.FacebookContent[0].fb_picture.filename) {

                            $scope.FacebookContent[0].imageName = $scope.FacebookContent[0].imageName;

                        }

                        $scope.FacebookContent[0].platform = 'Facebook';
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

                        $scope.FacebookContent[0].declineReason = $scope.FacebookContent[0].DeclineReason;
                        $scope.FacebookContent[0].fb_descr = $scope.FacebookContent[0].Description;
                        $scope.FacebookContent[0].fb_body = $scope.FacebookContent[0].Microblog;
                        $scope.FacebookContent[0].id = $scope.FacebookContent[0].ContentId;
                        $scope.FacebookContent[0].fb_link = $scope.FacebookContent[0].Titlelink;
                        $scope.FacebookContent[0].fb_title = $scope.FacebookContent[0].Title;
                        $scope.FacebookContent[0].hospitalID = $scope.cli;
                        $scope.FacebookContent[0].isDeclined = $scope.FacebookContent[0].IsDeclined;


                    };


                    if ($scope.FbImageContent || $scope.plaformTyp == 'pack') {



                        $scope.FbImageContent[0].platform = 'Facebook'


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
                        $scope.FbImageContent[0].declineReason = $scope.FbImageContent[0].DeclineReason;
                        $scope.FbImageContent[0].fb_descr = $scope.FbImageContent[0].Description;
                        $scope.FbImageContent[0].fb_body = $scope.FbImageContent[0].Microblog;
                        $scope.FbImageContent[0].id = $scope.FbImageContent[0].ContentId;
                        $scope.FbImageContent[0].fb_link = $scope.FbImageContent[0].Titlelink;
                        $scope.FbImageContent[0].fb_title = $scope.FbImageContent[0].Title;
                        $scope.FbImageContent[0].hospitalID = $scope.cli;
                        $scope.FbImageContent[0].isDeclined = $scope.FbImageContent[0].IsDeclined;

                    };


                    if ($scope.TwitterContent || $scope.plaformTyp == 'pack') {


                        $scope.TwitterContent[0].platform = 'Twitter'

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
                        $scope.TwitterContent[0].tw_body = $scope.TwitterContent[0].Microblog;

                        $scope.TwitterContent[0].id = $scope.TwitterContent[0].ContentId;

                        $scope.TwitterContent[0].hospitalID = $scope.cli;

                    };


                    if ($scope.weklyctrl.posttime) {
                        var postTime = dateFormat($scope.FacebookContent[0].ScheduleDate);
                        $scope.FacebookContent[0].scheduleDate = postTime.date;
                        $scope.FacebookContent[0].scheduleDate = $scope.FacebookContent[0].scheduleDate + ' ' + $scope.weklyctrl.posttime;
                        $scope.FbImageContent[0].scheduleDate = $scope.FbImageContent[0].scheduleDate + ' ' + $scope.weklyctrl.posttime;
                        $scope.TwitterContent[0].scheduleDate = $scope.TwitterContent[0].scheduleDate + ' ' + $scope.weklyctrl.posttime;
                    } else if (!$scope.weklyctrl.posttime) {
                        $scope.FacebookContent[0].scheduleDate = $scope.FacebookContent[0].ScheduleDate;
                        $scope.FbImageContent[0].scheduleDate = $scope.FbImageContent[0].ScheduleDate;
                        $scope.TwitterContent[0].scheduleDate = $scope.TwitterContent[0].ScheduleDate;
                    }
                    $scope.FacebookContent[0].imageName = $scope.FacebookContent[0].imageName;
                    $scope.FbImageContent[0].imageName = $scope.FbImageContent[0].imageName;
                    $scope.TwitterContent[0].imageName = $scope.TwitterContent[0].imageName;


                }


                if ($scope.FacebookContent) {
                    for (var i = 0; i < $scope.FacebookContent.length; i++) {
                        delete $scope.FacebookContent[i].ScheduleDate;
                        delete $scope.FacebookContent[i].fb_picture;

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
                        $scope.TwitterContent[i].declineReason = $scope.TwitterContent[i].DeclineReason;
                        if ($scope.TwitterContent[i].Declined == true) {
                            $scope.TwitterContent[i].isDeclined = 1;
                        } else {
                            $scope.TwitterContent[i].isDeclined = 0;
                        }


                    }
                }
                var packageDetail = {
                    'id': $scope.editId.toString(),
                    'memberID': Number(memberID),
                    'clientID': $scope.cli.toString(),
                    'editorID': $scope.edi1,
                    'writerID': $scope.wri1,
                    'amount': Number($scope.amount),
                    'name': $scope.packageName,
                    'notes': $scope.notes,
                    'posting_time': $scope.ctrl.potime,
                    'isSingleDay': Number($scope.singleDay),
                    'dueDate': $scope.ddate,
                    'startDate': $scope.sdate,
                    'isArchived': $scope.Archived,
                    'platformIdentity': $scope.plaformTyp
                }



                if ($scope.singleDay == '0') {


                    if ($scope.plaformTyp == 'twitter') {

                        if ($scope.TwitterContent != null) {
                            for (var i = 0; i < $scope.TwitterContent.length; i++) {
                                delete $scope.TwitterContent[i].imgLink;
                                $scope.TwitterContent[i].platform = 'twitter';
                            };
                        };

                        var listOdAddUser123 =   {
                            'packageDetail': packageDetail,
                            'contentDetials': $scope.TwitterContent
                        }
                    } else if ($scope.plaformTyp == 'facebook') {

                        if ($scope.FacebookContent != null) {
                            for (var i = 0; i < $scope.FacebookContent.length; i++) {
                                if ($scope.FacebookContent[i].fb_picture) {
                                    $scope.FacebookContent[i].imageStream = $scope.FacebookContent[i].fb_picture.base64;
                                    $scope.FacebookContent[i].imageName = $scope.FacebookContent[i].fb_picture.filename;
                                    delete $scope.FacebookContent[i].fb_picture;
                                };

                                $scope.FacebookContent[i].platform = 'facebook';
                                delete $scope.FacebookContent[i].imgLink;
                            };
                        };


                        var listOdAddUser123 =   {
                            'packageDetail': packageDetail,
                            'contentDetials': $scope.FacebookContent
                        }
                    } else {

                        if ($scope.FacebookContent != null) {
                            for (var i = 0; i < $scope.FacebookContent.length; i++) {
                                if ($scope.FacebookContent[i].fb_picture) {
                                    $scope.FacebookContent[i].imageStream = $scope.FacebookContent[i].fb_picture.base64;
                                    $scope.FacebookContent[i].imageName = $scope.FacebookContent[i].fb_picture.filename;
                                    delete $scope.FacebookContent[i].fb_picture;
                                };
                                $scope.FacebookContent[i].platform = 'Facebook';
                                delete $scope.FacebookContent[i].imgLink;
                            };
                        };

                        if ($scope.FbImageContent != null) {
                            for (var i = 0; i < $scope.FbImageContent.length; i++) {
                                if ($scope.FbImageContent[i].fb_picture) {
                                    $scope.FbImageContent[i].imageStream = $scope.FbImageContent[i].fb_picture.base64;
                                    $scope.FbImageContent[i].imageName = $scope.FbImageContent[i].fb_picture.filename;
                                    delete $scope.FbImageContent[i].fb_picture;
                                };
                                delete $scope.FbImageContent[i].imgLink;
                                $scope.FbImageContent[i].platform = 'Facebook';
                            };
                        };


                        nums =  $scope.FacebookContent.concat($scope.FbImageContent, $scope.TwitterContent);
                        var listOdAddUser123 =   {
                            'packageDetail': packageDetail,
                            'contentDetials': nums
                        }

                    }

                } else if ($scope.singleDay == '1') {
                    if ($scope.FacebookContent[0].fb_picture) {
                        delete $scope.FacebookContent[0].fb_picture;
                        delete $scope.FbImageContent[0].fb_picture;
                        delete $scope.TwitterContent[0].fb_picture;

                    };
                    var listOdAddUser123 =   {
                        'packageDetail': packageDetail,
                        'contentDetials': [$scope.FacebookContent[0], {}, {}, {}, {}, {}, {}, $scope.FbImageContent[0], {}, {}, {}, {}, {}, {}, $scope.TwitterContent[0], {}, {}, {}, {}, {}, {}]
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
                }
                var authorizationHeader = OAuth.getAuthorizationHeader(oAuthDatas.relam, oAuthDatas.msgParameters);
                if ($scope.amount && $scope.wri1 && $scope.edi1 && $scope.ddate && $scope.sdate && $scope.ctrl.potime && $scope.cli && $scope.packageName) { 
                    APIs.UpdatePackageContents(listOdAddUser123, params, authorizationHeader)
                        .success(function (data, status) {
                            if (status == 200) {
                                if ($routeParams.id || $routeParams.status) {
                                    window.location = '/#/Dashboard';
                                } else {
                                    $scope.editForm = false;
                                    $scope.hideAddUserForm = false;
                                    $scope.hideNavBar = false;
                                    $scope.showOnlySingleDayPackage = false;
                                    $scope.showOnlySevenDayPackage = false;
                                    $scope.Refresh();
                                    $scope.cancelUser();
                                    $rootScope.slideDownAlertBox = 'slideDown';
                                    growl.addSuccessMessage('Template updated successfully', config);
                                }
                            }
                        }).error(function (data, status) {
                            $rootScope.slideDownAlertBox = 'slideDown';
                            growl.addErrorMessage('Something went wrong! Please try again later.', config); 

                        });
                }


            }

            //Single Content update

            if ($scope.editType.lnkEdit == true) {

                $scope.showSaveButton = false;

                $scope.contentpostDate2 = $scope.contentpostDate + ' ' + $scope.ctrl.time2;

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
                    'id': $scope.editId,
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
                if ($scope.manageCategoryType && $scope.manageExpryDate && $scope.manageClient && $scope.radioValues.manage && $scope.manageTitle) {
                    APIs.SaveContentTemplate(auditorlistUpdate, params, authorizationHeader)
                        .success(function (data, status) {
                            if (status == 200) {
                                if ($routeParams.id || $routeParams.status) {
                                    window.location = '/#/Dashboard';
                                } else {
                                    $scope.editForm = false;
                                    $scope.AddUserForm = false;
                                    $scope.gridview = true;
                                    $rootScope.slideDownAlertBox = 'slideDown';
                                    growl.addSuccessMessage('Template updated successfully', config);
                                    $scope.hideAddUserForm = false;
                                    $scope.Refresh();

                                    $scope.manageTitle = '';
                                    $scope.manageCategoryType = '';
                                    $scope.radioValues.manage = '';
                                    $scope.manageClient = '';
                                    $scope.manageExpryDate = '';
                                    $scope.manageNotes = '';
                                    $scope.manageFBMblog = '';
                                    $scope.manageFBTitle = '';
                                    $scope.auditFBTlLink = '';
                                    $scope.manageFBDescrip = '';
                                    $scope.manageFBPic = '';
                                    $scope.manageFBIdesc = '';
                                    $scope.manageFBIpic = '';
                                    $scope.manageTwtMblog = '';
                                    $scope.manageTwtpic = '';
                                    $scope.manageBlogTitl = '';
                                    $scope.manageBlogcontent = '';
                                    $scope.manageBlogTag = '';
                                    $scope.manageBlogImg = '';
                                    $scope.contentpostDate = '';
                                    $scope.manageFBTlLink = '';
                                }
                            }
                        }).error(function (data, status) {
                            $rootScope.slideDownAlertBox = 'slideDown';
                            growl.addErrorMessage('Something went wrong! Please try again later.', config);

                        });
                }
            }
        }

        $scope.onlyParam = true;
        if ($routeParams) {

            if ($routeParams.form == 'CreateNewContent') {
                $scope.showAddForm();
                $scope.AddUserForm = true;
            } else if ($routeParams.content == 'lnkEdit') {


                var obj = {
                    'lnkEdit': true
                }

                $scope.Packages = false;
                $scope.gridview = false;
                $scope.hideEditForm = false;
                $scope.AddUserForm = true;

                $scope.EditContents(obj, $routeParams.id, $routeParams.Package);
            } else if ($routeParams.content == 'lnkEditFbPack') {
                var obj = {
                    'lnkEditFbPack': true
                }

                $scope.Packages = true;
                $scope.writingtask = false;
                $scope.AddUserForm = false;
                $scope.gridview = false;
                $scope.hideEditForm = false;
                $scope.AddUserForm = false;
                $scope.EditContents(obj, $routeParams.id, $routeParams.Package);
                $scope.packageId = $routeParams.id;
            } else if ($routeParams.content == 'lnkEditPack') {

                var obj = {
                    'lnkEditPack': true
                }

                $scope.Packages = true;
                $scope.writingtask = false;
                $scope.AddUserForm = false;
                $scope.gridview = false;
                $scope.hideEditForm = false;
                $scope.AddUserForm = false;
                $scope.EditContents(obj, $routeParams.id, $routeParams.Package);
                $scope.packageId = $routeParams.id;
            } else if ($routeParams.content == 'lnkEditTask') {

                var obj = {
                    'lnkEditTask': true
                }

                $scope.onlyParam = false;


                $scope.Statusnames1 = [{
                    "SName": "Assigned",
                    "id": "0"
                }, {
                    "SName": "Pending Approval",
                    "id": "1"
                }, {
                    "SName": "Approved",
                    "id": "2"
                }, {
                    "SName": "Declined",
                    "id": "3"
                }]



                $scope.Packages = false;
                $scope.writingtask = true;
                $scope.AddUserForm = false;
                $scope.gridview = false;
                $scope.hideEditForm = true;

                $scope.EditContents(obj, $routeParams.id, $routeParams.Package);
                $scope.packageId = $routeParams.id;
            } else if ($routeParams.content == 'lnkEditTwPack') {
                var obj = {
                    'lnkEditTwPack': true
                }

                $scope.Packages = true;
                $scope.writingtask = false;
                $scope.AddUserForm = false;
                $scope.gridview = false;
                $scope.hideEditForm = false;
                $scope.AddUserForm = false;
                $scope.EditContents(obj, $routeParams.id, $routeParams.Package);
                $scope.packageId = $routeParams.id;
            } else if ($routeParams.status == 'Canceled') {
                $scope.taskToFilter = 'Canceled'
                $scope.contentStatus = '6';
            } else if ($routeParams.status == 'Scheduled') {
                $scope.currentPage = 0;
                $scope.taskToFilter = 'Scheduled'
                $scope.contentStatus = '4';


                $scope.returnedData = $.grep($scope.manageContentDatas, function (element, index) {
                    return element.StatusName == 'Scheduled';
                });

            } else if ($routeParams.status == 'Pending') {
                $scope.currentPage = 0;
                if (Level == 30) {
                    $scope.taskToFilter = 'Pending Client Approval'
                    $scope.contentStatus = '11';
                    $scope.returnedData = $.grep($scope.manageContentDatas, function (element, index) {
                        return element.StatusName == 'Pending Client Approval';
                    })
                } else {

                    $scope.taskToFilter = 'Pending Editor Approval'
                    $scope.contentStatus = '1';
                    $scope.returnedData = $.grep($scope.manageContentDatas, function (element, index) {
                        return element.StatusName == 'Pending Editor Approval';
                    })
                };

            } else if ($routeParams.status == 'Posted') {
                $scope.currentPage = 0;
                $scope.taskToFilter = 'Posted'
                $scope.contentStatus = '5';
                $scope.returnedData = $.grep($scope.manageContentDatas, function (element, index) {
                    return element.StatusName == 'Posted';
                });
            } else if ($routeParams.status == 'Declined') {
                $scope.currentPage = 0;
                $scope.taskToFilter = 'Declined by Editor'
                $scope.contentStatus = '2';
                $scope.returnedData = $.grep($scope.manageContentDatas, function (element, index) {
                    return element.StatusName == 'Declined by Editor';
                });


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
        $scope.manageContentSort = function (asc, header) {

            if (asc) {
                $scope.manageContentDatas.sort(predicatByAsc(header));

            }
            if (!asc) {
                $scope.manageContentDatas.sort(predicatByDes(header));

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


            if ($scope.returnedData) {
                return Math.ceil($scope.returnedData.length / $scope.itemsPerPage) - 1;
            } else if ($scope.manageContentDatas) {
                return Math.ceil($scope.manageContentDatas.length / $scope.itemsPerPage) - 1;
            }

        }
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