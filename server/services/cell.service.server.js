// server/services/cell.service.server.js
// These are virtual URL's, not in the file system
module.exports = function(app, model) {
    app.post("/api/sheet/:sheetId/cell", createCell);
    app.put("/api/sheet/:sheetId/cell/:cellIndex", updateCell);
    app.delete("/api/sheet/:sheetId/cell/:cellIndex", removeCell);

    // All these are extracting information from the http request and
    // putting them in the model
    function updateCell(req, res) {
        model
            .updateCell(req.params.sheetId, req.params.cellIndex, req.body)
            .then(function(sheet) {
                res.json(sheet);
            });
    }

    function createCell(req, res) {
        model
            .createCell(req.params.sheetId, req.body)
            .then(function(sheet){
                res.json(sheet);
            });
    }

    function removeCell(req, res) {
        model
            .removeCell(req.params.sheetId, req.params.cellIndex)
            .then(function(sheet){
                res.json(sheet);
            });
    }
};
