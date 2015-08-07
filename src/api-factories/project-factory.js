(function () {
    "use strict";

    var app = angular.module("ProjectManagementModule");

    /**
     * @ngdoc service
     * @name ProjectManagementModule.factory:projectFactory
     * @description
     * provide data for projects
     * it is a low level entity and controller should not directly communicate with it.
     * I should be done through data-store
     */

    app.factory("projectFactory", projectFactory);

    /*@ngInject*/
    function projectFactory($http, $q, urlFactory) {
        var getProjectsRequest;


        getProjectsRequest = {
            method: "GET",
            url: urlFactory.get("projects")
        };

        /**
         * @ngdoc method
         * @name getProjects
         * @methodOf ProjectManagementModule.factory:projectFactory
         * @description
         * makes a http call to retrieve details of all projects
         * @returns {Object} promise
         */

        function getProjects() {
            var request = angular.copy(getProjectsRequest);

            return $http(request).then(function (response) {
                return response.data;
            });
        }

        /**
         * @ngdoc method
         * @name getProject
         * @methodOf ProjectManagementModule.factory:projectFactory
         * @description
         * makes a http call to retrieve details of a project
         * @returns {Object} promise
         */

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
