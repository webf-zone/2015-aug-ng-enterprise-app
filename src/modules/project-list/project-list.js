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
    function ProjectListController($state, projectStore, STATES) {

        var selectedProjects;

        /* Reference to controller */
        var vm = this;

        /* Bindable data */
        vm.allProjectsSelected = false;

        /* Bindable methods */
        vm.editProject = editProject;
        vm.selectProject = selectProject;
        vm.isProjectSelected = isProjectSelected;
        vm.isAnyProjectSelected = isAnyProjectSelected;
        vm.deleteProject = deleteProject;

        init();

        /* Bindable members */
        function editProject(projectItem) {

            $state.go(STATES.PROJECT_EDIT, {
                projectId: projectItem.projectId
            });

        }

        function selectProject(projectItem) {
            var itemIndex;

            if (projectItem === "all") {
                if (selectedProjects.length < vm.projectList.length) {
                    selectedProjects = vm.projectList.slice(0);
                } else {
                    selectedProjects = [];
                }

            } else if (typeof projectItem === "object") {
                itemIndex = selectedProjects.indexOf(projectItem);

                if (itemIndex === -1) {
                    selectedProjects.push(projectItem);
                } else {
                    selectedProjects.splice(itemIndex, 1);
                }
            }

            vm.allProjectsSelected = selectedProjects.length === vm.projectList.length;
        }

        function isProjectSelected(projectItem) {
            return selectedProjects.indexOf(projectItem) > -1;
        }

        function isAnyProjectSelected() {
            return selectedProjects.length === 0;
        }

        function deleteProject() { }

        /* Private members */
        function init() {
            selectedProjects = [];

            vm.allProjectsSelected = false;

            projectStore.getAll().then(function (projects) {
                vm.projectList = projects;
            });
        }

    }

}());
