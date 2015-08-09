(function () {
    "use strict";

    var app = angular.module("ProjectManagementModule");

    /**
     * @ngdoc controller
     * @name ProjectManagementModule.controller:ProjectManagerController
     * @description
     * Project Manager Controller
    */

    app.controller("ProjectManagerController", ProjectManagerController);

    /*@ngInject*/
    function ProjectManagerController($state, $stateParams, STATES, projectStore) {

        var stateName, projectId;

        /* controller instance */
        var vm = this;

        /* Bindable members declaration */
        vm.heading = "";
        vm.members = [];
        vm.isEditMode = null;
        vm.saveProject = saveProject;
        vm.STATES = STATES;

        init();
        getProjectDetails();

        /**
         * @ngdoc method
         * @name saveProject
         * @methodOf ProjectManagementModule.controller:ProjectManagerController
         * @description
         * Public member
         * update existing project or add new project
         */

        function saveProject() {

            var request = {
                projectId: projectId,
                name: vm.newProjectName,
                description: vm.newDescription,
                members: null
            };

            request.members = vm.members.reduce(function (list, member) {
                if (member.isMember) {
                    list.push(member.value);
                }

                return list;
            }, []);


            /* Do form validations at this level */
            if (vm.isEditMode) {
                updateProject(request);
            } else {
                addProject(request);
            }
        }

        /**
         * @ngdoc method
         * @name init
         * @methodOf ProjectManagementModule.controller:ProjectManagerController
         * @description
         * Private member
         * initialize the controller
         */

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
                vm.isEditMode = true;
                vm.heading = "Edit Project";

                if ($stateParams.projectId) {
                    projectId = $stateParams.projectId;
                } else {
                    $state.go(STATES.ERROR);
                    return;
                }

            } else if (stateName === STATES.PROJECT_ADD) {
                vm.isEditMode = false;
                vm.heading = "Add Project";
            } else {
                $state.go(STATES.ERROR);
                return;
            }

        }

        /**
         * @ngdoc method
         * @name getProjectDetails
         * @methodOf ProjectManagementModule.controller:ProjectManagerController
         * @description
         * retrieve the details of project
         */

        function getProjectDetails() {
            if (vm.isEditMode) {

                projectStore.get(projectId, ["members"])
                    .then(function (projectData) {

                        vm.project = projectData;
                        vm.newProjectName = projectData.name;
                        vm.newDescription = projectData.description;

                        projectData.members.forEach(function (member) {

                            vm.members.some(function (_member) {
                                if (member.value === _member.value) {
                                    _member.isMember = member.isMember;

                                    return true;
                                } else {
                                    return false;
                                }
                            });

                        });

                    });
            }
        }

        /**
         * @ngdoc method
         * @name updateProject
         * @methodOf ProjectManagementModule.controller:ProjectManagerController
         * @description
         * update existing project when edited
         */

        function updateProject(request) {

            return projectStore.update(request)
                .then(function () {
                    window.alert("Project updated successfully");
                    $state.go(STATES.PROJECT_LIST);
                });

        }

        /**
         * @ngdoc method
         * @name addProject
         * @methodOf ProjectManagementModule.controller:ProjectManagerController
         * @description
         * add new project
         */

        function addProject(request) {

            return projectStore.add(request)
                .then(function () {
                    window.alert("Project added successfully");
                    $state.go(STATES.PROJECT_LIST);
                });

        }
    }

}());
