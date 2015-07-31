(function() {
    "use strict";

    var app = angular.module("PrjMgmtModule");

    app.controller("ProjectManagerController", ["$scope", "$state", "prjManager", ProjectManagerController]);

    function ProjectManagerController($scope, $state, prjManager) {

        $scope.editProject = editProject;

        prjManager.getPrjList().then(function(data) {
            $scope.projects = data.projects;
        });

        function editProject(prj) {
            $state.go("edit-project");
        }

    }

}());