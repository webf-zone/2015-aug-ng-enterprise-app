(function () {
    "use strict";

    /**
     * @module ProjectManagementModule
     * @requires ui.router
     * @description
     * Top level module for this application
     *
    */
    var app = angular.module("ProjectManagementModule", ["ui.router"]);

    /*@ngInject*/
    app.config(function ($stateProvider, $urlRouterProvider, STATES) {

        $urlRouterProvider.otherwise("/dashboard");

        $stateProvider
            .state(STATES.DASHBOARD, {
                url: "/dashboard",
                templateUrl: "modules/dashboard/dashboard.html",
                controller: "DashboardController",
                controllerAs: "vm"
            })
            .state(STATES.PROJECT_LIST, {
                url: "/project-list",
                templateUrl: "modules/project-list/project-list.html",
                controller: "ProjectListController",
                controllerAs: "vm"
            })
            .state(STATES.PROJECT_EDIT, {
                url: "/edit/:projectId",
                templateUrl: "modules/project-edit/project-edit.html",
                controller: "ProjectManagerController",
                controllerAs: "vm"
            })
            .state(STATES.ERROR, {
                url: "/error",
                templateUrl: "modules/error/error.html",
                controller: "ErrorController",
                controllerAs: "vm"
            });

    });

})();
