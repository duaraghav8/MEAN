var cluster = require ('cluster'),
  express = require ('express'),
  app = null, listener = null;

if (cluster.isMaster) {
  for (var i = 0; i < 4; i++) { cluster.fork (); }
}
else if (cluster.isWorker) {
  app = express ();

  app
    .get ('/', function (req, res) {
      /*setTimeout (function () {
        res.send ('Hello from worker: ' + cluster.worker.id.toString() + '\n');
      }, 100);*/
      res.send ('Hello from worker: ' + cluster.worker.id.toString() + '\n');
    });

  listener = app.listen (8080, function () {
    console.log (cluster.worker.id.toString() + ' listening on port ', listener.address ().port);
  });
}
