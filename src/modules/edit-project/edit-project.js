(function () {
    "use strict";

    var app = angular.module("ProjectManagementModule");

    app.controller("ProjectManagerController", ProjectManagerController);

    /*@ngInject*/
    function ProjectManagerController($scope, $state) {

        $scope.editProject = editProject;

        function editProject() {
            $state.go("edit-project");
        }

    }

}());
