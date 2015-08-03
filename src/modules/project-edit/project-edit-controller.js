(function () {
    "use strict";

    var app = angular.module("ProjectManagementModule");

    app.controller("ProjectManagerController", ProjectManagerController);

    /*@ngInject*/
    function ProjectManagerController($state, STATES) {

        var stateName;

        /* controller instance */
        var vm = this;

        /* Bindable members declaration */
        vm.heading = "";
        vm.members = [];
        vm.isEditAction = null;

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

            stateName = $state.current.name;

            if (stateName === STATES.PROJECT_EDIT) {
                vm.isEditAction = true;
                vm.heading = "Edit Project";
            } else if (stateName === STATES.PROJECT_ADD) {
                vm.isEditAction = false;
                vm.heading = "Add Project";
            } else {
                $state.go(STATES.ERROR);
                return;
            }

        }

    }

}());
