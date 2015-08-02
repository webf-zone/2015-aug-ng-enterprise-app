/* global console */
(function () {
    "use strict";

    requirejs.onError = function (err) { window.console.log("RequireJS error:", err); };
    require.config({
        baseUrl: "",
        waitSeconds: 40,
        paths: {
            jquery: "/commons/js/jquery",
            angular: "/commons/js/angular",
            uiRouter: "/commons/js/angular-ui-router",
            app: "/commons/js/app-bundle"
        },
        shim: {
            jquery: { exports: "$", deps: [] },
            angular: { exports: "angular", deps: ["jquery"] },
            uiRouter: { exports: "ui-router", deps: ["angular"] },
            app: ["angular", "uiRouter"]
        }
    });

    require(["app"], function () {
        var root = angular.element(document.getElementById("ng-app"));

        angular.bootstrap(document, [root.data("the-app")]);
    });

})();
