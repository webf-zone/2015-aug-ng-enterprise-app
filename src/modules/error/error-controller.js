(function () {
    "use strict";

    var app = angular.module("ProjectManagementModule");

    app.controller("ErrorController", ErrorController);

    /*@ngInject*/
    function ErrorController(STATES) {

        /* controller instance */
        var vm = this;

        vm.STATES = STATES;

    }

}());
