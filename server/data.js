module.exports = function(app) {
  var router = app.Router();

  console.log("I was exported probably?");
  router.get('/test', function(req, res) {
    console.log("Express Data Triggered");
    return res.send({"data": "This was triggered"});
  });
  console.log("I was exported probably after the get?");

  return router;
};
