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
        vm.addProject = addProject;

        init();

        /**
         * @ngdoc method
         * @name editProject
         * @methodOf ProjectManagementModule.controller:ProjectListController
         * @description
         * redirects to edit project view
         */

        function editProject(projectItem) {

            $state.go(STATES.PROJECT_EDIT, {
                projectId: projectItem.projectId
            });

        }

        /**
         * @ngdoc method
         * @name selectProject
         * @methodOf ProjectManagementModule.controller:ProjectListController
         * @description
         * called when project/projects are selected and update selectedProjects property
         */

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

        /**
         * @ngdoc method
         * @name isProjectSelected
         * @methodOf ProjectManagementModule.controller:ProjectListController
         * @description
         * finds whether the given project is selected or not
         * @param {Object} projectItem project to be find whether it is selected or not
         */

        function isProjectSelected(projectItem) {
            return selectedProjects.indexOf(projectItem) > -1;
        }

        /**
         * @ngdoc method
         * @name isAnyProjectSelected
         * @methodOf ProjectManagementModule.controller:ProjectListController
         * @description
         * finds whether any project is selected or not
         * @return {Boolean} true/false depending on whether any project is selected or not
         */

        function isAnyProjectSelected() {
            return selectedProjects.length === 0;
        }

        /**
         * @ngdoc method
         * @name deleteProject
         * @methodOf ProjectManagementModule.controller:ProjectListController
         * @description
         * deletes a project
         */

        function deleteProject() { }

        function addProject() {
            $state.go(STATES.PROJECT_ADD);
        }

        /**
         * @ngdoc method
         * @name init
         * @methodOf ProjectManagementModule.controller:ProjectListController
         * @description
         * Private members
         * initialize the controller
         */

        function init() {
            selectedProjects = [];

            vm.allProjectsSelected = false;

            projectStore.getAll().then(function (projects) {
                vm.projectList = projects;
            });
        }

    }

}());
