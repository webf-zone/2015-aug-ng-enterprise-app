(function () {
    "use strict";

    var app = angular.module("ProjectManagementModule");

    app.factory("utilsFactory", utilsFactory);

    /*@ngInject*/
    function utilsFactory() {

        return {
            constructUrl: _constructUrl
        };
    }

    /* ng-resource like templated dynamic URL construction */
    function _constructUrl(url, urlParams) {

        urlParams = urlParams || {};

        Object.keys(urlParams).forEach(function (param) {
            url = url.replace(":" + param, urlParams[param]);
        });

        return url;
    }

})();
