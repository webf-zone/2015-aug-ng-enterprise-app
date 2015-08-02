(function () {
    "use strict";

    var app = angular.module("ProjectManagementModule");

    app.factory("projectFactory", projectFactory);

    /*@ngInject*/
    function projectFactory($http, $q, urlFactory) {
        var getPrjListRequest;


        getPrjListRequest = {
            method: "GET",
            url: urlFactory.get("projects")
        };

        function getProjectList() {
            var request = angular.copy(getPrjListRequest);
            return $http(request).then(function (response) {
                return response.data;
            });
        }

        return {
            getProjectList: getProjectList
        };
    }


})();
