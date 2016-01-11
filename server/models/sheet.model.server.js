// server/models/sheet.model.server.js
var q = require("q");

module.exports = function(db, mongoose) {
    var SheetSchema = require("./sheet.schema.server.js")(mongoose);
    var SheetModel  = mongoose.model("SheetModel", SheetSchema);
    var api = {
        createSheet: createSheet,
        readAllSheet: readAllSheet,
        readOneSheet: readOneSheet,
        updateSheet: updateSheet,
        removeSheet: removeSheet,
        createCell: createCell,
        removeCell: removeCell,
        updateCell: updateCell
    };
    return api;
    // parameters= which sheet, which cell and the update
    function updateCell(sheetId, cellIndex, cell) {
        var deferred = q.defer();
        // cells do not have its own schema
        SheetModel.findById(sheetId, function(err, sheet){
            // only updating the literal of the cell at this point
            sheet.cells[cellIndex].literal = cell.literal;
            sheet.save(function(err, sheet){
                deferred.resolve(sheet);
            });
        });

        return deferred.promise;
    }
    // parameters= which sheet and what the new cell is
    function createCell(sheetId, cell) {
        var deferred = q.defer();

        SheetModel.findById(sheetId, function(err, sheet){
            // again, the cell only has a literal at this point
            sheet.cells.push(cell);
            sheet.save(function(err, sheet){
                deferred.resolve(sheet);
            });
        });

        return deferred.promise;
    }
    // parameters= which sheet, and which cell
    function removeCell(sheetId, cellIndex) {
        var deferred = q.defer();
        // splice removes the cell from the array
        SheetModel.findById(sheetId, function(err, sheet){
            sheet.cells.splice(cellIndex, 1);
            sheet.save(function(err, sheet){
                deferred.resolve(sheet);
            });
        });

        return deferred.promise;
    }

    function createSheet(sheet) {
        var deferred = q.defer();

        SheetModel.create(sheet, function(err, sheet) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(sheet);
            }
        });

        return deferred.promise;
    }

    function readAllSheet() {
        var deferred = q.defer();

        SheetModel.find(function(err, sheets){
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(sheets);
            }
        });

        return deferred.promise;
    }

    function readOneSheet(id) {
        var deferred = q.defer();

        SheetModel.findById(id, function(err, sheet){
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(sheet);
            }
        });

        return deferred.promise;
    }

    function updateSheet(id, sheet) {
        var deferred = q.defer();
        // If there is an _id property, remone it. This is done so
        // the _id is not updated.
        sheet.delete("_id");
        // "where" _id=:id, "set sheet"
        SheetModel.update({_id: id}, {$set: sheet}, function(err, sheet) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(sheet);
            }
        });

        return deferred.promise;
    }

    function removeSheet(id) {
        var deferred = q.defer();

        SheetModel.remove({_id: id}, function(err, status) {
            if(err) {
                deferred.reject(err);
            } else {
                deferred.resolve(status);
            }
        });

        return deferred.promise;
    }
}
