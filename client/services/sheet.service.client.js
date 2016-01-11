// client/services/sheet.service.client.js
(function(){
    // Interface from the client controllers to the server's services.
    // Mirrors the functions in the server services.  But, it "sends"
    // to the server's service via http requests.
    angular
        .module("SheetApp")
        .factory("SheetService", SheetService);

    function SheetService($http, $q) {
        var api = {
            createSheet: createSheet,
            readAllSheet: readAllSheet,
            readOneSheet: readOneSheet,
            updateSheet: updateSheet,
            deleteSheet: deleteSheet
        };
        return api;

        function createSheet(sheet) {
            var deferred = $q.defer();

            $http.post("/api/sheet", sheet)
                .then(function(response){
                    deferred.resolve(response.data);
                }, function(response){
                    deferred.reject(response);
                });

            return deferred.promise;
        }

        function readAllSheet() {
            var deferred = $q.defer();

            $http.get("/api/sheet")
                .then(function(response){
                    deferred.resolve(response.data);
                }, function(response){
                    deferred.reject(response);
                });

            return deferred.promise;
        }

        function readOneSheet(id) {
            var deferred = $q.defer();

            $http.get("/api/sheet/" + id)
                .then(function(response){
                    deferred.resolve(response.data);
                }, function(response){
                    deferred.reject(response);
                });

            return deferred.promise;
        }

        function updateSheet(id, sheet) {
            var deferred = $q.defer();

            $http.put("/api/sheet/" + id, sheet)
                .then(function(response){
                    deferred.resolve(response.data);
                }, function(response){
                    deferred.reject(response);
                });

            return deferred.promise;
        }

        function deleteSheet(id) {
            var deferred = $q.defer();

            $http.delete("/api/sheet/" + id)
                .then(function(response){
                    deferred.resolve(response.data);
                }, function(response){
                    deferred.reject(response);
                });

            return deferred.promise;
        }
    }
})();
