'use strict';

angular.module('chsApp')
    .controller('DashboardWriterCtrl', function ($scope,$http,$rootScope,$compile,$routeParams,$filter,$location,$cookies,APIs,growl,uiCalendarConfig,moment) {


$rootScope.showSideBar=true;
$rootScope.slideDownAlertBox = '';
       var config = {};
 
              $rootScope.bodylayout = '';
$scope.chekdone=false; 
        
    $scope.submitted = false;
        
    $scope.Contents=[];
$scope.Clients=[];
                              $scope.Contents=[];
                              $scope.MonitoringReports=[];
                              $scope.NewsInformations=[];
                              $scope.Notices=[];
                              $scope.SocialChatters=[];
                              $scope.SocialMediaReports=[];
                              $scope.WriterJobs=[];
                              $scope.panelMonitoring=[];

        $scope.showAddForm=function()
                  {
                      $scope.submitted = false;
                            $scope.firstName='';
                            $scope.lname='';
                            $scope.emailId='';
                            $scope.userName='';
                            $scope.password='';
                            $scope.address='';
                            $scope.city='';
                            $scope.state='';
                            $scope.zip='';
                            $scope.phone='';
                            $scope.notes='';
                            
                            $scope.hideAddUserForm=true;
                            $scope.showSaveButton=true;
                            $scope.hideNavBar=true;
                  };


            $scope.cancelUser=function()
            {
                    $scope.hideAddUserForm=false; 
                    $scope.hideNavBar=false;
                    $scope.editForm=false;
           };

    
     //Short Url paclages   
        $scope.updateShortURL = function (longUrl,indexVal) {
            APIs.shortenURL(longUrl).success(function (data) {
             $scope.MainDiv1[indexVal].TwitterContent.shortedUrl = data;               
            });
        };

        //Reset url packages
        $scope.updateResetURL = function (indexVal) {         
            $scope.MainDiv1[indexVal].TwitterContent.shortedUrl = '';
            $scope.MainDiv1[indexVal].TwitterContent.longUrl = ''; 
        };
    
           $scope.shortURL=function(longUrl)
            {
              APIs.shortenURL(longUrl).success(function(data){
                  $scope.shortedUrl=data;

              });
            };
          $scope.resetURL=function()
            {      
                $scope.shortedUrl='';
                $scope.longUrl='';
            };

   $scope.WriterJobs=[];
//  $scope.isCollapsed = false;

        var id =  window.localStorage['id'] ;
         var Level =  window.localStorage['Level'] ;  
        var consumer_key =  window.localStorage['consumer_key'];
        var consumerSecret = window.localStorage['consumerSecret'] ;
             $scope.ShowAdminForm=false;
        if (Level==20) {
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
    /*Refresh Grid*/
        $scope.Refresh=function()
            {
                        var user={
                             'user_id': Number(id),
                             'user_level': Number(Level)
                             };

                        var url=serviceUrlBase + 'DashBoard.svc/GetAllDashBoardsDetails';
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
                        APIs.GetAllDashBoardsDetails1(user,params,authorizationHeader)
                        .success(function(data,status) {
                        
                            $scope.CalenderContents=data.CalenderContents;
                              $scope.Clients=data.Clients;
                              $scope.Contents=data.Contents;
                              $scope.MonitoringReports=data.MonitoringReports;
                              $scope.NewsInformations=data.NewsInformations;
                              $scope.Notices=data.Notices;
                              $scope.SocialChatters=data.SocialChatters;
                              $scope.SocialMediaReports=data.SocialMediaReports;
                              $scope.WriterJobs=data.WriterJobs;
                              $scope.panelMonitoring=data.panelMonitoring;

                              if (!$scope.WriterJobs) {
                               
                                $scope.hidewritterJobContent=true;
                              }else{
                                  $scope.hidewritterJobContent=false;
                                  $scope.WriterJobs=data.WriterJobs;
                              }
                          
        
                            
                        }).error(function(data, status){
                            $rootScope.slideDownAlertBox = 'slideDown';
                         growl.addErrorMessage('Something went wrong! Please try again later.',config);
                        });    
            };
        $scope.Refresh();
 

//Remove image Writing Task
     $scope.removetaskfb=function()
      {
          $scope.imagename='';
      $scope.TaskimgLink='';
        document.getElementById('taskfb').src='';  
      }
     $scope.removetasktwit=function()
      {
          $scope.imagename='';
      $scope.TaskimgLink='';
        document.getElementById('tasktwit').src='';  
      }
     $scope.removetaskblg=function()
      {
          $scope.imagename='';
      $scope.TaskimgLink='';
        document.getElementById('taskblg').src='';  
      }
     
//Remove image Packages
    $scope.removefacepackImg=function(fbindex)
      {
        if(!fbindex)
            {
                $scope.FacebookContent[0].fb_picture='';                                    
                 $scope.FacebookContent[0].imgLink='';
       document.getElementById('facepackImg').src=''; 
            }
        else{
            
             $scope.FacebookContent[fbindex].fb_picture='';
                 $scope.FacebookContent[fbindex].imgLink='';
       document.getElementById('facepackImg'+fbindex).src='';
          
        }
      }
    $scope.removefbipackImg=function(fbiindex)
      {
      if(!fbiindex)
            {
                $scope.FbImageContent[0].fb_picture='';
                 $scope.FbImageContent[0].imgLink='';
        document.getElementById('fbipackImg').src='';  
            }
         else{
            
             $scope.FbImageContent[fbiindex].fb_picture='';
                 $scope.FbImageContent[fbiindex].imgLink='';
         document.getElementById('fbipackImg1'+fbiindex).src='';
           
         }
      }
    $scope.removetwitpackImg=function(twitindex)
      {
      if(!twitindex)
            {
                $scope.TwitterContent[0].fb_picture='';
                 $scope.TwitterContent[0].imgLink='';
        document.getElementById('twitpackImg').src=''; 
            }
        else{
             
             $scope.TwitterContent[twitindex].fb_picture='';
                 $scope.TwitterContent[twitindex].imgLink='';
         document.getElementById('twitpackImg1'+twitindex).src='';
                 
            
        }
      }



             $scope.fnshowAll1=function(){

                 //  $scope.taskToFilter='';
    $scope.taskToFilter=undefined;

    $scope.Refresh();

            };

            $scope.fnAssigned1=function(){
    $scope.currentPage=0;
                      $scope.taskToFilter='Assigned';

                         $scope.returnedData = $.grep($scope.WriterJobs, function (element, index) {
              return element.status == 'Assigned';
              }); 


            }; 

            $scope.fnPending1=function(){
 $scope.currentPage=0;
                     $scope.taskToFilter='Pending Approval';

                                        $scope.returnedData = $.grep($scope.WriterJobs, function (element, index) {
              return element.status == 'Pending Approval';
              }); 


            };    
             $scope.fnApproved1=function(){
 $scope.currentPage=0;
                      $scope.taskToFilter='Approved';

                                        $scope.returnedData = $.grep($scope.WriterJobs, function (element, index) {
              return element.status == 'Approved';
              }); 

            };     


             $scope.fnDeclined1=function(){
 $scope.currentPage=0;
                        $scope.taskToFilter='Declined';

                           $scope.returnedData = $.grep($scope.WriterJobs, function (element, index) {
              return element.status == 'Declined';
              }); 

            }; 



  $scope.showSaveButtonMsg1=false;
                                       $scope.showSaveButton1=false;


          $scope.packageDetail1=function(title,platfrom,detailID){

              $scope.showContentSend=true;

 $scope.showSaveButton=false;
                        $scope.editForm=true;
                        $scope.hideAddUserForm=true;
              
                        $scope.id=detailID;

                        $scope.editId=detailID;

                        var url=GetContentsByPackageId;
                         var method='POST';
                         var oAuthDatas=authSignature( consumer_key, consumerSecret,url,method);
                         var params={
                                       'oauth_consumer_key':oAuthDatas.msgParameters[0][1],
                        'oauth_signature_method':oAuthDatas.msgParameters[1][1],
                        'oauth_version':oAuthDatas.msgParameters[2][1],
                        'oauth_timestamp':oAuthDatas.msgParameters[3][1],
                        'oauth_nonce':oAuthDatas.msgParameters[4][1],
                        'oauth_signature':oAuthDatas.msgParameters[5][1]
                          }
                      
                          var authorizationHeader = OAuth.getAuthorizationHeader(oAuthDatas.relam, oAuthDatas.msgParameters); 
                          var listOdAddUser1={
                           'packageId': detailID,
                    'platfrom':platfrom
                           }
                        APIs.GetContentsByPackageId(listOdAddUser1,params,authorizationHeader)
                        .success(function(data,status) {
                            
                        

                            if (data.status=='0') {
                                $scope.showContentIsReady=true;
                                  $scope.showDeclineReason=false;
                            }
                            if (data.status=='1' && Level==90) {
                              $scope.showDeclineReason=true;
                               $scope.showContentIsReady=true;
                            };


                                  if (status==200) {
                                
                               $scope.id=data.id;
                                    $scope.title=  title;
                                    $scope.ddate=  data.dueDate;
                                    $scope.sdate=   data.scheduleDate;
                                    // $scope.Status='Approved';
                                    $scope.editor=   data.editorName;
                                    $scope.writer=   data.writerName;
                                    $scope.client=   data.clientName;
                                    $scope.category =   data.category;
                                    $scope.Platform=  data.platform;
                                    $scope.amount=  data.amount;
                                    $scope.brife=  data.Brief;
                                    $scope.Notes=  data.notes;
                                    $scope.Logs=   data.logs;
                                    $scope.declineReason=data.reason;
                                    $scope.category=data.category;
                                    $scope.platformIdentity=data.platformIdentity;
                                    $scope.Archived=data.isArchived;
                                    $scope.singleDay=data.singleDay;



                                               $scope.packageDetails={
                             //,


                    'memberID':Number(id),
                    'amount': data.amount,
                    'clientID': data.clientID,
                    'clientName': data.clientName,
                    'dueDate': data.dueDate,
                    'editorID': data.editorID,
                    'editorName': data.editorName,
                    'id': data.id,
                    'isArchived': data.isArchived,
                    'isSingleDay': data.isSingleDay,
                    'is_fb': data.is_fb,
                    'is_tw': data.is_tw,
                    'memberID': data.memberID,
                    'name': data.name,
                    'notes': data.notes,
                    'platformIdentity':data.platformIdentity,
                    'posting_time': data.posting_time,
                    'saveDate': data.saveDate,
                    'startDate':data.startDate,
                    'status': data.status,
                    'writerID': data.writerID,
                    'writerName':data.writerName,
                   // 'isArchived':$scope.ArchivedVal
                    }
   if (data.status==0 || data.status==11 ||  data.status==3) {
                                      $scope.showSaveButton1=true;
                                         $scope.showSaveButtonMsg1=false;

                                                  $scope.showSaveButtonMsg=false;
                                       $scope.showSaveButton=false;
                                    };


                                        if (data.status==1) {
                                      // $scope.showSaveButtonMsg1=true;
                                      //  $scope.showSaveButton1=false;
    $scope.showSaveButtonMsg1=false;
                            $scope.showSaveButton1=true;
                                                $scope.showSaveButtonMsg=false;
                                       $scope.showSaveButton=false;
                                    };
                       

                                    //  alert(data.isSingleDay);
                                      
                                         $scope.dispalyFBContent=false;
                                         $scope.dispalyTWContent=false;
                                               $scope.dispalyBlogContent=false;
                                    if (data.isSingleDay=='0') {
    $scope.UpdateshowOnlySevenDayPackage=true;
     $scope.UpdateshowOnlySingleDayPackage=false;
  }

  if (data.isSingleDay=='1') {

       $scope.UpdateshowOnlySingleDayPackage=true;
        $scope.UpdateshowOnlySevenDayPackage=false;
  };

  $scope.dataTitile=data.Title;
                                       $scope.FacebookContent=data.FacebookContent;
                                              $scope.FbImageContent=   data.FbImageContent;
                                              $scope.TwitterContent=   data.TwitterContent;
                                                 $scope.amount=data.amount;
                                                 $scope.cli=Number(data.clientID);
                                                  $scope.ddate= data.dueDate;
                                                 $scope.edi1=Number(data.editorID);
                                                    $scope.wri1=Number(data.writerID);
                                                 data.id;
                                                 $scope.Archived=Number(data.isArchived);
                                                 data.is_fb;
                                                 data.is_tw;
                                                 data.memberID;
                                                $scope.packageName= data.name;
                                                $scope.notes= data.notes;
                                                 data.posting_time;
                                                 data.saveDate;
                                                 $scope.sdate=data.startDate;
                                                 data.status;
                                              
                                                 $scope.singleDay=Number(data.isSingleDay);
                                                 $scope.packList1 =data.platformIdentity;
                                               //  data.platformIdentity

                    
                               
                        


                                            if (!$scope.FacebookContent && !$scope.FbImageContent && $scope.TwitterContent) {
                                               // $scope.UpdateshowOnlySevenDayPackage=true;
                                                         $scope.MainDiv1=[];
                                               for (var i = 0; i <= 6; i++) {
                                                       $scope.MainDiv1.push({'FacebookContent':null,'FbImageContent':null,
                                                'TwitterContent':$scope.TwitterContent[i]})
                                               };

                                       
                                               };


                                                   if ($scope.FacebookContent && !$scope.FbImageContent && !$scope.TwitterContent) {
                                                    $scope.UpdateshowOnlySevenDayPackage=true;
                                                         $scope.MainDiv1=[];
                                               for (var i = 0; i <= 6; i++) {
                                                       $scope.MainDiv1.push({'FacebookContent':$scope.FacebookContent[i],'FbImageContent':null,
                                                'TwitterContent':null})
                                               };

                                               };




                                                 if ($scope.FacebookContent && $scope.FacebookContent && $scope.FacebookContent) {

                                            if ($scope.FacebookContent.length > 0) {
                                    var postTime=dateFormat($scope.FacebookContent[0].ScheduleDate);
                                $scope.weklyctrl.injectedObject=injectedTimeFormat(postTime.hours);
                                $scope.MainDiv1 = [];
                                for (var i = 0; i < $scope.FacebookContent.length; i++) {
                                         $scope.FacebookContent[i].dataTitile1 = data.FacebookContent[i].GroupHeaderText;
                                     $scope.FacebookContent[i].imgLink="data:image/png;base64, "+$scope.FacebookContent[i].imageStream;
                                     $scope.FbImageContent[i].imgLink="data:image/png;base64, "+$scope.FbImageContent[i].imageStream;
                                     $scope.TwitterContent[i].imgLink="data:image/png;base64, "+$scope.TwitterContent[i].imageStream;
                                   
                                                             $scope.FacebookContent[i].weklyctrl={}; 
                                                         var postTime=dateFormat($scope.FacebookContent[i].ScheduleDate);
                                                       //  $scope.FacebookContent[i].GroupHeaderText=postTime.date;
                                                         $scope.FacebookContent[i].scheduleDate=postTime.date;
                                                        $scope.FacebookContent[i].weklyctrl.injectedObject=injectedTimeFormat(postTime.hours);
                                                          var postTime=dateFormat($scope.FbImageContent[i].ScheduleDate);
                                                         $scope.FbImageContent[i].scheduleDate=postTime.date;
                                                        // $scope.FbImageContent[i].GroupHeaderText=postTime.date;
                                                        $scope.FacebookContent[i].weklyctrl.injectedObject=injectedTimeFormat(postTime.hours);
                                                          var postTime=dateFormat($scope.TwitterContent[i].ScheduleDate);
                                                         $scope.TwitterContent[i].scheduleDate=postTime.date;
                                                      //   $scope.TwitterContent[i].GroupHeaderText=postTime.date;
                                                        $scope.FacebookContent[i].weklyctrl.injectedObject=injectedTimeFormat(postTime.hours);
                                    $scope.MainDiv1.push({
                                        'FacebookContent': $scope.FacebookContent[i],
                                        'FbImageContent': $scope.FbImageContent[i],
                                        'TwitterContent': $scope.TwitterContent[i]
                                    })


                                }


                            };

                                                 };
                                        
                                  



                                 
                               
 

                                }
                            
                            
                          }).error(function(data, status){
                                       $rootScope.slideDownAlertBox = 'slideDown';
                         growl.addErrorMessage('Something went wrong! Please try again later.',config);
                          $scope.hideAddUserForm=false;
                            });
          };

              $scope.UpdateshowOnlySevenDayPackage=false;
     $scope.UpdateshowOnlySingleDayPackage=false;
$scope.contentsOnly=false;
          $scope.taskDetail1=function(detailID){
                   
$scope.contentsOnly=true;
    $scope.showSaveButton=false;
                        $scope.editForm=true;
                        $scope.hideAddUserForm=true;
                    
                        //$scope.city=updateUserData.City_State;
                        //$scope.emailId=updateUserData.Email;
                      // $scope.name=updateUserData.Name;
                        //$scope.status=updateUserData.Status;
                        $scope.id=detailID;

                        $scope.editId=detailID;

                        var url=GetWritingTaskByContent + '/' + $scope.id;
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
                          var listOdAddUser1={
                                  'id':parseInt($scope.id)
                           };
                        APIs.GetWritingTaskByContent(listOdAddUser1,params,authorizationHeader)
                        .success(function(data,status) {
                                  if (status==200) {
                                     $scope.imagename=data.imageName;
                            $scope.TaskimgLink="data:image/png;base64, "+data.imageStream;  
                              if(data.permission[0].chkDone == true)
                                {
                                    $scope.chekdone=true;
                                }
                                      else{
                                         $scope.chekdone=false; 
                                      }
                                     $scope.warning=data.permission[0].warningMsg;
                                     if(data.status == 0)
                                         {
                                             $scope.checkValue=false;
                                         }
                                      else if(data.status == 1)
                                          {
                                             $scope.checkValue=true;
                                         }
                                    $scope.detailsOfContent=data;
                                    $scope.id=data.id;
                                    $scope.title=  data.title;
                                    $scope.ddate=  data.dueDate;
                                       $scope.category=data.category;
                                 //   $scope.sdate=   data.scheduleDate;
                               //   $scope.Status='Approved';
                                    $scope.editor=   data.editor;
                                    $scope.writer=   data.writer;
                                    $scope.client=   data.client;
                                    /*$scope.Category =   data.category;*/
                                    $scope.Platform=  data.platform;
                                    $scope.amount=  data.amount;
                                    $scope.brife=  data.Brief;
                                    $scope.Notes=  data.notes;
                                    $scope.Logs=   data.logs;
                                    $scope.declineReason=data.reason;
                                                   $scope.editorId=data.editorId;
                                   $scope.cat=Number(data.categoryID);

                                         $scope.cli=Number(data.clientID);
                                     
                                             $scope.ddate= data.dueDate;
                                                 $scope.edi1=Number(data.editorID);
                                                    $scope.wri1=Number(data.writerID);

                                                    $scope.status=data.status;

                                    if (data.status==0 || data.status==11 ||  data.status==3) {
                                      $scope.showSaveButton=true;
                                         $scope.showSaveButtonMsg=false;
                                             $scope.showSaveButtonMsg1=false;
                                       $scope.showSaveButton1=false;
                                    };


                                        if (data.status==1) {
                                      $scope.showSaveButtonMsg=true;
                                       $scope.showSaveButton=false;

                                           $scope.showSaveButtonMsg1=false;
                                       $scope.showSaveButton1=false;
                                    };



                       /*var split1 = data.scheduleDate.split(' ');                                  
                                    $scope.sdate=  split1[0];*/
                                  
                                    if (data.platform=='Facebook') {
                                      $scope.dispalyFBContent=true;
                                         $scope.dispalyTWContent=false;
                                               $scope.dispalyBlogContent=false;
                                                 $scope.UpdateshowOnlySingleDayPackage=false;
                                               $scope.UpdateshowOnlySevenDayPackage=false;
                                               $scope.fbmicro=  data.fb_body;
                                               $scope.fbtitle=   data.fb_title;
                                               $scope.fbtitlelink=   data.fb_link;
                                               $scope.fbdesq=   data.fb_descr;
                                         
                                        
                                           //    $scope.micro=  data.fb_body;
                                               $scope.fbPic=   data.fb_picture;
                                               $scope.gridID=data.memberID;
                                              



                                    }else if (data.platform=='Twitter') {
                                      $scope.dispalyTWContent=true;
                                          $scope.dispalyBlogContent=false;
                                              $scope.dispalyFBContent=false;
                                                         $scope.UpdateshowOnlySingleDayPackage=false;
        $scope.UpdateshowOnlySevenDayPackage=false;
                                              $scope.twmicro=  data.tw_body;
                                              $scope.twPic=  data.tw_picture;


                                    }else if (data.platform=='Blog') {
                                       $scope.dispalyBlogContent=true;
                                         $scope.dispalyFBContent=false;
                                                        $scope.dispalyTWContent=false;
                                                                   $scope.UpdateshowOnlySingleDayPackage=false;
        $scope.UpdateshowOnlySevenDayPackage=false;
                                                        $scope.btitle=  data.wp_title;
                                                        $scope.htmlcontent=  data.wp_content;
                                                        $scope.tags=  data.wp_tag;
                                                        $scope.blFile=  data.wp_picture;


                                    };
                               
 

                                }
                            
                            
                          }).error(function(data, status){
                                       $rootScope.slideDownAlertBox = 'slideDown';
                         growl.addErrorMessage('Something went wrong! Please try again later.',config);
                          $scope.hideAddUserForm=false;
                            });
                




          };

           $scope.showSaveButton=false;
           $scope.showSaveButtonMsg=false;

    $scope.FBmyfile='';
    $scope.twmyfile='';
    $scope.wpmyfile='';
    
$scope.editUserSubmit = function () {


    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0! 
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
    var url = UpdateWritingTaskByContent;
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
         'logs': $scope.Logs,
        /* 'title':$scope.title,*/
        /*  'descr':$scope.brife,*/
        /*  'amount':parseInt($scope.amount),*/
        /* 'categoryID':parseInt($scope.category),
        'writerID': $scope.writer,*/
     'editorID': $scope.editorId
        /* 'clientID': $scope.client,*/
        // 'platform':$scope.Platform,
        /* 'dueDate':   $scope.ddate,*/
        // 'scheduleDate':$scope.sdate +' '+ $scope.ctrol.stime,
        /*'status':parseInt($scope.status),*/

        //  'imageStream':'base',
        /* 'notes':$scope.Notes,
        'reason':'test',*/
        /*'saveDate': $rootScope.SaveDateFormat*/
        //'imageName': 'm.gif'



    }
    if ($scope.checkValue) {
        listOdAddUser.status = parseInt($scope.checkValue);
    } else {
        listOdAddUser.status = parseInt($scope.status);
    }


    if ($scope.ctrol) {
        listOdAddUser.scheduleDate = $scope.sdate;
    };

    if ($scope.Platform == 'Facebook') {
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



         listOdAddUser.platform='Facebook';
        listOdAddUser.fb_body = $scope.fbmicro;
        listOdAddUser.fb_descr = $scope.fbdes;
        listOdAddUser.fb_link = $scope.fbtitlelink;
        listOdAddUser.fb_title = $scope.fbtitle;


    }
    if ($scope.Platform == 'Twitter') {



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



         listOdAddUser.platform='Twitter';
        listOdAddUser.tw_body = $scope.twmicro;

    }

    if ($scope.Platform == 'Blog') {



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


         listOdAddUser.platform='Blog';
        listOdAddUser.wp_category = '';
        listOdAddUser.wp_content = $scope.htmlcontent;
        listOdAddUser.wp_tag = $scope.tags;
        listOdAddUser.wp_title = $scope.btitle;

    }

    // else{
    //                     listOdAddUser.hospital=null;
    //                }


    //         if($scope.title && $scope.ddate && $scope.sdate  && $scope.Status1 && $scope.Editor && $scope.Writer && $scope.Client && $scope.Category && $scope.ctrol.stime1 && $scope.amount &&(($scope.fbtitle && $scope.fbtitlelink && $scope.fbdes && $scope.FBmyfile)||($scope.twmicro && $scope.twmyfile )||($scope.btitle && $scope.htmlcontent && $scope.tags && $scope.wpmyfile)))
    // {
    APIs.UpdateWritingTaskByContent(listOdAddUser, params, authorizationHeader)
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
    //  }
};
        /*end of edit User*/



          $scope.packageDelete1=function(detailID){
                  var id={
                        'id': detailID
                        };
                        var url=DeleteWriterPackage + '/' + detailID;
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
                         

                          var Delete1 = confirm('Are you sure you want to delete?');
                        if (Delete1 == true) { 
                                APIs.DeleteWriterPackage(id,params,authorizationHeader)
                                .success(function(data,status) {
                                        if(status == 200)
                                        {   $rootScope.slideDownAlertBox = 'slideDown';
                                                         growl.addSuccessMessage(data,config);
                                        $scope.Refresh();
                                        }
                                }).error(function(data, status){
                                  $rootScope.slideDownAlertBox = 'slideDown';
                         growl.addErrorMessage('Something went wrong! Please try again later.',config);
                          $scope.hideAddUserForm=false;
                                });
                        }


          };

          $scope.taskDelete1=function(detailID){
                  var id={
                        'id': detailID
                        };
                        var url=DeleteTask + '/' + detailID;
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
             
                        var Delete1 = confirm('Are you sure you want to delete?');
                        if (Delete1 == true) { 
                                APIs.DeleteTask(id,params,authorizationHeader)
                                .success(function(data,status) {
                                        if(status == 200)
                                        {   $rootScope.slideDownAlertBox = 'slideDown';
                                                         growl.addSuccessMessage(data,config);
                                        $scope.Refresh();
                                        }
                                }).error(function(data, status){
                                     $rootScope.slideDownAlertBox = 'slideDown';
                         growl.addErrorMessage('Something went wrong! Please try again later.',config);
                          $scope.hideAddUserForm=false;
                                });
                        }
          };

     

       $scope.contentIsReady=function(value){




         if(value)
    {
        if (confirm("Do you want to proceed?") == false) {
               return;
    }
   
    }
           var id={
                        'id':   $scope.editId
                        };
                        var url=SendToEditor + '/' + $scope.editId;
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
                        

                                APIs.SendToEditor(id,params,authorizationHeader)
                                .success(function(data,status) {
                                        if(status == 200)
                                        {
    $rootScope.slideDownAlertBox = 'slideDown';
                growl.addSuccessMessage(data,config);
                                      //  $scope.Refresh();
                                        }
                                }).error(function(data, status){
    $rootScope.slideDownAlertBox = 'slideDown';
                         growl.addErrorMessage('Something went wrong! Please try again later.',config);
                                  $scope.hideAddUserForm=false;
                                      $scope.editForm=false; 
                                   $scope.hideNavBar=false;    
                        
                                });
  };     

    
   
  


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
                         if($scope.FacebookContent[i].fb_picture =='')
                             {
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
                          if($scope.FbImageContent[i].fb_picture =='')
                             {
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
                          if($scope.TwitterContent[i].fb_picture =='')
                             {
                            $scope.TwitterContent[i].imageStream = '';
                            $scope.TwitterContent[i].imageName = '';
                             } 
                        $scope.TwitterContent[i].tw_body = $scope.TwitterContent[i].Microblog;
                        $scope.TwitterContent[i].id = $scope.TwitterContent[i].ContentId;
                         if ($scope.packList1 == 'pack'){ 
                        $scope.TwitterContent[i].scheduleDate = $scope.TwitterContent[i].scheduleDate + ' ' + $scope.FacebookContent[i].weklyctrl.potime;
                         }
                         if ($scope.packList1 == 'twitter'){ 
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
                        if($scope.FacebookContent[i].imgLink.length > 25 && !$scope.FacebookContent[i].fb_picture.base64) {                
                var splitedImg=$scope.FacebookContent[i].imgLink.split(',');
                $scope.FacebookContent[i].imageStream = splitedImg[1];                
               delete $scope.FacebookContent[i].imgLink;
            };
                if($scope.FacebookContent[i].fb_picture =='' && $scope.FacebookContent[i].imgLink =='')
                 {
                    
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
                        if($scope.FbImageContent[i].imgLink.length > 25 && !$scope.FbImageContent[i].fb_picture.base64) {                
                var splitedImg=$scope.FbImageContent[i].imgLink.split(',');
                $scope.FbImageContent[i].imageStream = splitedImg[1];                
               delete $scope.FbImageContent[i].imgLink;
            };
                 if($scope.FbImageContent[i].fb_picture =='' && $scope.FbImageContent[i].imgLink =='')
                 {
                    
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
                if($scope.TwitterContent[i].imgLink.length > 25 && !$scope.TwitterContent[i].fb_picture) {                
                var splitedImg=$scope.TwitterContent[i].imgLink.split(',');
                $scope.TwitterContent[i].imageStream = splitedImg[1];                
               delete $scope.TwitterContent[i].imgLink;
            };
                 if($scope.TwitterContent[i].fb_picture =='' && $scope.TwitterContent[i].imgLink =='')
                 {                    
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
                'memberID': Number(id),
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


$scope.getImage = function(data){
    return 'data:image/jpeg;base64,' + data;
}

     




        $scope.fnshowOnlySingleDayPackage = function () {

            $scope.FacebookContent[0].platform = 'Facebook'
            $scope.FbImageContent[0].platform = 'Facebook'
            $scope.TwitterContent[0].platform = 'Twitter'

             if($scope.FacebookContent[0].fb_picture)
                 {
            $scope.FacebookContent[0].imageStream = $scope.FacebookContent[0].fb_picture.base64;
            $scope.FacebookContent[0].imageName = $scope.FacebookContent[0].fb_picture.filename  || $scope.FacebookContent[0].imageName;
                 }
                  if($scope.FacebookContent[0].imgLink.length > 25 && !$scope.FacebookContent[0].fb_picture.base64) {                
                var splitedImg=$scope.FacebookContent[0].imgLink.split(',');
                $scope.FacebookContent[0].imageStream = splitedImg[1];                
               delete $scope.FacebookContent[0].imgLink;
            };
             if($scope.FacebookContent[0].fb_picture =='' && $scope.FacebookContent[0].imgLink =='')
                 {
                $scope.FacebookContent[0].imageStream = '';
                $scope.FacebookContent[0].imageName = '';
                 delete $scope.FacebookContent[0].imgLink;  
                 }
             if($scope.FbImageContent[0].fb_picture)
                 {
            $scope.FbImageContent[0].imageStream = $scope.FbImageContent[0].fb_picture.base64;
            $scope.FbImageContent[0].imageName = $scope.FbImageContent[0].fb_picture.filename  || $scope.FbImageContent[0].imageName;
                 }
                 if($scope.FbImageContent[0].imgLink.length > 25 && !$scope.FbImageContent[0].fb_picture.base64) {                
                var splitedImg=$scope.FbImageContent[0].imgLink.split(',');
                $scope.FbImageContent[0].imageStream = splitedImg[1];               
                delete $scope.FbImageContent[0].imgLink;
            }
            if($scope.FbImageContent[0].fb_picture =='' && $scope.FbImageContent[0].imgLink =='')
                 {
                $scope.FbImageContent[0].imageStream = '';
                $scope.FbImageContent[0].imageName = '';
                 delete $scope.FbImageContent[0].imgLink;   
                 }
            if ($scope.TwitterContent[0].fb_picture) {
                $scope.TwitterContent[0].imageStream = $scope.TwitterContent[0].fb_picture.base64;
                $scope.TwitterContent[0].imageName = $scope.TwitterContent[0].fb_picture.filename || $scope.TwitterContent[0].imageName;
              
            };
             if($scope.TwitterContent[0].fb_picture =='' && $scope.TwitterContent[0].imgLink =='')
                 {                    
                $scope.TwitterContent[0].imageStream = '';
                $scope.TwitterContent[0].imageName = '';
                 delete $scope.TwitterContent[0].imgLink;    
                 }
           if($scope.TwitterContent[0].imageStream && $scope.TwitterContent[0].imgLink.length > 25 && !$scope.TwitterContent[0].fb_picture) {   
           
                var splitedImg=$scope.TwitterContent[0].imgLink.split(',');
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
            $scope.FacebookContent[0].scheduleDate = $scope.FacebookContent[0].scheduleDate + ' ' + $scope.weklyctrl.posttime; 
            $scope.FbImageContent[0].scheduleDate = $scope.FbImageContent[0].scheduleDate + ' ' + $scope.weklyctrl.posttime;
            $scope.TwitterContent[0].scheduleDate = $scope.TwitterContent[0].scheduleDate + ' ' + $scope.weklyctrl.posttime;
        }  else if (!$scope.weklyctrl.posttime) {
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
                'memberID': Number(id),
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



$scope.savedForm=false;
$scope.showOnlySingleDayPackage=false;
$scope.showOnlySevenDayPackage=false;
$scope.DisableCheckBox=false;
   
      
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
                $scope.WriterJobs.sort(predicatByAsc(header));

            }
            if (!asc) {
                $scope.WriterJobs.sort(predicatByDes(header));

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

       $scope.predisable=false;
        $scope.nextdisable=false;
            $scope.range = function () {
                var rangeSize = $scope.pageCount();
                if (rangeSize >= 6) {
                    rangeSize = 5;
                }

                       if (rangeSize <= 4) {
                    rangeSize = $scope.pageCount()+1;                    
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
             

                 if($scope.returnedData!=undefined)
                    {
                    return Math.ceil($scope.returnedData.length / $scope.itemsPerPage) - 1;
                    }
                    else
                    {
                        return Math.ceil($scope.WriterJobs.length / $scope.itemsPerPage) - 1;
}



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