(function () {
    "use strict";

    var app = angular.module("ProjectManagementModule");

    app.factory("projectFactory", projectFactory);

    /*@ngInject*/
    function projectFactory($http, $q, urlFactory) {
        var getProjectsRequest;


        getProjectsRequest = {
            method: "GET",
            url: urlFactory.get("projects")
        };

        function getProjects() {
            var request = angular.copy(getProjectsRequest);

            return $http(request).then(function (response) {
                return response.data;
            });
        }

        function getProject(projectId) {
            var request;

            request = {
                method: "GET",
                url: urlFactory.get("project", {
                    projectId: projectId
                })
            };

            return $http(request).then(function (response) {
                return response.data;
            });
        }

        return {
            getProjects: getProjects,
            getProject: getProject
        };
    }


})();
