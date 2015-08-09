(function () {
    "use strict";

    var app = angular.module("ProjectManagementModule");

    /**
     * @ngdoc service
     * @name ProjectManagementModule.factory:memberFactory
     * @description
     * provide data for project's members
     * it is a low level entity and controller should not directly communicate with it.
     * I should be done through data-store
     */

    app.factory("memberFactory", memberFactory);

    function memberFactory($http, $q, urlFactory) {

        /**
         * @ngdoc method
         * @name getProjectMembers
         * @methodOf ProjectManagementModule.factory:memberFactory
         * @description
         * makes a http call to provide list of all members present in a project
         *
         * @param {Number} projectId Project Id
         * @returns {Array} list of members
         */

        function getProjectMembers(projectId) {
            var request;

            request = {
                method: "GET",
                url: urlFactory.get("projectMembers", {
                    projectId: projectId
                })
            };

            return $http(request).then(function (response) {
                return response.data || [];
            });
        }

        function addProjectMember(projectId, memberValue) {
            return _updateProjectMember("PUT", projectId, memberValue);
        }

        function removeProjectMember(projectId, memberValue) {
            return _updateProjectMember("DELETE", projectId, memberValue);
        }

        function _updateProjectMember(method, projectId, memberValue) {

            var request = {
                method: method,
                url: urlFactory.get("projectMember", {
                    projectId: projectId,
                    memberValue: memberValue
                }),
                data: {}
            };

            return $http(request)
                .then(function (response) {
                    return response.data;
                })
                .catch(function () {
                    return $q.reject("Failed");
                });
        }

        return {
            getProjectMembers: getProjectMembers,
            addProjectMember: addProjectMember,
            removeProjectMember: removeProjectMember
        };
    }
})();
