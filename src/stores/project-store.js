(function () {
    "use strict";

    var app = angular.module("ProjectManagementModule");

    app.service("projectStore", projectStore);

    /*@ngInject*/
    function projectStore($http, $q, projectFactory, utilsFactory, projectEntity) {

        var store = this;

        /* Iterations are better with Arrays */
        var _list = [];

        /* Lookups are faster with Object */
        var _lookup = {};

        store.getAll = function () {

            var deferred = $q.defer();

            if (store.getAll._calledBefore) {
                /* It is probably already called */

                if (utilsFactory.isPromise(store.getAll._calledBefore)) {
                    /* Some resource has already made a request.
                     * Use that same request
                     */
                    store.getAll._calledBefore
                        .then(function () {
                            deferred.resolve(_list);
                        });

                } else {
                    /* Serve cached version */
                    deferred.resolve(_list);
                }
            } else {

                /* Get the data from server.
                 * Keep reference of promise at _calledBefore until promise is resolved/rejected.
                 */
                store.getAll._calledBefore = projectFactory.getProjects()
                    .then(function (data) {
                        _list = data.projects.map(function (item) {

                            var project;

                            project = projectEntity(item);
                            _lookup[project.projectId] = project;

                            return project;
                        });

                        store.getAll._calledBefore = true;

                        deferred.resolve(_list);
                    })
                    .catch(function () {
                        _list = [];
                        store.getAll._calledBefore = false;
                        deferred.reject({});
                    });
            }

            return deferred.promise;
        };

    }

})();
