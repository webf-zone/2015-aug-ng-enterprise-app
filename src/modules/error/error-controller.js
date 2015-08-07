(function () {
    "use strict";

    var app = angular.module("ProjectManagementModule");

    /**
     * @ngdoc controller
     * @name ProjectManagementModule.controller:ErrorController
     * @description
     * Error Controller
    */

    app.controller("ErrorController", ErrorController);

    /*@ngInject*/
    function ErrorController(STATES) {

        /* controller instance */
        var vm = this;

        vm.STATES = STATES;

    }

}());
