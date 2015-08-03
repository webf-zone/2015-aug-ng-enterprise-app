(function () {
    "use strict";

    var app = angular.module("ProjectManagementModule");

    app.controller("ProjectManagerController", ProjectManagerController);

    /*@ngInject*/
    function ProjectManagerController($state) {

        /* controller instance */
        var vm = this;

        /* Bindable members declaration */
        vm.heading = "Edit Project";
        vm.members = [];

        init();

        /* Public members */

        /* Private members */
        function init() {

            vm.members = [{
                display: "Debjit Biswas",
                value: "debjit",
                isMember: false
            }, {
                display: "Harshal Patil",
                value: "harshal",
                isMember: false
            }, {
                display: "Kumar Bhot",
                value: "kumar",
                isMember: false
            }, {
                display: "Niloy Mondal",
                value: "niloy",
                isMember: false
            }];

        }

    }

}());
