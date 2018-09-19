'use strict';


var host = '166.62.84.37';
var protocol = 'http://';
var pdfUrl = protocol + host + '/';
var serviceUrlBase = protocol + host + '/ChspWS/';


//Login Services
var LogInServiceAuth=serviceUrlBase+'LogInAuth.svc/LogInServiceAuth';

//forgt pwd Services
var LogInServiceAuthForgotPwd=serviceUrlBase+'LogInAuth.svc/ForgotPassword';

//UserManagement Services
var GetUserManagements=serviceUrlBase + 'UserManagement.svc/GetUserManagements';
var AddUser=serviceUrlBase + 'UserManagement.svc/AddUser';
var editUser=serviceUrlBase + 'UserManagement.svc/GetDataByMemberId';
var editUserSubmit=serviceUrlBase + 'UserManagement.svc/AddUser';

var DeleteUser=serviceUrlBase + 'UserManagement.svc/DeleteUser';
var deActivateUser=serviceUrlBase + 'UserManagement.svc/SetStatus';
var ActivateUser=serviceUrlBase + 'UserManagement.svc/SetStatus';
var IsExist=serviceUrlBase + 'UserManagement.svc/IsExist';


//my account services

var GetUserAccount=serviceUrlBase + 'UserManagement.svc/GetUserAccount';
var UpdateUserAccount=serviceUrlBase + 'UserManagement.svc/UpdateUserAccount';

var isArchieve=serviceUrlBase + 'ClientManagement.svc/isArchieve';
var showArchievedClients=serviceUrlBase + 'ClientManagement.svc/ShowArchievedClients';



//ClientManagment Services
var GetClientManagements=serviceUrlBase + 'ClientManagement.svc/GetDataByClients';
var AddClient=serviceUrlBase + 'ClientManagement.svc/AddClient';

var editClient=serviceUrlBase + 'ClientManagement.svc/GetClientDataById';
var editclientSubmit=serviceUrlBase + 'ClientManagement.svc/AddClient';
var DeleteClient=serviceUrlBase + 'ClientManagement.svc/DeleteClient';
var deActivateClient=serviceUrlBase + 'ClientManagement.svc/SetStatus';
var ActivateClient=serviceUrlBase + 'ClientManagement.svc/SetStatus';
var ArchieveClient=serviceUrlBase + 'ClientManagement.svc/isArchieve';





//ClientSocialManagment Services
var GetClientSocialManagements=serviceUrlBase + 'ClientManagement.svc/GetSocialSitesData';
var AddClientSocial=serviceUrlBase + 'ClientManagement.svc/AddSocial';
var updateClientSocial=serviceUrlBase + 'ClientManagement.svc/AddSocial';
var DeleteClientSocial=serviceUrlBase + 'ClientManagement.svc/DeleteSocial';

var ArchieveClientSocial=serviceUrlBase + 'ClientManagement.svc/ShowArchievedClients';
var editSocial=serviceUrlBase + 'ClientManagement.svc/GetSocialDataById';



//contentMangmntRequest services
var GetRequestContents=serviceUrlBase + 'ContentManagement.svc/GetRequestContents';
var AddRequestContents=serviceUrlBase + 'ContentManagement.svc/AddRequestContent';
var EditRequestContents=serviceUrlBase + 'ContentManagement.svc/GetRequestContentById';
var ArchieveRequestContents=serviceUrlBase + 'ContentManagement.svc/SetStatus';
var ActivateRequestContents=serviceUrlBase + 'ContentManagement.svc/SetStatus';
var ScheduledContent=serviceUrlBase + 'ContentManagement.svc/ScheduledContent';
var ShowArchieveRequestContents=serviceUrlBase + 'ContentManagement.svc/ArchivedRequestContents';

var editRequestContentSubmit=serviceUrlBase + 'ContentManagement.svc/AddRequestContent';


var GetBlogPlans=serviceUrlBase + 'ContentManagement.svc/GetBlogPlans';
var FilterByBlogClient=serviceUrlBase + 'ContentManagement.svc/FilterByBlogClient';

//FailedContents Services
var GetFailedContents=serviceUrlBase + 'ContentManagement.svc/GetFailedContents';





//site Mangmnt...
var getSiteMangmnt=serviceUrlBase + 'SiteManagement.svc/GetAllBlogPlans';
var DeleteSiteBlogPlan=serviceUrlBase + 'SiteManagement.svc/DeleteBlogPlan';
var AddSiteBlogPlan=serviceUrlBase + 'SiteManagement.svc/AddBlogPlan';
var GetBlogPlansById=serviceUrlBase + 'SiteManagement.svc/GetBlogPlansById';
var UpdateSiteBlogPlan=serviceUrlBase + 'SiteManagement.svc/AddBlogPlan';



//RssFeeds Services
var GetAllRssFeeds=serviceUrlBase + 'SiteManagement.svc/GetAllRssFeeds';
var GetRssFeedById=serviceUrlBase + 'SiteManagement.svc/GetRssFeedById';
var ShowArchiveRssFeeds=serviceUrlBase + 'SiteManagement.svc/ShowArchiveRssFeeds';
var UpdateStatus=serviceUrlBase + 'SiteManagement.svc/UpdateStatus';


var AddRssFeed=serviceUrlBase + 'SiteManagement.svc/AddRssFeed';
var ActiveUpdateStatus1=serviceUrlBase + 'SiteManagement.svc/UpdateNoticeStatus';
var DeActiveUpdateStatus1=serviceUrlBase + 'SiteManagement.svc/UpdateNoticeStatus';

//Notice Services
var GetAllNotices=serviceUrlBase + 'SiteManagement.svc/GetAllNotices';


//site categories..
var GetAllCategories1=serviceUrlBase + 'SiteManagement.svc/GetAllCategories';
var ArchivedCategories1=serviceUrlBase + 'SiteManagement.svc/ArchivedCategories';
var AddCategory1=serviceUrlBase + 'SiteManagement.svc/AddCategory';
var UpdateCategory1=serviceUrlBase + 'SiteManagement.svc/AddCategory';
var deactCategory1=serviceUrlBase + 'SiteManagement.svc/SetStatus';
var actCategory1=serviceUrlBase + 'SiteManagement.svc/SetStatus';


//Notice Services
var GetAllNotices=serviceUrlBase + 'SiteManagement.svc/GetAllNotices';
var GetNoticeById=serviceUrlBase + 'SiteManagement.svc/GetNoticeById';

var showArchivedNotices=serviceUrlBase + 'SiteManagement.svc/ShowArchivedNotices';

var UpdateNoticeStatus=serviceUrlBase + 'SiteManagement.svc/UpdateNoticeStatus';
var ActiveNoticeStatus=serviceUrlBase + 'SiteManagement.svc/UpdateNoticeStatus';
var DeActiveNoticeStatus=serviceUrlBase + 'SiteManagement.svc/UpdateNoticeStatus';

var AddNotice=serviceUrlBase + 'SiteManagement.svc/AddNotice';
var updateNotice=serviceUrlBase + 'SiteManagement.svc/AddNotice';
var editNotice=serviceUrlBase + 'SiteManagement.svc/AddNotice';


//site Pdf metric ....


var GetAllPDFMetricReports1=serviceUrlBase + 'SiteManagement.svc/GetAllPDFMetricReports';

var ShowArchivedReports=serviceUrlBase + 'SiteManagement.svc/ShowArchivedReports';

var DeletePdfReport=serviceUrlBase + 'SiteManagement.svc/DeletePdfReport';

var AddPdfMetricReport=serviceUrlBase + 'SiteManagement.svc/AddPdfMetricReport';

var ArchivePdfReport=serviceUrlBase + 'SiteManagement.svc/ArchivePdfReport';

var GetPdfReportById=serviceUrlBase + 'SiteManagement.svc/GetPdfReportById';
var UpdatePdfMetricReport=serviceUrlBase + 'SiteManagement.svc/AddPdfMetricReport';







//faq...

var GetAllManageFaq=serviceUrlBase + 'Help.svc/GetAllManageFaq';
var ShowArchivedFaq=serviceUrlBase + 'Help.svc/ShowArchivedFaq';
var AddFaq=serviceUrlBase + 'Help.svc/AddFaq';
var UpdateFaq=serviceUrlBase + 'Help.svc/AddFaq';
var GetFaqById=serviceUrlBase + 'Help.svc/GetFaqById';
var UpdateFaqStatus=serviceUrlBase + 'Help.svc/UpdateFaqStatus';


//ClientPost Report

var GetAllClientPosts=serviceUrlBase + 'SiteManagement.svc/GetAllClientPosts';
var FilterClientPosts=serviceUrlBase + 'SiteManagement.svc/FilterClientPosts';

//Audit Report
var GetFailedContentById=serviceUrlBase + 'ContentManagement.svc/GetFailedContentById';
var GetAllAuditReports=serviceUrlBase + 'SiteManagement.svc/GetAllAuditReports';
var FilterAuditReports=serviceUrlBase + 'SiteManagement.svc/FilterAuditReports';
var GetContentById=serviceUrlBase + 'ContentManagement.svc/GetContentById';
var SaveContentTemplate=serviceUrlBase + 'ContentManagement.svc/SaveContentTemplate';


//site monitoring Report....
var AddMonitoringReport=serviceUrlBase + 'SiteManagement.svc/AddMonitoringReport';
var UpdateMonitoringStatus=serviceUrlBase + 'SiteManagement.svc/UpdateMonitoringStatus';
var GetMonitoringReport=serviceUrlBase + 'SiteManagement.svc/GetMonitoringReport';
var UpdateMonitoringReport=serviceUrlBase + 'SiteManagement.svc/AddMonitoringReport';
var GetAllMonitoringReports=serviceUrlBase + 'SiteManagement.svc/GetAllMonitoringReports';
var ShowArchiveMonitoringReports=serviceUrlBase + 'SiteManagement.svc/ShowArchiveMonitoringReports';

// writing mangmnt...
var GetAllWritingTasks=serviceUrlBase + 'WritingManagement.svc/GetAllWritingTasks';
var DeleteWritingTask=serviceUrlBase + 'WritingManagement.svc/DeleteWritingTask';
var CreateWritingTask=serviceUrlBase + 'WritingManagement.svc/CreateWritingTask';
var GetDetailsWritingTask=serviceUrlBase + 'WritingManagement.svc/GetDetailsWritingTask';
var DeclineWritingTask=serviceUrlBase + 'WritingManagement.svc/DeclineWritingTask';
var UpdateWritingTask=serviceUrlBase + 'WritingManagement.svc/UpdateWritingTask';
var ClientDecline=serviceUrlBase + 'WritingManagement.svc/ClientDecline';

var UpdateWritingTaskByContent=serviceUrlBase + 'WritingManagement.svc/UpdateWritingTaskByContent';
var GetWritingTaskByContent=serviceUrlBase + 'WritingManagement.svc/GetWritingTaskByContent';


// writing mangmnt(CreateAnInvoke)...
var GetAllTasks=serviceUrlBase + 'WritingManagement.svc/GetAllTasks';
var FilterByTask=serviceUrlBase + 'WritingManagement.svc/FilterByTask';
var GetInvoiceWritingTask=serviceUrlBase + 'WritingManagement.svc/GetDetailsWritingTask';
var CreateInvoices=serviceUrlBase + 'WritingManagement.svc/CreateInvoices';
var UpdateWritingInvoices=serviceUrlBase + 'WritingManagement.svc/UpdateWritingTask';

//Writer Invoice
var GetAllWriterInvoices=serviceUrlBase + 'WritingManagement.svc/GetAllWriterInvoices';
var PrintPreview=serviceUrlBase + 'WritingManagement.svc/PrintPreview';
var SetPaidStatus=serviceUrlBase + 'WritingManagement.svc/SetPaidStatus';
var GetInvoicesByWriter=serviceUrlBase + 'WritingManagement.svc/GetInvoicesByWriter';

//manage Content Services
var GetAllContents=serviceUrlBase + 'ContentManagement.svc/GetAllContents';
var FilterByContents=serviceUrlBase + 'ContentManagement.svc/FilterByContents';
var DeleteContent=serviceUrlBase + 'ContentManagement.svc/DeleteContent';
var ArchieveContent1=serviceUrlBase + 'ContentManagement.svc/ArchieveContent';
var ApproveContent=serviceUrlBase + 'ContentManagement.svc/ApproveContent';
var CancelContent=serviceUrlBase + 'ContentManagement.svc/CancelContent';
var ReScheduleContent=serviceUrlBase + 'ContentManagement.svc/ReScheduleContent';
var SetScheduleDate=serviceUrlBase + 'ContentManagement.svc/SetScheduleDate';
var ExportAsPDF=serviceUrlBase + 'ContentManagement.svc/ExportAsPDF';
var MarkAsRead=serviceUrlBase + 'ContentManagement.svc/MarkAsRead';
var ExportAsWord=serviceUrlBase + 'ContentManagement.svc/ExportAsWord';
var GetTaskContentById=serviceUrlBase + 'ContentManagement.svc/GetTaskContentById';
var GetContentById=serviceUrlBase + 'ContentManagement.svc/GetContentById';
/*var GetContentsByPackageId=serviceUrlBase + "ContentManagement.svc/GetContentsByPackageId";
var GetContentsByFBPackId=serviceUrlBase + "ContentManagement.svc/GetContentsByFBPackId";*/
var GetContentsByTWPackId=serviceUrlBase + 'ContentManagement.svc/GetContentsByTWPackId';

var ScheduleAndApproval=serviceUrlBase + 'ContentManagement.svc/ScheduleAndApproval';
var SendClientApproval=serviceUrlBase + 'ContentManagement.svc/SendClientApproval';
//writing mangmnt.. (writer job)
var GetContentByPackageId=serviceUrlBase + 'ContentManagement.svc/GetContentsByPackageId';
var GetAllWriterJobs=serviceUrlBase + 'WritingManagement.svc/GetAllWriterJobs';
var FilterJobsByWriter=serviceUrlBase + 'WritingManagement.svc/FilterJobsByWriter';
var DeleteWriterPackage=serviceUrlBase + 'WritingManagement.svc/DeleteWriterPackage';
var DeleteTask=serviceUrlBase + 'WritingManagement.svc/DeleteTask';
var GetContentsByPackageId=serviceUrlBase + 'ContentManagement.svc/GetContentsByPackageId';
//var GetTaskContentById=serviceUrlBase + "ContentManagement.svc/GetTaskContentById";
var GetContentsByFBPackId=serviceUrlBase + 'ContentManagement.svc/GetContentsByFBPackId';
var GetContentsByTWPackId=serviceUrlBase + 'ContentManagement.svc/GetContentsByTWPackId';
var Archived=serviceUrlBase + 'WritingManagement.svc/Archived';
var CreatePackageDetail=serviceUrlBase + 'WritingManagement.svc/CreatePackageDetail';
var UpdatePackageContents=serviceUrlBase + 'WritingManagement.svc/UpdatePackageContents';


//writing mangmnt .. (weekly package list)

var GetAllPackagesList=serviceUrlBase + 'WritingManagement.svc/GetAllPackagesList';
var FilterPackageList=serviceUrlBase + 'WritingManagement.svc/FilterPackageList';
var AdminApprove=serviceUrlBase + 'WritingManagement.svc/AdminApprove';
var ClientApprove=serviceUrlBase + 'WritingManagement.svc/ClientApprove';
var SendToEditor=serviceUrlBase + 'WritingManagement.svc/SendToEditor';
var AdminDecline=serviceUrlBase + 'WritingManagement.svc/AdminDecline';
var AdminApprove=serviceUrlBase + 'WritingManagement.svc/AdminApprove';

var FilteredFaq=serviceUrlBase + 'Help.svc/FilteredFaq';


//shorten URL

var shortenURL=protocol+host+'/bit.ly/_api.php';



//dashboard.................................................
var GetAllDashBoardsDetails1=serviceUrlBase + 'DashBoard.svc/GetAllDashBoardsDetails';
var FilterByClient=serviceUrlBase + 'DashBoard.svc/FilterByClient';

angular.module('chsApp').directive('tooltip', function(){
    return {
        restrict: 'A',
        link: function(scope, element, attrs){
            $(element).hover(function(){
                // on mouseenter
                $(element).tooltip('show');
            }, function(){
                // on mouseleave
                $(element).tooltip('hide');
            });
        }
    };
});


//Pagination
angular.module('chsApp').filter('pagination', function () {
return function (input, start) {
start = parseInt(start, 10);
if (input != null) {
  return input.slice(start);
};
};
});

//permission...
var ScheduledContent=serviceUrlBase + 'ContentManagement.svc/ScheduledContent';
var ApproveContent=serviceUrlBase + 'ContentManagement.svc/ApproveContent';
var DeclineContentSave=serviceUrlBase + 'ContentManagement.svc/DeclineContentSave';
var ReSend=serviceUrlBase + 'ContentManagement.svc/ReSend';



angular.module('chsApp').service('APIs', ['$http', function($http) {
//permission
this.FilteredFaq = function(data,params,oAuthDatas) {

       return $http({
               method: 'POST',
               data: data,
               params:params,
               url: FilteredFaq,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : oAuthDatas
                }
           });
   };

   this.ApproveContent = function(data,params,oAuthDatas) {

       return $http({
               method: 'POST',
               data: data,
               params:params,
               url: ApproveContent,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : oAuthDatas
                }
           });
   };

   
   this.ScheduledContent = function(data,params,oAuthDatas) {

       return $http({
               method: 'POST',
               data: data,
               params:params,
               url: ScheduledContent,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : oAuthDatas
                }
           });
   };

   this.DeclineContentSave = function(data,params,oAuthDatas) {

       return $http({
               method: 'POST',
               data: data,
               params:params,
               url: DeclineContentSave,
               headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : oAuthDatas
                }
           });
   };

   this.ReSend = function(data,params,oAuthDatas) {
     
       return $http({
               method: 'POST',
              data: data,
               params:params,
               url: ReSend + '/' + data.id,
               headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : oAuthDatas
                }
           });
   };
//dashboard........................................


 this.GetAllDashBoardsDetails1 = function(data,params,oAuthDatas) {

        return $http({
                method: 'POST',
                data: data,
                params:params,
                url: GetAllDashBoardsDetails1,
                 headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : oAuthDatas
                }
            });
    };

     this.FilterByClient = function(data,params,oAuthDatas) {

        return $http({
                method: 'POST',
                data: data,
                params:params,
                url: FilterByClient,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : oAuthDatas
                }
            });
    };
    
    

//dashboard.......................................



    //weeklypackage.....


      this.SendToEditor = function(data,params,oAuthDatas) {
    
       return $http({
               method: 'POST',
              data: data,
               params:params,
               url: SendToEditor + '/' + data.id,
              headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : oAuthDatas
                }
           });
   }; 

       this.AdminApprove = function(data,params,oAuthDatas) {
  
       return $http({
               method: 'POST',
              data: data,
               params:params,
               url: AdminApprove + '/'+ data.id,
               headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : oAuthDatas
                }
           });
   }; 

    
    this.ClientApprove = function(data,params,oAuthDatas) {

       return $http({
               method: 'POST',
              data: data,
               params:params,
               url: ClientApprove + '/' + data.id,
              headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : oAuthDatas
                }
           });
   }; 

    
  this.ClientDecline = function(data,params,oAuthDatas) {

       return $http({
               method: 'POST',
              data: data,
               params:params,
               url: ClientDecline,
              headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : oAuthDatas
                }
           });
   };

   this.AdminDecline = function(data,params,oAuthDatas) {

       return $http({
               method: 'POST',
              data: data,
               params:params,
               url: AdminDecline,
               headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : oAuthDatas
                }
           });
   };
    
    //Writer Job
    
    this.UpdatePackageContents = function(data,params,oAuthDatas) {
 
       return $http({
               method: 'POST',
              data: data,
               params:params,
               url: UpdatePackageContents,
               headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : oAuthDatas
                }
           });
   };
    
    



     this.CreatePackageDetail = function(data,params,oAuthDatas) {
    
       return $http({
               method: 'POST',
              data: data,
               params:params,
               url: CreatePackageDetail,
               headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : oAuthDatas
                }
           });
   }; 

   this.GetContentsByTWPackId = function(data,params,oAuthDatas) {
    
       return $http({
               method: 'POST',
              data: data,
               params:params,
               url: GetContentsByTWPackId,
               headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : oAuthDatas
                }
           });
   }; 
   
     this.Archived = function(data,params,oAuthDatas) {
    
       return $http({
               method: 'POST',
              data: data,
               params:params,
               url: Archived + '/' + data.id,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : oAuthDatas
                }
           });
   }; 



    //writer job..
      this.DeleteWriterPackage = function(data,params,oAuthDatas) {

       return $http({
               method: 'POST',
              data: data,
               params:params,
               url: DeleteWriterPackage + '/' + data.id,
               headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : oAuthDatas
                }
           });
   }; 
    this.DeleteTask = function(data,params,oAuthDatas) {

       return $http({
               method: 'POST',
              data: data,
               params:params,
               url: DeleteTask + '/' + data.id,
               headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : oAuthDatas
                }
           });
   };

         this.GetContentByPackageId = function(data,params,oAuthDatas) {
 
       return $http({
               method: 'POST',
              data: data,
               params:params,
               url: GetContentByPackageId,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : oAuthDatas
                }
           });
   }; 
   
    this.GetTaskContentById = function(data,params,oAuthDatas) {
   
       return $http({
               method: 'POST',
              data: data,
               params:params,
               url: GetTaskContentById + '/' + data.id,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : oAuthDatas
                }
           });
   };



     this.GetAllWriterJobs = function(data,params,oAuthDatas) {

        return $http({
                method: 'POST',
                data: data,
                params:params,
                url: GetAllWriterJobs,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : oAuthDatas
                }
            });
    };

    this.GetWritingTaskByContent = function(data,params,oAuthDatas) {

       return $http({
               method: 'POST',
              data: data,
               params:params,
               url: GetWritingTaskByContent + '/' + data.id,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : oAuthDatas
                }
           });
   };

this.UpdateWritingTaskByContent = function(data,params,oAuthDatas) {

        return $http({
                method: 'POST',
                data: data,
                params:params,
                url: UpdateWritingTaskByContent,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : oAuthDatas
                }
            });
    };
    
         this.FilterJobsByWriter = function(data,params,oAuthDatas) {
     
        return $http({
                method: 'POST',
                data: data,
                params:params,
                url: FilterJobsByWriter,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : oAuthDatas
                }
            });
    };
    
   this.AdminApprove = function(data,params,oAuthDatas) {

       return $http({
               method: 'POST',
              data: data,
               params:params,
               url: AdminApprove + '/' + data.id,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : oAuthDatas
                }
           });
   };


        

//Writer Invoices

    
    
this.GetAllWriterInvoices = function(data,params,oAuthDatas) {
   
        return $http({
                method: 'POST',
                data: data,
                params:params,
                url: GetAllWriterInvoices,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : oAuthDatas
                }
            });
    };

this.PrintPreview = function(data,params,oAuthDatas,id) {

        return $http({
                method: 'POST',
                data: data,
                params:params,
                url: PrintPreview + '/' + id,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : oAuthDatas
                }
            });
    };

    
    this.SetPaidStatus = function(data,params,oAuthDatas) {
   
        return $http({
                method: 'POST',
                data: data,
                params:params,
                url: SetPaidStatus,
                 headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : oAuthDatas
                }
            });
    };
    
    
    this.GetInvoicesByWriter = function(data,params,oAuthDatas,id) {

        return $http({
                method: 'POST',
                data: data,
                params:params,
                url: GetInvoicesByWriter+ '/' +id,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : oAuthDatas
                }
            });
    };
    
    //Manage Content
  this.ScheduleAndApproval = function(data,params,oAuthDatas) {
    
        return $http({
                method: 'POST',
                data: data,
                params:params,
                url: ScheduleAndApproval,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : oAuthDatas
                }
            });
    };
    
    this.SendClientApproval = function(data,params,oAuthDatas) {
  
        return $http({
                method: 'POST',
                data: data,
                params:params,
                url: SendClientApproval,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : oAuthDatas
                }
            });
    };
    
    
    

    
    this.GetContentById = function(data,params,oAuthDatas,id) {
       
        return $http({
                method: 'POST',
                data: data,
                params:params,
                url: GetContentById + '/' + id,
                 headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : oAuthDatas
                }
            });
    };

    this.GetContentsByPackageId = function(data,params,oAuthDatas) {

        return $http({
                method: 'POST',
                data: data,
                params:params,
                url: GetContentsByPackageId,
                 headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : oAuthDatas
                }
            });
    };

     this.GetContentsByFBPackId = function(data,params,oAuthDatas) {

        return $http({
                method: 'POST',
                data: data,
                params:params,
                url: GetContentsByFBPackId,
                 headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : oAuthDatas
                }
            });
    };

    this.GetContentsByTWPackId = function(data,params,oAuthDatas) {
     
        return $http({
                method: 'POST',
                data: data,
                params:params,
                url: GetContentsByTWPackId,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : oAuthDatas
                }
            });
    };
    
  //weekly packages..
    this.GetAllPackagesList = function(data,params,oAuthDatas) {
            
            return $http({
                    method: 'POST',
                    data: data,
                    params:params,
                    url: GetAllPackagesList,
                     headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : oAuthDatas
                }
                });
        }; 

          this.FilterPackageList = function(data,params,oAuthDatas) {
            
            return $http({
                    method: 'POST',
                    data: data,
                    params:params,
                    url: FilterPackageList,
                     headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : oAuthDatas
                }
                });
        };





  this.isArchieve = function(data,params,oAuthDatas) {
            
            return $http({
                    method: 'POST',
                    data: data,
                    params:params,
                    url: isArchieve,
                    headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : oAuthDatas
                }
                });
        };




    
    this.showArchievedClients = function(data,params,oAuthDatas) {

        return $http({
                method: 'POST',
                data: data,
                params:params,
                url: showArchievedClients,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : oAuthDatas
                }
            });
    };

  //Manage Contents

  this.ExportAsPDF = function(data,params,oAuthDatas) {
  
        return $http({
                method: 'POST',
                data: data,
                params:params,
                url: ExportAsPDF,
                 headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : oAuthDatas
                }
            });
    };

    this.ScheduledContent = function(data,params,oAuthDatas) {

        return $http({
                method: 'POST',
                data: data,
                params:params,
                url: ScheduledContent,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : oAuthDatas
                }
            });
    };
    
    
this.ExportAsWord = function(data,params,oAuthDatas) {

        return $http({
                method: 'POST',
                data: data,
                params:params,
                url: ExportAsWord,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : oAuthDatas
                }
            });
    };
   this.SetScheduleDate = function(data,params,oAuthDatas) {
    
        return $http({
                method: 'POST',
                data: data,
                params:params,
                url: SetScheduleDate,
                 headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : oAuthDatas
                }
            });
    };

   this.ReScheduleContent = function(data,params,oAuthDatas) {
       
        return $http({
                method: 'POST',
                data: data,
                params:params,
                url: ReScheduleContent,
                 headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : oAuthDatas
                }
            });
    };
    
    this.GetAllContents = function(data,params,oAuthDatas) {
  
        return $http({
                method: 'POST',
                data: data,
                params:params,
                url: GetAllContents,
                 headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : oAuthDatas
                }
            });
    };
    
    this.FilterByContents = function(data,params,oAuthDatas) {

        return $http({
                method: 'POST',
                data: data,
                params:params,
                url: FilterByContents,
                 headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : oAuthDatas
                }
            });
    };

    
    this.DeleteContent = function(data,params,oAuthDatas) {
    
        return $http({
                method: 'POST',
                data: data,
                params:params,
                url: DeleteContent,
                 headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : oAuthDatas
                }
            });
    };
  
     this.ArchieveContent1 = function(data,params,oAuthDatas) {
 
        return $http({
                method: 'POST',
                data: data,
                params:params,
                url: ArchieveContent1,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : oAuthDatas
                }
            });
    };

  this.ApproveContent = function(data,params,oAuthDatas) {
   
        return $http({
                method: 'POST',
                data: data,
                params:params,
                url: ApproveContent,
                 headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : oAuthDatas
                }
            });
    };

 this.CancelContent = function(data,params,oAuthDatas) {

        return $http({
                method: 'POST',
                data: data,
                params:params,
                url: CancelContent,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : oAuthDatas
                }
            });
    };

    
    this.MarkAsRead = function(params,oAuthDatas) {

        return $http({
                method: 'GET',              
                params:params,
                url: MarkAsRead,
                 headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : oAuthDatas
                }
            });
    };


  // writing mangmnt(CreateAnInvoke)...
    this.GetAllTasks = function(params,oAuthDatas) {

        return $http({
                method: 'GET',              
                params:params,
                url: GetAllTasks,
                 headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : oAuthDatas
                }
            });
    };

        this.FilterByTask = function(data,params,oAuthDatas) {

      return $http({
              method: 'POST',
              data: data,
              params:params,
              url: FilterByTask,
               headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : oAuthDatas
                }
          });
  };


    this.GetInvoiceWritingTask = function(data,params,oAuthDatas,id) {

      return $http({
              method: 'POST',
              data: data,
              params:params,
              url: GetInvoiceWritingTask+ '/' +id,
               headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : oAuthDatas
                }
          });
  };
    

    this.CreateInvoices = function(data,params,oAuthDatas) {

      return $http({
              method: 'POST',
              data: data,
              params:params,
              url: CreateInvoices,
              headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : oAuthDatas
                }
          });
  };
    
    
    this.UpdateWritingInvoices = function(data,params,oAuthDatas) {
   
      return $http({
              method: 'POST',
              data: data,
              params:params,
              url: UpdateWritingInvoices,
               headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : oAuthDatas
                }
          });
  };
    
  // writing mangmnt
     this.GetAllWritingTasks = function(params,oAuthDatas) {

        return $http({
                method: 'GET',              
                params:params,
                url: GetAllWritingTasks,
                 headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : oAuthDatas
                }
            });
    };


      this.DeleteWritingTask = function(data,params,oAuthDatas) {

       return $http({
               method: 'POST',
              params: data,
               params:params,
               url: DeleteWritingTask + '/' + data.id,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : oAuthDatas
                }
           });
   };

        this.CreateWritingTask = function(data,params,oAuthDatas) {

       return $http({
               method: 'POST',
              data: data,
               params:params,
               url: CreateWritingTask,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : oAuthDatas
                }
           });
   };


      this.GetDetailsWritingTask = function(data,params,oAuthDatas) {

       return $http({
               method: 'POST',
              params: data,
               params:params,
               url: GetDetailsWritingTask + '/' + data.id,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : oAuthDatas
                }
           });
   };

    this.DeclineWritingTask = function(data,params,oAuthDatas) {
   
       return $http({
               method: 'POST',
              data: data,
               params:params,
               url: DeclineWritingTask,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : oAuthDatas
                }
           });
   };

   this.UpdateWritingTask = function(data,params,oAuthDatas) {
    
       return $http({
               method: 'POST',
              data: data,
               params:params,
               url: UpdateWritingTask,
               headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : oAuthDatas
                }
           });
   };





   //pdf metric..
     this.GetPdfReportById = function(data,params,oAuthDatas) {
  
       return $http({
               method: 'POST',
              params: data,
               params:params,
               url: GetPdfReportById + '/' + data.id,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : oAuthDatas
                }
           });
   };

      this.UpdatePdfMetricReport = function(data,params,oAuthDatas) {

       return $http({
               method: 'POST',
               data: data,
               params:params,
               url: UpdatePdfMetricReport,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : oAuthDatas
                }
           });
   }; //client post site mngmnt
    this.GetAllClientPosts = function(params,oAuthDatas) {

        return $http({
                method: 'GET',              
                params:params,
                url: GetAllClientPosts,
                 headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : oAuthDatas
                }
            });
    };
    
    
    this.FilterClientPosts = function(data,params,oAuthDatas) {
      
        return $http({
                method: 'POST',
                data: data,
                params:params,
                url: FilterClientPosts,
                 headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : oAuthDatas
                }
            });
    };

    
    
     this.AddMonitoringReport = function(data,params,oAuthDatas) {

       return $http({
               method: 'POST',
               data: data,
               params:params,
               url: AddMonitoringReport,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : oAuthDatas
                }
           });
   };

    this.UpdateMonitoringStatus = function(data,params,oAuthDatas) {

       return $http({
               method: 'POST',
               data: data,
               params:params,
               url: UpdateMonitoringStatus,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : oAuthDatas
                }
           });
   };

      this.GetMonitoringReport = function(data,params,oAuthDatas) {

       return $http({
               method: 'POST',
              params: data,
               params:params,
               url: GetMonitoringReport + '/' + data.id,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : oAuthDatas
                }
           });
   };

        this.UpdateMonitoringStatus = function(data,params,oAuthDatas) {

       return $http({
               method: 'POST',
               data: data,
               params:params,
               url: UpdateMonitoringStatus,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : oAuthDatas
                }
           });
   };
    this.UpdateMonitoringReport = function(data,params,oAuthDatas) {

       return $http({
               method: 'POST',
               data: data,
               params:params,
               url: UpdateMonitoringReport,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : oAuthDatas
                }
           });
   };
   
    //Audit Reports
    this.GetAllAuditReports = function(params,oAuthDatas) {

        return $http({
                method: 'GET',              
                params:params,
                url: GetAllAuditReports,
                 headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : oAuthDatas
                }
            });
    };
    
    
    this.FilterAuditReports = function(data,params,oAuthDatas) {
 
        return $http({
                method: 'POST',
                data: data,
                params:params,
                url: FilterAuditReports,
                 headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : oAuthDatas
                }
            });
    };
    
    this.GetContentById = function(data,params,oAuthDatas,id) {

        return $http({
                method: 'POST',
                data: data,
                params:params,
                url: GetContentById + '/' + id,
                 headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : oAuthDatas
                }
            });
    };
    
    
    this.SaveContentTemplate = function(data,params,oAuthDatas) {
 
        return $http({
                method: 'POST',
                data: data,
                params:params,
                url: SaveContentTemplate,
                 headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : oAuthDatas
                }
            });
    };
    
    
    //faq.......


    
    this.UpdateFaqStatus = function(data,params,oAuthDatas) {
 
        return $http({
                method: 'POST',
                data: data,
                params:params,
                url: UpdateFaqStatus ,
                 headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : oAuthDatas
                }
            });
    };



             this.UpdateFaq = function(data,params,oAuthDatas) {
 
        return $http({
                method: 'POST',
                data: data,
                params:params,
                url: UpdateFaq ,
                 headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : oAuthDatas
                }
            });
    };



      this.GetFaqById = function(data,params,oAuthDatas) {
 
        return $http({
                method: 'POST',
               params: data,
                params:params,
                url: GetFaqById + '/' + data.id,
                 headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : oAuthDatas
                }
            });
    };


             this.GetAllManageFaq = function(data,params,oAuthDatas) {
 
        return $http({
                method: 'POST',
                data: data,
                params:params,
                url: GetAllManageFaq ,
                 headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : oAuthDatas
                }
            });
    };


             this.AddFaq = function(data,params,oAuthDatas) {
 
        return $http({
                method: 'POST',
                data: data,
                params:params,
                url: AddFaq ,
                 headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : oAuthDatas
                }
            });
    };

     this.ShowArchivedFaq = function(params,oAuthDatas) {

        return $http({
                method: 'GET',              
                params:params,
                url: ShowArchivedFaq,
                 headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : oAuthDatas
                }
            });
    };


    //site Pdf metric ....

    
            this.AddPdfMetricReport = function(data,params,oAuthDatas) {
 
        return $http({
                method: 'POST',
                data: data,
                params:params,
                url: AddPdfMetricReport ,
                 headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : oAuthDatas
                }
            });
    };


            this.GetAllPDFMetricReports1 = function(data,params,oAuthDatas) {
 
        return $http({
                method: 'POST',
                data: data,
                params:params,
                url: GetAllPDFMetricReports1 ,
                 headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : oAuthDatas
                }
            });
    };

             this.ShowArchivedReports = function(data,params,oAuthDatas) {
 
        return $http({
                method: 'POST',
                data: data,
                params:params,
                url: ShowArchivedReports ,
                 headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : oAuthDatas
                }
            });
    };


      this.DeletePdfReport = function(data,params,oAuthDatas) {
 
        return $http({
                method: 'POST',
               params: data,
                params:params,
                url: DeletePdfReport + '/' + data.id,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : oAuthDatas
                }
            });
    };


    //Notice Services
    
    this.GetAllNotices = function(data,params,oAuthDatas) {
      
        return $http({
                method: 'POST',
                data: data,
                params:params,
                url: GetAllNotices ,
                 headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : oAuthDatas
                }
            });
    };
    
    
    this.GetNoticeById = function(data,params,oAuthDatas,id) {
      
        return $http({
                method: 'POST',
                data: data,
                params:params,
                url: GetNoticeById + '/' + id,
                 headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : oAuthDatas
                }
            });
    };
    
    
    
    this.showArchivedNotices = function(params,oAuthDatas) {

        return $http({
                method: 'GET',              
                params:params,
                url: showArchivedNotices,
                 headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : oAuthDatas
                }
            });
    };
    
    
    this.UpdateNoticeStatus = function(data,params,oAuthDatas) {
      
        return $http({
                method: 'POST',
                data: data,
                params:params,
                url: UpdateNoticeStatus,
                 headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : oAuthDatas
                }
            });
    };
    
    
    
    this.ActiveNoticeStatus = function(data,params,oAuthDatas) {
      
        return $http({
                method: 'POST',
                data: data,
                params:params,
                url: ActiveNoticeStatus,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : oAuthDatas
                }
            });
    };



    this.DeActiveNoticeStatus = function(data,params,oAuthDatas) {
      
        return $http({
                method: 'POST',
                data: data,
                params:params,
                url: DeActiveNoticeStatus,
                 headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : oAuthDatas
                }
            });
    };
    
    
    this.AddNotice = function(data,params,oAuthDatas) {
        
        return $http({
                method: 'POST',
                data: data,
                params:params,
                url: AddNotice,
                 headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : oAuthDatas
                }
            });
    };

    this.editNotice = function(data,params,oAuthDatas) {

            return $http({
                    method: 'POST',
                    data: data,
                    params:params,
                    url: editNotice,
                     headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : oAuthDatas
                }
                });
        };

    this.updateNotice = function(data,params,oAuthDatas) {

            return $http({
                    method: 'POST',
                    data: data,
                    params:params,
                    url: updateNotice,
                     headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : oAuthDatas
                }
                });
        };

    //site categories..

      this.GetAllCategories1 = function(params,oAuthDatas) {
    
        return $http({
                method: 'GET',
                params:params,
                url: GetAllCategories1 ,
                 headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : oAuthDatas
                }
            });
    };


      this.ArchivedCategories1 = function(params,oAuthDatas) {
    
        return $http({
                method: 'GET',
                params:params,
                url: ArchivedCategories1,
                 headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : oAuthDatas
                }
            });
    };

        this.AddCategory1 = function(data,params,oAuthDatas) {
 
        return $http({
                method: 'POST',
                data: data,
                params:params,
                url: AddCategory1 ,
                 headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : oAuthDatas
                }
            });
    };


        this.UpdateCategory1 = function(data,params,oAuthDatas) {
 
        return $http({
                method: 'POST',
                data: data,
                params:params,
                url: UpdateCategory1 ,
                 headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : oAuthDatas
                }
            });
    };


  this.deactCategory1 = function(data,params,oAuthDatas) {
 
        return $http({
                method: 'POST',
                data: data,
                params:params,
                url: deactCategory1 ,
                 headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : oAuthDatas
                }
            });
    };


        this.actCategory1 = function(data,params,oAuthDatas) {
 
        return $http({
                method: 'POST',
                data: data,
                params:params,
                url: actCategory1 ,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : oAuthDatas
                }
            });
    };




    //site mngmnt..

        this.getSiteMangmnt = function(params,oAuthDatas) {
    
        return $http({
                method: 'GET',
                params:params,
                url: getSiteMangmnt ,
                 headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : oAuthDatas
                }
            });
    };

       this.DeleteSiteBlogPlan = function(data,params,oAuthDatas) {
 
        return $http({
                method: 'POST',
                data: data,
                params:params,
                url: DeleteSiteBlogPlan ,
                 headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : oAuthDatas
                }
            });
    };

       this.AddSiteBlogPlan = function(data,params,oAuthDatas) {
 
        return $http({
                method: 'POST',
                data: data,
                params:params,
                url: AddSiteBlogPlan ,
                 headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : oAuthDatas
                }
            });
    };


       this.GetBlogPlansById = function(data,params,oAuthDatas) {
 
        return $http({
                method: 'POST',
                data: data,
                params:params,
                url: GetBlogPlansById ,
                 headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : oAuthDatas
                }
            });
    };


    
       this.UpdateSiteBlogPlan = function(data,params,oAuthDatas) {
 
        return $http({
                method: 'POST',
                data: data,
                params:params,
                url: UpdateSiteBlogPlan ,
                 headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : oAuthDatas
                }
            });
    };




    //contentMangmntRequest
      this.GetRequestContents = function(data,params,oAuthDatas) {
 
        return $http({
                method: 'POST',
                data: data,
                params:params,
                url: GetRequestContents ,
                 headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : oAuthDatas
                }
            });
    };




    this.AddRequestContents = function(data,params,oAuthDatas) {
 
        return $http({
                method: 'POST',
                data: data,
                params:params,
                url: AddRequestContents ,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : oAuthDatas
                }
            });
    };



    this.editRequestContentSubmit = function(data,params,oAuthDatas) {
 
        return $http({
                method: 'POST',
                data: data,
                params:params,
                url: editRequestContentSubmit ,
                 headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : oAuthDatas
                }
            });
    };

      this.EditRequestContents = function(data,params,oAuthDatas) {
 
        return $http({
                method: 'POST',
               params: data,
                params:params,
                url: EditRequestContents + '/' + data.id,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : oAuthDatas
                }
            });
    };

       this.ArchieveRequestContents = function(data,params,oAuthDatas) {
 
        return $http({
                method: 'POST',
                data: data,
                params:params,
                url: ArchieveRequestContents,
                 headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : oAuthDatas
                }
            });
    };


   this.ActivateRequestContents = function(data,params,oAuthDatas) {
 
        return $http({
                method: 'POST',
                data: data,
                params:params,
                url: ActivateRequestContents,
                 headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : oAuthDatas
                }
            });
    };

    this.ShowArchieveRequestContents = function(data,params,oAuthDatas) {
 
        return $http({
                method: 'POST',
                data: data,
                params:params,
                url: ShowArchieveRequestContents ,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : oAuthDatas
                }
            });
    };


this.ArchivePdfReport = function(data,params,oAuthDatas) {

       return $http({
               method: 'POST',
              params: data,
               params:params,
               url: ArchivePdfReport + '/' + data.id,
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : oAuthDatas
                }
           });
   };


   
   //login
    this.LogInServiceAuth = function(data,headers) {
        return $http.post(LogInServiceAuth,data,headers);
        
    };

    this.LogInServiceAuthForgotPwd = function(data) {
        return $http.post(LogInServiceAuthForgotPwd,data);
        
    };

    //my acc
    this.GetUserAccount = function(data,params,oAuthDatas) {

        return $http({
                method: 'POST',
                params: data,
                params:params,
                url: GetUserAccount + '/' + data,
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : oAuthDatas
                }
            });
    };

    this.UpdateUserAccount = function(data,params,oAuthDatas) {

        return $http({
                method: 'POST',
                data: data,
                params:params,
                url: UpdateUserAccount ,
                   headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : oAuthDatas
                }
            });
    };


    //client managmnt
    this.GetClientManagements = function(data,params,oAuthDatas) {

        return $http({
                method: 'POST',
                data: data,
                params:params,
                url: GetClientManagements,
                   headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : oAuthDatas
                }
            });
    };

     this.AddClient = function(data,params,oAuthDatas) {
        
        return $http({
                method: 'POST',
                data: data,
                params:params,
                url: AddClient,
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : oAuthDatas
                }
            });
    };

    this.editclientSubmit = function(data,params,oAuthDatas) {

            return $http({
                    method: 'POST',
                    data: data,
                    params:params,
                    url: editclientSubmit,
                       headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : oAuthDatas
                }
                });
        };

     this.editClient = function(data,params,oAuthDatas) {

            return $http({
                    method: 'POST',
                    data: data,
                    params:params,
                    url: editClient,
                       headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : oAuthDatas
                }
                });
        };

         this.DeleteClient = function(data,params,oAuthDatas) {
            
            return $http({
                    method: 'POST',
                    data: data,
                    params:params,
                    url: DeleteClient,
                      headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : oAuthDatas
                }
                });
        };

         this.deActivateClient = function(data,params,oAuthDatas) {

            return $http({
                    method: 'POST',
                    data: data,
                    params:params,
                    url: deActivateClient,
                       headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : oAuthDatas
                }
                });
        };

         this.ActivateClient = function(data,params,oAuthDatas) {
            
            return $http({
                    method: 'POST',
                    data: data,
                    params:params,
                    url: ActivateClient,
                      headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : oAuthDatas
                }
                });
        };

     this.ArchieveClient = function(data,params,oAuthDatas) {
            
            return $http({
                    method: 'POST',
                    data: data,
                    params:params,
                    url: ArchieveClient,
                       headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : oAuthDatas
                }
                });
        };






    //user management
    this.GetUserManagements = function(data,params,oAuthDatas) {

        return $http({
                method: 'POST',
                data: data,
                params:params,
                url: GetUserManagements,
                   headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : oAuthDatas
                }
            });
    };
 
    
    this.AddUser = function(data,params,oAuthDatas) {
        
        return $http({
                method: 'POST',
                data: data,
                params:params,
                url: AddUser,
                   headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : oAuthDatas
                }
            });
    };

this.IsExist = function(data,params,oAuthDatas,email) {
        
        return $http({
                method: 'POST',
                data: data,
                params:params,
                url: IsExist + '/' + email,
                   headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : oAuthDatas
                }
            });
    };

    
      this.editUserSubmit = function(data,params,oAuthDatas) {
        
        return $http({
                method: 'POST',
                data: data,
                params:params,
                url: editUserSubmit,
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : oAuthDatas
                }
            });
    };

 this.editUser = function(data,params,oAuthDatas) {
        
        return $http({
                method: 'POST',
                data: data,
                params:params,
                url: editUser,
                   headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : oAuthDatas
                }
            });
    };

    
    
    this.DeleteUser = function(data,params,oAuthDatas) {
            return $http({
                method: 'POST',
                data: data,
                params:params,
                url: DeleteUser,
                   headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : oAuthDatas
                }
            });
    };

    
    this.deActivateUser = function(data,params,oAuthDatas) {
          return $http({
                method: 'POST',
                data: data,
                params:params,
                url: deActivateUser,
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : oAuthDatas
                }
            });
    };
    
     this.ActivateUser = function(data,params,oAuthDatas) {
        return $http({
                method: 'POST',
                data: data,
                params:params,
                url: ActivateUser,
                   headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : oAuthDatas
                }
            });
    };
    //end of user management

    //social client Managment
    this.GetClientSocialManagements = function(data,params,oAuthDatas) {

        return $http({
                method: 'POST',
                data: data,
                params:params,
                url: GetClientSocialManagements,
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : oAuthDatas
                }
            });
    };

      this.editClientSocial = function(data,params,oAuthDatas) {
        
        return $http({
                method: 'POST',
                data: data,
                params:params,
                url: editClientSocial,
                   headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : oAuthDatas
                }
            });
    };

    this.DeleteClientSocial = function(data,params,oAuthDatas) {
            return $http({
                method: 'POST',
                data: data,
                params:params,
                url: DeleteClientSocial,
                   headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : oAuthDatas
                }
            });
    };

    this.AddClientSocial = function(data,params,oAuthDatas) {
        
        return $http({
                method: 'POST',
                data: data,
                params:params,
                url: AddClientSocial,
                   headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : oAuthDatas
                }
            });
    };


    this.editSocial = function(data,params,oAuthDatas) {

        return $http({
                method: 'POST',
                data: data,
                params:params,
                url: editSocial,
                   headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : oAuthDatas
                }
            });
    };

     this.ArchieveClientSocial = function(data,params,oAuthDatas) {

        return $http({
                method: 'POST',
                data: data,
                params:params,
                url: ArchieveClientSocial,
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : oAuthDatas
                }
            });
    };



     this.updateClientSocial = function(data,params,oAuthDatas) {

        return $http({
                method: 'POST',
                data: data,
                params:params,
                url: updateClientSocial,
                   headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : oAuthDatas
                }
            });
    };
 
    //end of social Managemnt


     this.GetBlogPlans = function(data,params,oAuthDatas) {

        return $http({
                method: 'POST',
                data: data,
                params:params,
                url: GetBlogPlans,
                   headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : oAuthDatas
                }
            });
    };
    
    
this.FilterByBlogClient = function(data,params,oAuthDatas) {

        return $http({
                method: 'POST',
                data: data,
                params:params,
                url: FilterByBlogClient,
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : oAuthDatas
                }
            });
    };

    //Failed Contents
    
    this.GetFailedContents = function(data,params,oAuthDatas) {

        return $http({
                method: 'POST',
                data: data,
                params:params,
                url: GetFailedContents,
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : oAuthDatas
                }
            });
    };
    
    
    this.GetFailedContentById = function(data,params,oAuthDatas) {
 
        return $http({
                method: 'POST',
                data: data,
                params:params,
                url: GetFailedContentById ,
                   headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : oAuthDatas
                }
            });
    };

    
    
    //Rss Feeds Services

     this.ActiveUpdateStatus1 = function(data,params,oAuthDatas) {
 
        return $http({
                method: 'POST',
                data: data,
                params:params,
                url: ActiveUpdateStatus1,
                   headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : oAuthDatas
                }
            });
    };



    this.DeActiveUpdateStatus1 = function(data,params,oAuthDatas) {
 
        return $http({
                method: 'POST',
                data: data,
                params:params,
                url: DeActiveUpdateStatus1,
                   headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : oAuthDatas
                }
            });
    };


       this.AddRssFeed = function(data,params,oAuthDatas) {
 
        return $http({
                method: 'POST',
                data: data,
                params:params,
                url: AddRssFeed ,
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : oAuthDatas
                }
            });
    };
    
    this.GetAllRssFeeds = function(data,params,oAuthDatas) {
 
        return $http({
                method: 'POST',
                data: data,
                params:params,
                url: GetAllRssFeeds ,
                   headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : oAuthDatas
                }
            });
    };

     this.GetRssFeedById = function(data,params,oAuthDatas) {
 
        return $http({
                method: 'POST',
                data: data,
                params:params,
                url: GetRssFeedById ,
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : oAuthDatas
                }
            });
    };
    
     this.ShowArchiveRssFeeds = function(params,oAuthDatas) {

        return $http({
                method: 'GET',              
                params:params,
                url: ShowArchiveRssFeeds,
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : oAuthDatas
                }
            });
    };
    
    
    this.UpdateStatus = function(data,params,oAuthDatas) {
 
        return $http({
                method: 'POST',
                data: data,
                params:params,
                url: UpdateStatus,
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : oAuthDatas
                }
            });
    };

    //Notice Services
    
    this.GetAllNotices = function(data,params,oAuthDatas) {
 
        return $http({
                method: 'POST',
                data: data,
                params:params,
                url: GetAllNotices ,
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : oAuthDatas
                }
            });
    };
    
    
    //site monitoring report..
        this.ShowArchiveMonitoringReports = function(params,oAuthDatas) {

        return $http({
                method: 'GET',              
                params:params,
                url: ShowArchiveMonitoringReports,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : oAuthDatas
                }
            });
    };
    
    
    this.GetAllMonitoringReports = function(data,params,oAuthDatas) {
        console.log(data);
        return $http({
                method: 'POST',
                data: data,
                params:params,
                url: GetAllMonitoringReports,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization' : oAuthDatas
                }
            });
    };
    
    this.shortenURL = function(data) {
        console.log(data);
        return $http({
                method: 'POST',
                data: 'url=' +data,
                url: shortenURL,
            headers : {'Content-Type': 'application/x-www-form-urlencoded'} 
            });
    };
    
 }]);


           