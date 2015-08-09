(function () {
    "use strict";

    var app = angular.module("ProjectManagementModule");

    /**
     * @ngdoc service
     * @name ProjectManagementModule.factory:utilsFactory
     * @description
     * contain utilities for the enterprise application
     */

    app.factory("utilsFactory", utilsFactory);

    /*@ngInject*/
    function utilsFactory() {

        return {
            constructUrl: _constructUrl,
            isPromise: _isPromise,
            setSubstraction: _setSubstraction
        };
    }

    /**
     * @ngdoc method
     * @name constructUrl
     * @methodOf ProjectManagementModule.factory:utilsFactory
     * @description
     * create ng-resource like templated dynamic URL
     *
     * @param {String} url url
     * @param {String} urlParams parameters to be added to url
     * @returns {String} constructed url
     */

    function _constructUrl(url, urlParams) {

        urlParams = urlParams || {};

        Object.keys(urlParams).forEach(function (param) {
            url = url.replace(":" + param, urlParams[param]);
        });

        return url;
    }

    /**
     * @ngdoc method
     * @name isPromise
     * @methodOf ProjectManagementModule.factory:utilsFactory
     * @description
     * find whether the passed object is promise or not
     *
     * @param {Object} obj passed object
     * @returns {Boolean} whether it is a promise or not
     */

    function _isPromise(obj) {

        var isItPromise = false;

        if (!!obj && obj.then instanceof Function) {
            isItPromise = true;
        }

        return isItPromise;
    }

    function _setSubstraction(A, B) {
        return A.filter(function (x) {

            var searched;

            searched = B.every(function (y) {
                return x !== y;
            });

            return searched;
        });
    }

})();
