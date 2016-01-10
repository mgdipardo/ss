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

            $http.put("/ss/sheet/"+sheetId+"/cell/"+cellIndex, cell)
                .success(function(response){
                    deferred.resolve(response);
                });

            return deferred.promise;
        }

        function addCell(sheetId, cell) {
            var deferred = $q.defer();

            $http.post("/ss/sheet/"+sheetId+"/cell", cell)
                .success(function(response){
                    deferred.resolve(response);
                });

            return deferred.promise;
        }

        function removeCell(sheetId, cellIndex) {
            var deferred = $q.defer();

            $http.delete("/ss/sheet/"+sheetId+"/cell/"+cellIndex)
                .success(function(response){
                    deferred.resolve(response);
                });

            return deferred.promise;
        }
    }
})();
