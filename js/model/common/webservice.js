angular.module('common', []).factory('webservice', ['$http', webservice]);

function webservice($http) {

    var basePath = 'http://127.0.0.1:8000';

    function doGet(endpoint, params) {
        return $http({
            method: 'GET',
            params: params,
            url: basePath + endpoint
        });
    }

    function doPost(endpoint, params, queryParams) {
        return $http.post(basePath + endpoint, params, queryParams);
    }

    function doPut(endpoint, params) {
        return $http.put(basePath + endpoint, params);
    }

    function doDelete(endpoint, queryParams) {
        return $http.delete(basePath + endpoint, {params: queryParams});
    }

    function doPatch(endpoint, params, queryParams) {
        return $http.patch(basePath + endpoint, params, {params: queryParams});
    }

    return {
        doGet: doGet,
        doPost: doPost,
        doDelete: doDelete,
        doPatch: doPatch,
        doPut: doPut
    }
}