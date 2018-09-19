'use strict';

angular.module('chsApp')
  .controller('forgotPasswordCtrl', function ($scope,$http,$rootScope,$location,$cookies,APIs,growl) {
                  $rootScope.bodylayout = 'login';
    

        var consumer_key =   window.localStorage['consumer_key'];
        var consumerSecret = window.localStorage['consumerSecret'] ;
        var id =  window.localStorage['id'] ;
        var Level =  window.localStorage['Level'] ;
          
          $scope.forgotpassword=function()
            {
                        var user={
                             'email': $scope.emailId  };

                      
                        APIs.LogInServiceAuthForgotPwd(user)
                        .success(function(data,status) {
           $rootScope.slideDownAlertBox = 'slideDown';
                                                         growl.addSuccessMessage(data,config);
                        }).error(function(data, status){
                          if (status==400) {
                                $rootScope.slideDownAlertBox = 'slideDown';
                              growl.addErrorMessage('Please provide valid email address!',config);
                              }
                          else if (status==401) {
                                $rootScope.slideDownAlertBox = 'slideDown';
                              growl.addErrorMessage('This email address is not registered',config);
                            }else{
                              $rootScope.slideDownAlertBox = 'slideDown';
                               growl.addErrorMessage('Something went wrong. Please try again later',config);
                             }
                           
                        });    
            };


            $scope.cancelPassword=function(){
                window.location='/#/';
            };

      
       var config = {};
          $rootScope.slideDownAlertBox = '';
    
  });





