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

    function DashboardController($state, projectStore) {

        var vm = this;

        vm.editProject = editProject;

        projectStore.getAll().then(function (projects) {
            vm.projects = projects;
        });

        function editProject() {
            $state.go("edit-project");
        }

    }

}());
