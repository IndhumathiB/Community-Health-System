'use strict';

angular.module('chsApp')
.controller('sideMenuCtrl', function ($scope,$rootScope,$cookies,$location) {
$rootScope.bodylayout = '';
$scope.showSideBar=true;
$scope.isActive = function (viewLocation) { 
return viewLocation === $location.path();
};

$scope.fnShowSpace=function(val){

return val.replace(/([a-z])([A-Z])/g, '$1 $2');
}

$(function () {
$('[data-toggle="tooltip"]').tooltip()
});



$(".nav[data-accordion]").on( "click", "li", function( event ) {
if($(this).hasClass("current")) {
} else {
$(".nav[data-accordion] li").removeClass("current");
$(this).addClass("current");
}



});


});

