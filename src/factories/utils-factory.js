(function () {
    "use strict";

    var app = angular.module("ProjectManagementModule");

    app.factory("utilsFactory", utilsFactory);

    /*@ngInject*/
    function utilsFactory() {

        return {
            constructUrl: _constructUrl,
            isPromise: _isPromise
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

    function _isPromise(obj) {

        var isItPromise = false;

        if (!!obj && obj.then instanceof Function) {
            isItPromise = true;
        }

        return isItPromise;
    }

})();
