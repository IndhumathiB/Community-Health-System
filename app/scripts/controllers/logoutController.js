'use strict';

angular.module('chsApp')
  .controller('logoutController', function ($scope,$rootScope,$cookies,growl) {
              $rootScope.bodylayout = '';

                $rootScope.user_name= window.localStorage['user_name'];
                   $rootScope.NotificationCount= window.localStorage['NotificationCount'];
/*Logout fun*/
        $rootScope.logout = function () {  
             $cookies.remove('levelName');  
             $cookies.remove('consumerSecret'); 
             $cookies.remove('userName'); 
             $cookies.remove('Id'); 
             $cookies.remove('Level');
             $cookies.remove('consumerKey');
              $cookies.remove('role_authorization');
          $rootScope.showSideBar=false;
          $cookies.remove('role_authorization');
            
            window.location=folderName+'/';
            window.localStorage['consumer_key'] = '';
            window.localStorage['consumerSecret'] = '';
            window.localStorage['id'] = '';
            window.localStorage['Level'] = '';
               window.localStorage['user_name'] = '';
 window.localStorage['cuisineList'] = '';
  window.localStorage['NotificationCount'] ='';
               
        };
  
 
        /*end of Logout fun*/
});