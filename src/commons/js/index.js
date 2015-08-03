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
            .state(STATES.PROJECTLIST, {
                url: "/project-list",
                templateUrl: "modules/project-list/project-list.html",
                controller: "ProjectListController",
                controllerAs: "vm"
            })
            .state(STATES.PROJECTEDIT, {
                url: "/edit-project",
                templateUrl: "modules/edit-project/edit-project.html",
                controller: "ProjectManagerController"
            });

    });

})();
