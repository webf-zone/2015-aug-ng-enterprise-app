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

    app.config(["$stateProvider", "$urlRouterProvider", function ($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise("/dashboard");

        $stateProvider
            .state("dashboard", {
                url: "/dashboard",
                templateUrl: "modules/dashboard/dashboard.html",
                controller: "DashboardController",
                controllerAs: "vm"
            })
            .state("edit-project", {
                url: "/edit-project",
                templateUrl: "modules/edit-project/edit-project.html",
                controller: "ProjectManagerController"
            });

    }]);
})();
