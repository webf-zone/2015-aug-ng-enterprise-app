(function () {
    "use strict";

    var app = angular.module("ProjectManagementModule");

    app.factory("urlFactory", urlFactory);

    /*@ngInject*/
    function urlFactory(utilsFactory) {

        var factory;

        factory = {
            get: get,
            project: "/api/projects/:projectId.json",
            projects: "/api/project-list.json",
            projectMembers: "/api/projects/:projectId/members.json"
        };

        function get(urlIdentifier, urlParams) {
            return utilsFactory.constructUrl(factory[urlIdentifier], urlParams);
        }

        return factory;
    }

})();
