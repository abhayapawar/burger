var express = require("express");

var router = express.Router();

// Import the model (burger.js) to use its database functions.
var burger = require("../model/burger.js");

router.get("/", function(req, res) {
  burger.all(function(data) {
    var hbsObject = {
      burger : data
    };
    console.log(hbsObject);
    res.render("index", hbsObject);
  });
});

router.post("/", function(req, res) {
  burger.create([
    "burger_name", "devoured"
  ], [
    req.body.name, req.body.devoured
  ], function() {
    res.redirect("/");
  });
});

router.put("/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  console.log("condition", condition);

  burger.update({
    devoured: req.body.devoured
  }, condition, function() {
    res.redirect("/");
  });
});
router.delete("/:id", function(req, res) {
   var condition = "id = " + req.params.id;
 
   burger.delete(condition, function() {
     res.redirect("/");
   });
 });

// Export routes for server.js to use.
module.exports = router;

