(function () {
    "use strict";

    var app = angular.module("ProjectManagementModule");

    /**
     * @ngdoc controller
     * @name ProjectManagementModule.controller:ProjectListController
     * @description
     * Dashboard controller
    */
    app.controller("ProjectListController", ProjectListController);

    /*@ngInject*/
    function ProjectListController($state, projectStore) {

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
