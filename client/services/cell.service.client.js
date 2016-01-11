// client/services/cell.service.client.js
(function(){
    angular
        .module("SheetApp")
        .factory("CellService", CellService);

    function CellService($http, $q) {
        var api = {
            addCell: addCell,
            removeCell: removeCell,
            updateCell: updateCell
        };
        return api;

        function updateCell(sheetId, cellIndex, cell) {
            var deferred = $q.defer();

            $http.put("/api/sheet/"+sheetId+"/cell/"+cellIndex, cell)
                .then(function(response){
                    deferred.resolve(response.data);
                }, function(response){
                    deferred.reject(response);
                });

            return deferred.promise;
        }

        function addCell(sheetId, cell) {
            var deferred = $q.defer();

            $http.post("/api/sheet/"+sheetId+"/cell", cell)
                .then(function(response){
                    deferred.resolve(response.data);
                }, function(response){
                    deferred.reject(response);
                });

            return deferred.promise;
        }

        function removeCell(sheetId, cellIndex) {
            var deferred = $q.defer();

            $http.delete("/api/sheet/"+sheetId+"/cell/"+cellIndex)
                .then(function(response){
                    deferred.resolve(response.data);
                }, function(response){
                    deferred.reject(response);
                });

            return deferred.promise;
        }
    }
})();
