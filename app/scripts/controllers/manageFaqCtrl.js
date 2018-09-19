'use strict';

angular.module('chsApp')
    .controller('manageFaqCtrl', function ($scope, $http, $rootScope, $location, $cookies, APIs, growl) {

        $scope.submitted = false;

        $rootScope.showSideBar = true;


        $rootScope.slideDownAlertBox = '';
        var config = {};


        $rootScope.bodylayout = '';

        $scope.submitted = false;



        $scope.cancelUser = function () {
            $scope.hideAddUserForm = false;
            $scope.hideNavBar = false;
            $scope.editForm = false;
        };
        $scope.FaqListData = [];
        var id = window.localStorage['id'];
        var Level = window.localStorage['Level'];
        var consumer_key = window.localStorage['consumer_key'];
        var consumerSecret = window.localStorage['consumerSecret'];
        var id = window.localStorage['id'];
        var Level = window.localStorage['Level'];

        $scope.ShowAdminForm = false;
        if (Level == 90) {
            $scope.ShowAdminForm = true;
        };
        if (Level == 50 || Level == 30 || Level != 90 || Level == 20 || Level == 70) {
            $scope.ShowAdminForm = true;
            $scope.AdminPage = true;
        } else {
            $scope.ShowAdminForm = true;
            $scope.AdminPage = false;
        }



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
                //  'user_id': id,
                'user_level': Level
            };

            var url = GetAllManageFaq;
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
            APIs.GetAllManageFaq(user, params, authorizationHeader)
                .success(function (data, status) {

                    //  console.log('data',data);
                    $scope.FaqListData = data.FaqList;
                    $scope.FaqListDataLevels = data.Levels;
                    $scope.rssCategorySelection = data.Category;

                }).error(function (data, status) {
                    $rootScope.slideDownAlertBox = 'slideDown';
                    growl.addErrorMessage('Something went wrong! Please try again later.', config);
                });
        };

        $scope.Refresh();


        $scope.Reset = function () {
            $scope.siteclientType = '';

            $scope.Refresh();

            $scope.currentPage = 0

        };

        //getbyid.....
        $scope.GetRssFeedById1 = function (rssData) {
            $scope.showSaveButton = false;
            $scope.editForm = true;
            $scope.hideAddUserForm = true;


            $scope.clientId = rssData;

            var user = {
                'id': rssData
            };

            var url = GetFaqById + '/' + rssData;
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
            APIs.GetFaqById(user, params, authorizationHeader)
                .success(function (data, status) {
                    if (status == 200) {
                        $scope.answer = data.answer;
                        $scope.category = data.category;
                        $scope.level = data.level;
                        $scope.question = data.question;
                        $scope.status = Number(data.status);
                        $scope.sdate = data.saveDate;

                    };

                }).error(function (data, status) {
                    $rootScope.slideDownAlertBox = 'slideDown';
                    growl.addErrorMessage('Something went wrong! Please try again later.', config);
                });


        }


        $scope.editclientSubmit = function () {

            $scope.submitted = true;
            var url = UpdateFaq;
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
            var listOdAddUserUpdate = {
                'id': parseInt($scope.clientId),
                'answer': $scope.answer,
                'category': $scope.category,
                'level': $scope.level,
                'question': $scope.question,
                'saveDate': $rootScope.SaveDateFormat,
                'status': parseInt($scope.status)

            }


            if (!$scope.createfaquser.$invalid) {
                APIs.UpdateFaq(listOdAddUserUpdate, params, authorizationHeader)
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

                    });

            }
        };



        //shw archieved 

        $scope.$watch('showItems', function (newVal, oldVal) {
            if (!newVal || newVal == false) {
                $scope.Refresh();
            } else {
                $scope.showAchievedItems();
            }

        });

        $scope.showAchievedItems = function () {
            var url = ShowArchivedFaq;
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
            APIs.ShowArchivedFaq(params, authorizationHeader)
                .success(function (data, status) {           
                    $scope.FaqListData = data;
                }).error(function (data, status) {
                    $rootScope.slideDownAlertBox = 'slideDown';
                    growl.addErrorMessage('Something went wrong! Please try again later.', config);
                });
        };



        $scope.UpdateStatus9 = function (idValue) {
            var id = {
                'id': idValue,
                      
                'status': 9
            };
            var url = UpdateFaqStatus;
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
            APIs.UpdateFaqStatus(id, params, authorizationHeader)
                .success(function (data, status) {
                    if (status == 200) {
                        $scope.showItems = false;
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


        $scope.UpdateStatus1 = function (idValue) {
            var id = {
                'id': idValue,
                      
                'status': 1
            };
            var url = UpdateFaqStatus;
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
            APIs.UpdateFaqStatus(id, params, authorizationHeader)
                .success(function (data, status) {
                    if (status == 200) {
                        $scope.showItems = false;
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


        $scope.UpdateStatus0 = function (idValue) {
            var id = {
                'id': idValue,
                      
                'status': 0
            };
            var url = UpdateFaqStatus;
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
            APIs.UpdateFaqStatus(id, params, authorizationHeader)
                .success(function (data, status) {
                    if (status == 200) {
                        $scope.showItems = false;
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


        $scope.ActiveUpdateStatus = function (idValue) {
            var id = {
                'user_id': idValue,
                      
                'status': 1
            };
            var url = ActiveUpdateStatus1;
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
            APIs.ActiveUpdateStatus1(id, params, authorizationHeader)
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

        $scope.DeActiveUpdateStatus = function (idValue) {
            var id = {
                'user_id': idValue,
                      
                'status': 0
            };
            var url = DeActiveUpdateStatus1;
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
            APIs.DeActiveUpdateStatus1(id, params, authorizationHeader)
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


        $scope.FilterByClient1 = function (valu) {
            var id = {
                'level': Level,
                      
                'category': valu
            };
            var url = FilteredFaq;
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
            APIs.FilteredFaq(id, params, authorizationHeader)
                .success(function (data, status) {
                    if (status == 200) {

                        if (data.length == 0) {
                            $rootScope.slideDownAlertBox = 'slideDown';
                            growl.addErrorMessage('No matched content for selected ' + valu.toUpperCase() + ' Category', config);
                            $scope.FaqListData = data;
                        } else {
                            $scope.FaqListData = data;
                        }


                    }
                })
                .error(function (data, status) {
                    $rootScope.slideDownAlertBox = 'slideDown';
                    growl.addErrorMessage('Something went wrong! Please try again later.', config);
                });
        };




        $scope.AddClient = function () {
            $scope.submitted = true;
            var listOdAddUser123 = {
                'answer': $scope.answer,
                'category': $scope.category,
                'level': $scope.level,
                'question': $scope.question,
                'saveDate': $rootScope.SaveDateFormat,
                'status': parseInt($scope.status)


            }


            var url = AddFaq;
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

            if (!$scope.createfaquser.$invalid) {
                APIs.AddFaq(listOdAddUser123, params, authorizationHeader)
                    .success(function (data, status) {
                        if (status == 200) {
                            //

                            $scope.hideAddUserForm = false;
                            $rootScope.slideDownAlertBox = 'slideDown';
                            growl.addSuccessMessage(data, config);

                            $scope.hideNavBar = false;
                            $scope.Refresh();
                            $scope.hideAddUserForm = false;
                        }
                    }).error(function (data, status) {
                        $rootScope.slideDownAlertBox = 'slideDown';
                        growl.addErrorMessage('Something went wrong! Please try again later.', config);           

                    });

            }
        };


        $scope.showAddForm = function () {
            $scope.answer = '';
            $scope.sdate = '';
            $scope.category = '';
            $scope.level = '';
            $scope.question = '';
            $scope.status = '0';


            $scope.submitted = false;

            $scope.hideAddUserForm = true;
            $scope.showSaveButton = true;
            $scope.hideNavBar = true;
        }





        //Sorting
        $scope.rssFeedSort = function (asc, header) {

            if (asc) {
                $scope.FaqListData.sort(predicatByAsc(header));

            }
            if (!asc) {
                $scope.FaqListData.sort(predicatByDes(header));

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


            return Math.ceil($scope.FaqListData.length / $scope.itemsPerPage) - 1;


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