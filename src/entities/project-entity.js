(function () {
    "use strict";

    var app = angular.module("ProjectManagementModule"),
        projectProto;

    projectProto = Object.defineProperties({}, {});

    app.value("projectEntity", projectEntity);

    function projectEntity(obj) {

        return Object.create(projectProto, {
            projectId: {
                value: obj.id,
                writable: true
            },

            name: {
                value: obj.project_name,
                writable: true
            },

            description: {
                value: obj.desc,
                writable: true
            },

            memberCount: {
                value: obj.no_of_members || [],
                writable: true
            },

            members: {
                value: obj.members || [],
                writable: true
            }
        });
    }

})();
