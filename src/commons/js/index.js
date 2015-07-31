(function() {

    "use strict";

    var app = angular.module("PrjMgmtModule", ["ui.router"]);

    app.config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise("/dashboard");

        $stateProvider
            .state("dashboard", {
                url: "/dashboard",
                templateUrl: "modules/dashboard/dashboard.html",
                controller: "DashboardController"
            })
            .state("edit-project", {
                url: "/edit-project",
                templateUrl: "modules/edit-project/edit-project.html",
                controller: "ProjectManagerController"
            });

    }]);


})();