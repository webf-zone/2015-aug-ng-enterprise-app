(function () {
    "use strict";

    var app = angular.module("ProjectManagementModule");

    app.constant("STATES", {
        DASHBOARD: "dashboard",
        PROJECT_LIST: "project-list",
        PROJECT_EDIT: "project-edit"
    });

})();
