(function () {
    "use strict";

    var app = angular.module("ProjectManagementModule");

    app.controller("DashboardController", DashboardController);

    /*@ngInject*/
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
