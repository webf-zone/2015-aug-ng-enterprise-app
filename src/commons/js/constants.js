(function () {
    "use strict";

    var app = angular.module("ProjectManagementModule");

    /**
     * @ngdoc object
     * @name ProjectManagementModule.constant:STATES
     * @description
     * defines the constant used in enterprise application
     */

    app.constant("STATES", {
        DASHBOARD: "dashboard",
        PROJECT_LIST: "project-list",
        PROJECT_EDIT: "project-edit",
        ERROR: "error"
    });

})();
