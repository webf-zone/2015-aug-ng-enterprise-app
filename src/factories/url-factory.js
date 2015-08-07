(function () {
    "use strict";

    var app = angular.module("ProjectManagementModule");

    /**
     * @ngdoc service
     * @name ProjectManagementModule.factory:urlFactory
     * @description
     * stores all the url used in the enterprise application
     */

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

        /**
         * @ngdoc method
         * @name get
         * @methodOf ProjectManagementModule.factory:memberFactory
         * @description
         * calls utilsfactory to contruct url
         *
         * @param {String} urlIdentifier url's identifier
         * @returns {String} constructed url
         */

        function get(urlIdentifier, urlParams) {
            return utilsFactory.constructUrl(factory[urlIdentifier], urlParams);
        }

        return factory;
    }

})();
