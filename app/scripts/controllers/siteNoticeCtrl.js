'use strict';

angular.module('chsApp')
  .controller('siteNoticesCtrl', function ($scope,$http,$rootScope,$location,$cookies,APIs,growl) {
       
$rootScope.showSideBar=true;
      
       $scope.submitted = false;                
       $rootScope.slideDownAlertBox = '';
       var config = {};
       $rootScope.bodylayout = '';
      
          $rootScope.resetURL=function()
    {       
        $scope.shortedUrl='';
        $scope.longUrl='';
    }
   $scope.siteNoticeDatas=[];


            $scope.cancelUser=function()
            {
                    $scope.hideAddUserForm=false; 
                    $scope.hideNavBar=false;
                    $scope.editForm=false;
           }

        $scope.EnterPriseAdmin=true;
        $scope.Supervisor=true;
        $scope.Client=true;
        $scope.FreelanceWriter=true;
        $scope.BallyWhoAdmin=true;
        $scope.showHospitalField=false;
        $scope.showSaveButton=true;
        $scope.editForm=false;
        $scope.hideAddUserForm=false;
        var consumer_key =   window.localStorage['consumer_key'];
        var consumerSecret = window.localStorage['consumerSecret'] ;
        var id =  window.localStorage['id'] ;
        var Level =  window.localStorage['Level'] ;

         $scope.ShowAdminForm=false;
        if (Level==90) {
          $scope.ShowAdminForm=true;
        };

    
    
     if(consumerSecret!=undefined || consumer_key!=undefined){
        if(consumer_key.length==0 || consumerSecret.length==0)
    {
     
        window.location='/#/login';
        return;
       
    } 
    }
    else{
         window.location='/#/login';
        return;
    }
        /*end of Global Var*/
    
    
      $scope.$watch('showItems', function (newVal, oldVal) {      
            
            if (!newVal || newVal==false) {
               $scope.Refresh();
              return;
            }else {
              $scope.ShowArchivedNotices1();
            }
          });
    

        


var permissions=[];
        /*Refresh Grid*/
        $scope.Refresh=function()
            {
                        var user={
                             'user_id': parseInt(id),
                             'user_level': parseInt(Level)
                             };

                        var url=GetAllNotices;
                        var method='POST';
                        var oAuthDatas=authSignature(consumer_key,consumerSecret,url,method);
                        var params={
                          'oauth_consumer_key':oAuthDatas.msgParameters[0][1],
                        'oauth_signature_method':oAuthDatas.msgParameters[1][1],
                        'oauth_version':oAuthDatas.msgParameters[2][1],
                        'oauth_timestamp':oAuthDatas.msgParameters[3][1],
                        'oauth_nonce':oAuthDatas.msgParameters[4][1],
                        'oauth_signature':oAuthDatas.msgParameters[5][1]
                        };
                        var authorizationHeader = OAuth.getAuthorizationHeader(oAuthDatas.relam, oAuthDatas.msgParameters);  
                        APIs.GetAllNotices(user,params,authorizationHeader)
                        .success(function(data,status) {  
                            $scope.siteNoticeDatas=data.ManageNotice;
                            $scope.clientNames=data.client;  
                            return;

                        }).error(function(data, status){
                            $rootScope.slideDownAlertBox = 'slideDown';
                         growl.addErrorMessage('Something went wrong! Please try again later.',config);
                        });    
            };
        
        // $scope.Refresh();
    
    
                 $scope.ShowArchivedNotices1=function()
                       {
                        var url=serviceUrlBase + 'SiteManagement.svc/ShowArchivedNotices';
                        var method='GET';
                        var oAuthDatas=authSignature(consumer_key,consumerSecret,url,method);
                        var params={
                        'oauth_consumer_key':oAuthDatas.msgParameters[0][1],
                        'oauth_signature_method':oAuthDatas.msgParameters[1][1],
                        'oauth_version':oAuthDatas.msgParameters[2][1],
                        'oauth_timestamp':oAuthDatas.msgParameters[3][1],
                        'oauth_nonce':oAuthDatas.msgParameters[4][1],
                        'oauth_signature':oAuthDatas.msgParameters[5][1]
                        };
                        var authorizationHeader = OAuth.getAuthorizationHeader(oAuthDatas.relam, oAuthDatas.msgParameters);  
                        APIs.showArchivedNotices(params,authorizationHeader)
                        .success(function(data,status) {
                        $scope.siteNoticeDatas=data;

                        }).error(function(data, status){
                            $rootScope.slideDownAlertBox = 'slideDown';
                         growl.addErrorMessage('Something went wrong! Please try again later.',config);
                        });    
            };

                 $scope.UpdateStatus1=function(idValue)
            {
                      var id={
                        'id': idValue,            
                        'status':9
                        };
                        var url=UpdateNoticeStatus;
                        var method='POST';
                        var oAuthDatas=authSignature(consumer_key, consumerSecret,url,method);
                        var params={
    'oauth_consumer_key':oAuthDatas.msgParameters[0][1],
                        'oauth_signature_method':oAuthDatas.msgParameters[1][1],
                        'oauth_version':oAuthDatas.msgParameters[2][1],
                        'oauth_timestamp':oAuthDatas.msgParameters[3][1],
                        'oauth_nonce':oAuthDatas.msgParameters[4][1],
                        'oauth_signature':oAuthDatas.msgParameters[5][1]
                        };
                        var authorizationHeader = OAuth.getAuthorizationHeader(oAuthDatas.relam, oAuthDatas.msgParameters);      
                          APIs.UpdateNoticeStatus(id,params,authorizationHeader)
                          .success(function(data,status) {
                                if(status == 200)
                                {
   $scope.showItems=false;
                 $rootScope.slideDownAlertBox = 'slideDown';
                growl.addSuccessMessage(data,config);
                                $scope.Refresh();
                                }
                            })
                            .error(function(data, status){
   $rootScope.slideDownAlertBox = 'slideDown';
                         growl.addErrorMessage('Something went wrong! Please try again later.',config);

                            });
          };


          $scope.ActiveUpdateStatus=function(idValue){
              var id={
                                'id': idValue,            
                                'status':0
                                };
                                var url=ActiveUpdateStatus1;
                                var method='POST';
                                var oAuthDatas=authSignature(consumer_key, consumerSecret,url,method);
                                var params={
                                  'oauth_consumer_key':oAuthDatas.msgParameters[0][1],
                        'oauth_signature_method':oAuthDatas.msgParameters[1][1],
                        'oauth_version':oAuthDatas.msgParameters[2][1],
                        'oauth_timestamp':oAuthDatas.msgParameters[3][1],
                        'oauth_nonce':oAuthDatas.msgParameters[4][1],
                        'oauth_signature':oAuthDatas.msgParameters[5][1]
                                };
                                var authorizationHeader = OAuth.getAuthorizationHeader(oAuthDatas.relam, oAuthDatas.msgParameters);      
                                  APIs.ActiveUpdateStatus1(id,params,authorizationHeader)
                                  .success(function(data,status) {
                                        if(status == 200)
                                        {
          $scope.showItems=false;
                            $rootScope.slideDownAlertBox = 'slideDown';
                growl.addSuccessMessage(data,config);
                                        $scope.Refresh();
                                        }
                                    })
                                    .error(function(data, status){
           $rootScope.slideDownAlertBox = 'slideDown';
                         growl.addErrorMessage('Something went wrong! Please try again later.',config);

                                    });
          };

          $scope.DeActiveUpdateStatus=function(idValue){
             var id={
                                'id': idValue,            
                                'status':1
                                };
                                var url=DeActiveUpdateStatus1;
                                var method='POST';
                                var oAuthDatas=authSignature(consumer_key, consumerSecret,url,method);
                                var params={
                                  'oauth_consumer_key':oAuthDatas.msgParameters[0][1],
                        'oauth_signature_method':oAuthDatas.msgParameters[1][1],
                        'oauth_version':oAuthDatas.msgParameters[2][1],
                        'oauth_timestamp':oAuthDatas.msgParameters[3][1],
                        'oauth_nonce':oAuthDatas.msgParameters[4][1],
                        'oauth_signature':oAuthDatas.msgParameters[5][1]
                                };
                                var authorizationHeader = OAuth.getAuthorizationHeader(oAuthDatas.relam, oAuthDatas.msgParameters);      
                                  APIs.DeActiveUpdateStatus1(id,params,authorizationHeader)
                                  .success(function(data,status) {
                                        if(status == 200)
                                        {
           $scope.showItems=false;
                $rootScope.slideDownAlertBox = 'slideDown';
                growl.addSuccessMessage(data,config);
                                        $scope.Refresh();
                                        }
                                    })
                                    .error(function(data, status){
           $rootScope.slideDownAlertBox = 'slideDown';
                         growl.addErrorMessage('Something went wrong! Please try again later.',config);

                                    });
          };


    

    
    
        $scope.UpdateNoticeStatus=function(idValue)
                       {
                       var id={
                        'id': idValue,            
                        'status':9
                        };
                        var url=UpdateNoticeStatus;
                        var method='POST';
                        var oAuthDatas=authSignature(consumer_key, consumerSecret,url,method);
                        var params={
                          'oauth_consumer_key':oAuthDatas.msgParameters[0][1],
                        'oauth_signature_method':oAuthDatas.msgParameters[1][1],
                        'oauth_version':oAuthDatas.msgParameters[2][1],
                        'oauth_timestamp':oAuthDatas.msgParameters[3][1],
                        'oauth_nonce':oAuthDatas.msgParameters[4][1],
                        'oauth_signature':oAuthDatas.msgParameters[5][1]
                        };
                           var authorizationHeader = OAuth.getAuthorizationHeader(oAuthDatas.relam, oAuthDatas.msgParameters);      
                           APIs.UpdateNoticeStatus(id,params,authorizationHeader)
                          .success(function(data,status) {
                                if(status == 200)
                                {
                                  $scope.showItems=false;
                                    $rootScope.slideDownAlertBox = 'slideDown';
                                                         growl.addSuccessMessage(data,config);
                                $scope.Refresh();
                                }
                            })
                            .error(function(data, status){

                            $rootScope.slideDownAlertBox = 'slideDown';
                         growl.addErrorMessage('Something went wrong! Please try again later.',config);

                            });
          };

    $scope.ActiveNoticeStatus=function(idValue){
                         var id={
                                'id': idValue,            
                                'status':0
                                };
                                var url=ActiveNoticeStatus;
                                var method='POST';
                                var oAuthDatas=authSignature(consumer_key, consumerSecret,url,method);
                                var params={
                                   'oauth_consumer_key':oAuthDatas.msgParameters[0][1],
                        'oauth_signature_method':oAuthDatas.msgParameters[1][1],
                        'oauth_version':oAuthDatas.msgParameters[2][1],
                        'oauth_timestamp':oAuthDatas.msgParameters[3][1],
                        'oauth_nonce':oAuthDatas.msgParameters[4][1],
                        'oauth_signature':oAuthDatas.msgParameters[5][1]
                                };
                                var authorizationHeader = OAuth.getAuthorizationHeader(oAuthDatas.relam, oAuthDatas.msgParameters);      
                                  APIs.ActiveNoticeStatus(id,params,authorizationHeader)
                                  .success(function(data,status) {
                                        if(status == 200)
                                        {
                                           $scope.showItems=false;
                                             $rootScope.slideDownAlertBox = 'slideDown';
                                                         growl.addSuccessMessage(data,config);
                                        $scope.Refresh();
                                        }
                                    })
                                    .error(function(data, status){
$rootScope.slideDownAlertBox = 'slideDown';
                         growl.addErrorMessage('Something went wrong! Please try again later.',config);
                                    });
          };

          $scope.DeActiveNoticeStatus=function(idValue){
                            var id={
                                'id': idValue,            
                                'status':1
                                };
                                var url=DeActiveNoticeStatus;
                                var method='POST';
                                var oAuthDatas=authSignature(consumer_key, consumerSecret,url,method);
                                var params={
                                  'oauth_consumer_key':oAuthDatas.msgParameters[0][1],
                        'oauth_signature_method':oAuthDatas.msgParameters[1][1],
                        'oauth_version':oAuthDatas.msgParameters[2][1],
                        'oauth_timestamp':oAuthDatas.msgParameters[3][1],
                        'oauth_nonce':oAuthDatas.msgParameters[4][1],
                        'oauth_signature':oAuthDatas.msgParameters[5][1]
                                };
                                var authorizationHeader = OAuth.getAuthorizationHeader(oAuthDatas.relam, oAuthDatas.msgParameters);      
                                  APIs.DeActiveNoticeStatus(id,params,authorizationHeader)
                                  .success(function(data,status) {
                                        if(status == 200)
                                        {
                                            $rootScope.slideDownAlertBox = 'slideDown';
                                                         growl.addSuccessMessage(data,config);
                                        $scope.Refresh();
                                        $scope.showItems=false;
                                        }
                                    })
                                    .error(function(data, status){
                     $rootScope.slideDownAlertBox = 'slideDown';
                         growl.addErrorMessage('Something went wrong! Please try again later.',config);
                                    });
          };
    
          
            var timestamp1 = Number(new Date());
            $scope.nowdate = '\/Date(' + timestamp1 + ')\/';
          
            /*edit Notice Data*/
            $scope.editNotice=function(noticeDatas){  
              $scope.submitted=false;
              var val1=noticeDatas.ClientIDs;
              var data=val1.split(',').map(function(val1){return Number(val1);
                 });



                        $scope.showSaveButton=false;
                        $scope.editForm=true;
                        $scope.hideAddUserForm=true;                      
                        $scope.noticeId=noticeDatas.id;               
                        $scope.noticeMessage=noticeDatas.Message;
                        $scope.noticeClient=data;
                        $scope.noticeStatus=noticeDatas.Permissions;                                
                        $scope.noticeTitle=noticeDatas.Title;
                        $scope.noticeStatus=noticeDatas.Status;
                    
                };

             



              $scope.updateNotice=function(){
                    $scope.submitted = true; 
                        var url=updateNotice;
                         var method='POST';
                         var oAuthDatas=authSignature(consumer_key,consumerSecret,url,method);
                         var params={
                                 'oauth_consumer_key':oAuthDatas.msgParameters[0][1],
                        'oauth_signature_method':oAuthDatas.msgParameters[1][1],
                        'oauth_version':oAuthDatas.msgParameters[2][1],
                        'oauth_timestamp':oAuthDatas.msgParameters[3][1],
                        'oauth_nonce':oAuthDatas.msgParameters[4][1],
                        'oauth_signature':oAuthDatas.msgParameters[5][1]
                          };
                      
                          var authorizationHeader = OAuth.getAuthorizationHeader(oAuthDatas.relam, oAuthDatas.msgParameters); 
                           var listOdAddUserUpdate={
                                       'id':parseInt($scope.noticeId),
                                        'message':$scope.noticeMessage,
                                        'hospitalIDs':$scope.noticeClient.toString(),
                                        'status':parseInt($scope.noticeStatus),                             
                                        'title':$scope.noticeTitle,
                                        'SavingDate':$rootScope.SaveDateFormat

                           }

                  if(!$scope.noticeForm.$invalid)
                    {
                        APIs.updateNotice(listOdAddUserUpdate,params,authorizationHeader)
                        .success(function(data,status) {
                                  if (status==200) {
                                      $scope.noticeMessage='';          
                                              $scope.noticeStatus='';  
                                                $scope.noticeClient='';  
                                                $scope.noticeTitle='';  
                                         $rootScope.slideDownAlertBox = 'slideDown';
                                       growl.addSuccessMessage(data,config);
                                        $scope.hideAddUserForm=false;
                                        $scope.editForm=false;
                                          $scope.Refresh();
                                    }
                          }).error(function(data, status){
                          $rootScope.slideDownAlertBox = 'slideDown';
                         growl.addErrorMessage('Something went wrong! Please try again later.',config);
                            });
    }
                };
        /*end of edit Notice*/


        /*Add Notice*/
        $scope.AddNotice=function(){
          $scope.hideNavBar=false;
            $scope.showSaveButton=true;
            $scope.submitted = true; 
                          var listOdAddUser123={
                            'SavingDate':$scope.nowdate,
                            'message':$scope.noticeMessage,
                            'hospitalIDs':$scope.noticeClient.toString(),
                            'status':parseInt($scope.noticeStatus),                             
                            'title':$scope.noticeTitle
                             }
                          
                         var url=AddNotice;
                         var method='POST';
                         var oAuthDatas=authSignature( consumer_key, consumerSecret,url,method);
                         var params={
                               'oauth_consumer_key':oAuthDatas.msgParameters[0][1],
                        'oauth_signature_method':oAuthDatas.msgParameters[1][1],
                        'oauth_version':oAuthDatas.msgParameters[2][1],
                        'oauth_timestamp':oAuthDatas.msgParameters[3][1],
                        'oauth_nonce':oAuthDatas.msgParameters[4][1],
                        'oauth_signature':oAuthDatas.msgParameters[5][1]
                          };
                        var authorizationHeader = OAuth.getAuthorizationHeader(oAuthDatas.relam, oAuthDatas.msgParameters); 
                    if(!$scope.noticeForm.$invalid)
                    {
                       APIs.AddNotice(listOdAddUser123,params,authorizationHeader)
                      .success(function(data,status) {
                                      if (status==200) {
                                   
                                       $rootScope.slideDownAlertBox = 'slideDown';
                                       growl.addSuccessMessage(data,config);
                                            $scope.noticeMessage='';          
                                              $scope.noticeStatus='';  
                                              $scope.noticeClient='';  
                                        $scope.noticeTitle='';  
                                            $scope.hideAddUserForm=false;
                                            $scope.Refresh();
                                              $scope.hideNavBar=false;
                                          
                                          }
                        }).error(function(data, status){
                                       $rootScope.slideDownAlertBox = 'slideDown';
                         growl.addErrorMessage('Something went wrong! Please try again later.',config);
                                 
                         });
                    }
                 };

          $scope.newNotice=function()
          {
            
          };
          
    
    //Sorting
        $scope.siteNoticeSort = function (asc, header) {

            if (asc) {
                $scope.siteNoticeDatas.sort(predicatByAsc(header));

            }
            if (!asc) {
                $scope.siteNoticeDatas.sort(predicatByDes(header));

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

        $scope.showAddForm=function()
                  {

                                            $scope.noticeMessage='';          
                                              $scope.noticeStatus='0';  
                                              $scope.noticeClient='';  
                                        $scope.noticeTitle='';  
                      $scope.hideAddUserForm=true;                     
                      $scope.hideNavBar=true;
                       $scope.submitted=false;
                  }
    

    //Pagination
  
        $scope.currentPage = 0;
        $scope.itemsPerPage = 5;

      $scope.predisable=false;
        $scope.nextdisable=false;
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
                      $scope.nextdisable=false;
                    $scope.currentPage--;
                }
            };

            $scope.DisablePrevPage = function () {
              
               return $scope.currentPage == 0 ? 'btn-disabled' : '';
            };

            $scope.pageCount = function () {
                
                
                    return Math.ceil($scope.siteNoticeDatas.length / $scope.itemsPerPage) - 1;
              
              
            };

            $scope.nextPage = function () {
            
                
                if ($scope.currentPage < $scope.pageCount()) {
                    $scope.currentPage++;
                    $scope.predisable=false;
                }
            };

            $scope.DisableNextPage = function () {
        
           return $scope.currentPage == $scope.pageCount() ? 'btn-disabled' : '';
            };

            $scope.setPage = function (n) {
                $scope.currentPage = n;
            };


});

