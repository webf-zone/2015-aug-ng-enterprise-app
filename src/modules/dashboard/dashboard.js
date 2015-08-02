(function () {
    "use strict";

    var app = angular.module("ProjectManagementModule");

    app.controller("DashboardController", DashboardController);

    /*@ngInject*/
    function DashboardController($scope, $state, projectFactory) {

        $scope.editProject = editProject;

        projectFactory.getProjectList().then(function (data) {
            $scope.projects = data.projects;
        });

        function editProject() {
            $state.go("edit-project");
        }

    }

}());
