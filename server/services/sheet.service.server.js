// server/services/sheet.service.server.js
// These are virtual URL's, not in the file system
module.exports = function(app, model) {
    app.post("/api/sheet", createSheet);
    app.get("/api/sheet", readAllSheet);
    app.get("/api/sheet/:id", readOneSheet);
    app.put("/api/sheet/:id", updateSheet);
    app.delete("/api/sheet/:id", removeSheet);

    function createSheet(req, res) {
        model
            .createSheet(req.body)
            .then(function(sheet){
                res.json(sheet);
            });
    }

    function readAllSheet(req, res) {
        model
            .readAllSheet()
            .then(function(sheet){
                res.json(sheet);
            });
    }

    function readOneSheet(req, res) {
        model
            .readOneSheet(req.params.id)
            .then(function(sheet){
                res.json(sheet);
            });
    }

    function updateSheet(req, res) {
        model
            .updateSheet(req.params.id, req.body)
            .then(function(sheet){
                res.json(sheet);
            });
    }

    function removeSheet(req, res) {
        model
            .removeSheet(req.params.id)
            .then(function(status){
                res.json(status);
            });
    }
};
