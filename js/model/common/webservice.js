angular.module('common', []).factory('webservice', ['$http', webservice]);

function webservice($http) {

    var basePath = 'http://127.0.0.1:8000';

    function doGet(endpoint) {
        return $http({
            method: 'GET',
            url: basePath + endpoint
        });
    }

    function doPost(endpoint, params) {
        return $http.post(basePath + endpoint, params);
    }

    function doDelete(endpoint) {
        return $http.delete(basePath + endpoint);
    }

    function doPatch(endpoint, params) {
        return $http.patch(basePath + endpoint, params);
    }

    return {
        doGet: doGet,
        doPost: doPost,
        doDelete: doDelete,
        doPatch: doPatch
    }
}