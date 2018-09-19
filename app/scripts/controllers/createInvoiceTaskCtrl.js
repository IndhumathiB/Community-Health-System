'use strict';

angular.module('chsApp')
    .controller('createInvoiceTaskCtrl', function ($scope, $http, $rootScope, $filter, $location, $cookies, APIs, growl) {

        $rootScope.showSideBar = true;
        $rootScope.bodylayout = '';
        $scope.submitted = false;
        $scope.editForm = false;

        $scope.checkAll = function () {
            if ($scope.selectedAll) {
                $scope.selectedAll = true;
            } else {
                $scope.selectedAll = false;
            }
            angular.forEach($scope.packageInvoiceDetails, function (invoiceDatas) {
                invoiceDatas.Selected = $scope.selectedAll;

            });

        };

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

        $rootScope.resetURL = function () {
            $scope.shortedUrl = '';
            $scope.longUrl = '';

        };

        $scope.cancelUser = function () {
            $scope.hideAddUserForm = false;
            $scope.hideNavBar = false;
            $scope.editForm = false;
            $scope.selectedAll = false;
        };

        $('#timePicker input[type=text]').addClass('form-control');
        $('#timePicker div').addClass('timepick');

        $scope.packageInvoiceDetails = [];


        var id =  window.localStorage['id'];
        var Level =  window.localStorage['Level']; 
        var consumer_key =  window.localStorage['consumer_key'];
        var consumerSecret = window.localStorage['consumerSecret'];
        var id =  window.localStorage['id'];
        var Level =  window.localStorage['Level'];
        $scope.ShowAdminForm = false;
        if (Level == 90) {
            $scope.ShowAdminForm = true;
        };

        $scope.checkAll = function () {
            if ($scope.selectedAll) {
                $scope.selectedAll = true;
            } else {
                $scope.selectedAll = false;
            }
            angular.forEach($scope.packageInvoiceDetails, function (invoiceDatas) {
                invoiceDatas.Selected = $scope.selectedAll;
            });

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


            var url = GetAllTasks;
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
            APIs.GetAllTasks(params, authorizationHeader)
                .success(function (data, status) {           
                    $scope.packageInvoiceDetails = data.packageInvoiceDetails;
                    $scope.StatusLists = data.StatusLists;
                    $scope.PlatformLists = data.PlatformLists;
                    $scope.EditorLists = data.EditorLists;
                    $scope.ClientLists = data.ClientLists;
                    $scope.CategoryLists = data.CategoryLists;
                    $scope.WritersList = data.WritersList;           

                }).error(function (data, status) {
                    $rootScope.slideDownAlertBox = 'slideDown';
                    growl.addErrorMessage('Something went wrong! Please try again later.', config);
                });  
        };

        $scope.Refresh();
        /*end of Refresh Grid*/

        //The default fillter start/End datetime should be on last month first/ last date.
        var date = new Date();
        var stDate = new Date(date.getFullYear(), date.getMonth() - 1, 1);
        var enDate = new Date(date.getFullYear(), date.getMonth(), 0);

        $scope.invceStartDate = $rootScope.ConvertDateFormat(stDate);
        $scope.invceEndDate = $rootScope.ConvertDateFormat(enDate);

        $scope.FilterInvoiceDatas = function () { 
            var url = FilterByTask;
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

                'writerID': $scope.invceWriterName,
                'startDate': $scope.invceStartDate,
                'endDate': $scope.invceEndDate
            }

            APIs.FilterByTask(data, params, authorizationHeader)
                .success(function (data, status) {
                    if (status == 200) {
                        $scope.packageInvoiceDetails = data.packageInvoiceDetails;
                    }
                }).error(function (data, status) {
                    $rootScope.slideDownAlertBox = 'slideDown';
                    growl.addErrorMessage('Something went wrong! Please try again later.', config);   

                });


        };

        $scope.showAddForm = function () {
            $scope.saveForm = false;
            $scope.invcTitle = '';
            $scope.invcBrief = '';
            $scope.invcAmount = '';
            $scope.invcCategory = '';
            $scope.invcWriter = '';
            $scope.invcEditor = '';
            $scope.invcClient = '';
            $scope.invcPlatform = '';
            $scope.invcduDate = '';
            $scope.invcShdulsDate = '';
            $scope.invcStatus = '';
            $scope.invcfbmicro = '';
            $scope.invcfbdes = '';
            $scope.invcfblink = '';
            $scope.invcfbtitle = '';
            $scope.invcNotes = '';
            $scope.twmicro = '';
            $scope.invcblogContent = '';
            $scope.invcBlogtags = '';
            $scope.invcblogtitle = '';


            $scope.hideAddUserForm = true;
            $scope.showSaveButton = true;
            $scope.hideNavBar = true;
        };

        $scope.showSaveButton = true;
        //reset Filter Function
        $scope.emptyFilterInvoiceDatas = function () {
            $scope.Refresh();   
            $scope.invceWriterName = ''; 
            // $scope.invceStartDate='';
            // $scope.invceEndDate='';
            $scope.selectedAll = false;

        };

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





        var indices = [];
        $scope.GetTask = function (val) {
            indices.push(val);
            $scope.Indxval = val;
        };
        $scope.GetInvoiceWritingTask = function (invoiceDatas) {

            $scope.showSaveButton = false;
            $scope.editForm = true;
            $scope.hideAddUserForm = true;
            $scope.invoiceId = invoiceDatas;

            var user = {
                'id': invoiceDatas
            };

            var url = GetInvoiceWritingTask + '/' + invoiceDatas;
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
            var authorizationHeader = OAuth.getAuthorizationHeader('', oAuthDatas.msgParameters);  
            APIs.GetInvoiceWritingTask(user, params, authorizationHeader, invoiceDatas)
                .success(function (data, status) {
                    if (status == 200) {
                        $scope.editForm = true;
                        $scope.imagename = data.imageName;
                        $scope.TaskimgLink = "data:image/png;base64, " + data.imageStream;
                        $scope.invcTitle = data.title
                        $scope.invcBrief = data.descr;
                        $scope.invcAmount = data.amount;
                        $scope.invcCategory = data.categoryID;
                        $scope.invcWriter = data.writerID;
                        $scope.invcEditor = data.editorID;
                        $scope.invcClient = data.clientID;
                        $scope.invcPlatform = data.platformCode;
                        $scope.invcduDate = data.dueDate;
                        $scope.invcStatus = data.status;
                        $scope.invcfbmicro = data.fb_body;
                        $scope.invcfbdes = data.fb_descr;
                        $scope.invcfblink = data.fb_link;
                        $scope.invcfbtitle = data.fb_title;
                        $scope.invcNotes = data.notes;
                        $scope.twmicro = data.tw_body;
                        $scope.invcblogContent = data.wp_content;
                        $scope.invcBlogtags = data.wp_tag;
                        $scope.invcblogtitle = data.wp_title;
                        $scope.invcDeclineReason = data.reason;
                        $scope.invcSaveDate = data.saveDate;
                        $scope.invcCreatedby = data.createdBy;
                        var split = data.scheduleDate.split(' ');
                        $scope.invcShdulsDate = split[0];


                        var splits = split[1].split(':');
                        $scope.ctrl1.stime = splits[0] + ':' + splits[1];
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





                        if (data.platform == 'Facebook') {
                            $scope.dispalyFBContent = true;
                            $scope.dispalyTWContent = false;
                            $scope.dispalyBlogContent = false;
                            $scope.fbmicro = data.fb_body;
                            $scope.fbtitle = data.fb_title;
                            $scope.fbtitlelink = data.fb_action_link;
                            $scope.fbdesq = data.fb_descr;
                            //    $scope.micro=  data.fb_body;
                            $scope.fbPic = data.fb_picture;
                            $scope.gridID = data.memberID;

                        } else if (data.platform == 'Twitter') {
                            $scope.dispalyTWContent = true;
                            $scope.dispalyBlogContent = false;
                            $scope.dispalyFBContent = false;
                            $scope.twmicro = data.tw_body;
                            $scope.twPic = data.tw_picture;

                        } else if (data.platform == 'Blog') {
                            $scope.dispalyBlogContent = true;
                            $scope.dispalyFBContent = false;
                            $scope.dispalyTWContent = false;
                            $scope.btitle = data.wp_title;
                            $scope.htmlcontent = data.wp_content;
                            $scope.tags = data.wp_tag;
                            $scope.blFile = data.wp_picture;


                        };


                    };

                }).error(function (data, status) {
                    $rootScope.slideDownAlertBox = 'slideDown';
                    growl.addErrorMessage('Something went wrong! Please try again later.', config);
                });  


        };

        $scope.invcFBmyfile = [];
        $scope.invctwmyfile = [];
        $scope.wpmyfile = [];

        $scope.UpdateWritingInvoices = function () {

            $scope.invcShdulsDate1 = $scope.invcShdulsDate + ' ' + $scope.ctrl1.stime;

            $scope.submitted = false;

            var url = UpdateWritingInvoices;
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
                'id': parseInt($scope.invoiceId),
                'title': $scope.invcTitle,
                'descr': $scope.invcBrief,
                'amount': parseInt($scope.invcAmount),
                'categoryID': parseInt($scope.invcCategory),
                'writerID': parseInt($scope.invcWriter),
                'editorID': parseInt($scope.invcEditor),
                'clientID': parseInt($scope.invcClient),
                'dueDate': $scope.invcduDate,
                'scheduleDate': $scope.invcShdulsDate1,
                'status': parseInt($scope.invcStatus),
                'notes': $scope.invcNotes,
                'reason': 'test',
                'saveDate': $rootScope.SaveDateFormat
            };

            if ($scope.invcPlatform == 'fb') {
                $scope.dispalyTWContent = false;
                $scope.dispalyBlogContent = false;
                $scope.dispalyFBContent = true;
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
                listOdAddUser.fb_body = $scope.invcfbmicro;
                listOdAddUser.fb_descr = $scope.invcfbdes;
                listOdAddUser.fb_link = $scope.invcfblink;
                listOdAddUser.fb_title = $scope.invcfbtitle;

            }
            if ($scope.invcPlatform == 'tw') {
                $scope.dispalyTWContent = true;
                $scope.dispalyBlogContent = false;
                $scope.dispalyFBContent = false;

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

            if ($scope.invcPlatform == 'wp') {
                $scope.dispalyTWContent = false;
                $scope.dispalyBlogContent = true;
                $scope.dispalyFBContent = false;

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
                listOdAddUser.wp_content = $scope.invcblogContent;
                listOdAddUser.wp_tag = $scope.invcBlogtags;
                listOdAddUser.wp_title = $scope.invcblogtitle;

            }

            APIs.UpdateWritingInvoices(listOdAddUser, params, authorizationHeader)
                .success(function (data, status) {
                    if (status == 200) {
                        $scope.editForm = false;
                        $scope.Refresh();
                        $rootScope.slideDownAlertBox = 'slideDown';
                        growl.addSuccessMessage(data, config);
                        $scope.hideAddUserForm = false;
                    }
                }).error(function (data, status) {
                    $rootScope.slideDownAlertBox = 'slideDown';
                    growl.addErrorMessage('Something went wrong! Please try again later.', config);
                });
        }


        $scope.AddInvoice = function () {

            $scope.albumNameArray = $filter('filter')($scope.packageInvoiceDetails, {
                Selected: true
            }, true);

            var ar = [];
            for (var i = 0; i < $scope.albumNameArray.length; i++) {
                ar.push($scope.albumNameArray[i].id);
            };



            var invoiceData = {
                'memberId': parseInt(id),
                'taskIds': ar.toString()
            }


            var url = CreateInvoices;
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
            APIs.CreateInvoices(invoiceData, params, authorizationHeader)
                .success(function (data, status) {
                    if (status == 200 || status == 201) {                                         
                        $rootScope.slideDownAlertBox = 'slideDown';
                        growl.addSuccessMessage(data, config);
                        $scope.hideAddUserForm = false;
                        $scope.invceWriterName = ''; 
                        $scope.selectedAll = false;
                        $scope.Refresh();
                    }
                }).error(function (data, status) {
                    $rootScope.slideDownAlertBox = 'slideDown';
                    growl.addErrorMessage('Something went wrong! Please try again later.', config);

                });
        }




        $rootScope.slideDownAlertBox = '';
        var config = {};




        //Sorting
        $scope.invoiceSort = function (asc, header) {

            if (asc) {
                $scope.PackageInvoiceDetails.sort(predicatByAsc(header));

            }
            if (!asc) {
                $scope.PackageInvoiceDetails.sort(predicatByDes(header));

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
        };

        function predicatByDes(prop) {
            return function (a, b) {
                if (a[prop] < b[prop]) {
                    return 1;
                } else if (a[prop] > b[prop]) {
                    return -1;
                }
                return 0;
            }
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

            if ($scope.PackageInvoiceDetails) {
                return Math.ceil($scope.PackageInvoiceDetails.length / $scope.itemsPerPage) - 1;
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