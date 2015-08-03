(function () {
    "use strict";

    var app = angular.module("ProjectManagementModule");

    app.factory("memberFactory", memberFactory);

    /*@ngInject*/
    function memberFactory($http, $q, urlFactory) {

        function getProjectMembers(projectId) {
            var request;

            request = {
                method: "GET",
                url: urlFactory.get("projectMembers", {
                    projectId: projectId
                })
            };

            return $http(request).then(function (response) {
                return response.data;
            });
        }

        return {
            getProjectMembers: getProjectMembers
        };
    }


})();
