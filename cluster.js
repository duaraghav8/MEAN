/*
  Distribute server load amongst multiple processes
  cluster.fork () must only be called by master process (cluster.isMaster = true)
*/
var express = require ('express'),
  cluster = require ('cluster');

if (cluster.isMaster) {
  console.log ('Master Process');
  for (var i = 0; i < 3; i++) {
    cluster.fork ();
  }
}
if (cluster.isWorker) {
  var app = express (),
    listener = app.listen (8080, function () {
      console.log ('listening on port: ', listener.address ().port, ' as worker: ', cluster.worker.id);
    });

  app.get ('/', function (req, res) {
    res.send ('Hello from worker ' + cluster.worker.id.toString ());
  });
}
