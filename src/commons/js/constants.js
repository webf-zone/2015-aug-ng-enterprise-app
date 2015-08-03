(function () {
    "use strict";

    var app = angular.module("ProjectManagementModule");

    app.constant("STATES", {
        DASHBOARD: "dashboard",
        PROJECTLIST: "project-list",
        PROJECTEDIT: "project-edit"
    });

})();
