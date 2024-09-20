"use strict";
var error = require("../error");
// var auth = require("../auth/authenticate");
var pkmaster = require("./pkmaster")


module.exports = function(app){

    app.post("/api/pkmaster/adddatafromform", pkmaster.addOnSubmit, error);
    app.post("/api/pk-master/add", pkmaster.add, error);

    app.get("/api/pk-durga", pkmaster.fetchPkDurga, error);

    app.get("/api/pkmaster", pkmaster.fetchAll, error);

    app.get("/api/pkmaster/csv", pkmaster.exportcsv, error)
    app.get("/api/pk-durga/csv/:id", pkmaster.exportPkDurga, error)
    app.get("/api/pk-durga/date-export", pkmaster.exportPkDurgaDateExport, error)

    
};