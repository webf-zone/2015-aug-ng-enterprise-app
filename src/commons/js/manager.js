(function() {
    "use strict";

    var app = angular.module("PrjMgmtModule");

    app.factory("prjManager", ["$http", "$q", "prjUrls", prjManager]);

    app.constant("prjUrls", {
        "getPrjListURL": "../app/api-factories/prj_list.json"
    });

    function prjManager($http, $q, prjUrls) {
        var getPrjListRequest;


        getPrjListRequest = {
            method: "GET",
            url: prjUrls.getPrjListURL
        };

        function getPrjList() {
            var request = angular.copy(getPrjListRequest);
            return $http(request).then(function(response) {
                return response.data;
            });
        }

        return {
            getPrjList: getPrjList
        };
    }

})();