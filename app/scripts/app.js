'use strict';

angular
    .module('chsApp', [
'ngAnimate',
'ngAria',
'ngCookies',
'ngMessages',
'ngResource',
'ngRoute',
'ngSanitize',
'ngTouch',
'wt.responsive', '720kb.datepicker', 'textAngular', 'naif.base64', 'customDatePicker', 'angular-growl', 'ui.calendar', 'angular-loading-bar', 'mwl.calendar'
])

.config(['growlProvider', function (growlProvider) {

    growlProvider.globalTimeToLive(3000);
}])

.config(function ($routeProvider) {
    $routeProvider
        .when(folderName + '/', {
            templateUrl: 'views/login.html',
            controller: 'LoginCtrl',

        })
        .when(folderName + '/Dashboard', {
            templateUrl: 'views/dashboard.html',
            controller: 'dashboardCtrl',

        })
        .when(folderName + '/DashboardWriter', {
            templateUrl: 'views/DashboardWriter.html',
            controller: 'DashboardWriterCtrl',

        })

        .when(folderName + '/MyInvoices', {
            templateUrl: 'views/MyInvoices.html',
            controller: 'MyInvoicesCtrl',

        })
        .when(folderName + '/ContentManagement/ManageContent', {
            templateUrl: 'views/manage-content.html',
            controller: 'manageContentCtrl',

        })
        .when(folderName + '/ContentManagement/ContentRequest', {
            templateUrl: 'views/content-request.html',
            controller: 'contentRequestCtrl',

        })
        .when(folderName + '/ContentManagement/BlogPlans', {
            templateUrl: 'views/blogPlans.html',
            controller: 'blogPlansCtrl',

        })
        .when(folderName + '/ContentManagement/FailedContent', {
            templateUrl: 'views/failed-contents.html',
            controller: 'failedContentsCtrl',

        })
        .when(folderName + '/ClientManagement/Main', {
            templateUrl: 'views/manage-clients.html',
            controller: 'manageClientCtrl',

        })
        .when(folderName + '/ClientManagement/SocialSites', {
            templateUrl: 'views/manage-socialsites.html',
            controller: 'manageSocialsitesCtrl',

        })
        .when(folderName + '/UserManagement', {
            templateUrl: 'views/userManagement.html',
            controller: 'userManageCtrl',

        })
        .when(folderName + '/SiteManagement/RSSFeeds', {
            templateUrl: 'views/rss-feeds.html',
            controller: 'rssFeedsCtrl',

        })
        .when(folderName + '/SiteManagement/BlogPlans', {
            templateUrl: 'views/site-blogplans.html',
            controller: 'siteblogPlanCtrl',

        })
        .when(folderName + '/SiteManagement/Notices', {
            templateUrl: 'views/notices.html',
            controller: 'siteNoticesCtrl',

        })
        .when(folderName + '/SiteManagement/Categories', {
            templateUrl: 'views/categories.html',
            controller: 'siteCategoriesCtrl',

        })
        .when(folderName + '/SiteManagement/PDFMetricReports', {
            templateUrl: 'views/pdf-metrics.html',
            controller: 'sitePdfMetricesCtrl',

        })

       .when(folderName + '/SiteManagement/AuditReport', {
            templateUrl: 'views/audit-report.html',
            controller: 'auditReportCtrl',

        })
        .when(folderName + '/SiteManagement/PostedContentReport', {
            templateUrl: 'views/posting-report.html',
            controller: 'PostContentReportCtrl',

        })
        .when(folderName + '/SiteManagement/MonitoringReports', {
            templateUrl: 'views/monitoring-report.html',
            controller: 'monitoringReportCtrl',

        })
        .when(folderName + '/WritingManagement/WriterJobs', {
            templateUrl: 'views/writer-job.html',
            controller: 'writerJobCtrl',

        })
        .when(folderName + '/WritingManagement/WritingTasks', {
            templateUrl: 'views/writing-task.html',
            controller: 'writingTaskCtrl',

        })
        .when(folderName + '/WritingManagement/CreateAnInvoice', {
            templateUrl: 'views/create-invoice.html',
            controller: 'createInvoiceTaskCtrl',

        })
        .when(folderName + '/WritingManagement/WriterInvoices', {
            templateUrl: 'views/writer-invoice.html',
            controller: 'writerInvoiceTaskCtrl',

        })
        .when(folderName + '/WritingManagement/WeeklyPackageLists', {
            templateUrl: 'views/weekly-packlist.html',
            controller: 'WeeklyPackageListsCtrl',

        })
        .when(folderName + '/myacount', {
            templateUrl: 'views/myacount.html',
            controller: 'myacountCtrl',

        })

       .when(folderName + '/forgotPassword', {
            templateUrl: 'views/forgotPassword.html',
            controller: 'forgotPasswordCtrl',

        })
        .when(folderName + '/Help/FAQ', {
            templateUrl: 'views/manage-faq.html',
            controller: 'manageFaqCtrl',

        })

      .when(folderName + '/Help/SupportForum', {
        templateUrl: 'views/support-form.html',
        controller: 'manageFaqCtrl',

    })

    .otherwise({
        redirectTo: folderName + "/",
    });
});