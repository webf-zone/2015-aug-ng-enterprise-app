(function () {
    "use strict";

    var app = angular.module("ProjectManagementModule");

    /**
     * @ngdoc controller
     * @name ProjectManagementModule.controller:DashboardController
     * @description
     * Dashboard controller
    */
    app.controller("DashboardController", DashboardController);

    /*@ngInject*/
    function DashboardController(STATES) {

        var vm = this;

        vm.STATES = STATES;

    }

}());
