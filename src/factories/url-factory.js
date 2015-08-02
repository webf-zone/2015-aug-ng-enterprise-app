(function () {
    "use strict";

    var app = angular.module("ProjectManagementModule");

    app.factory("urlFactory", urlFactory);

    /*@ngInject*/
    function urlFactory(utilsFactory) {

        var factory;

        factory = {
            get: get,
            projects: "/api/project-list.json"
        };

        function get(urlIdentifier, urlParams) {
            return utilsFactory.constructUrl(factory[urlIdentifier], urlParams);
        }

        return factory;
    }

})();
