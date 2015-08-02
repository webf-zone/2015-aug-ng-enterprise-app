(function () {
    "use strict";

    var app = angular.module("ProjectManagementModule");

    app.controller("ProjectManagerController", ProjectManagerController);

    /*@ngInject*/
    function ProjectManagerController($scope, $state, getProjectList) {

        $scope.editProject = editProject;

        getProjectList.getProjectList().then(function (data) {
            $scope.projects = data.projects;
        });

        function editProject() {
            $state.go("edit-project");
        }

    }

}());
