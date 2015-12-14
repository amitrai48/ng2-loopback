module.exports = function(server) {
  // Install a `/` route that returns server status
  /*var router = server.loopback.Router();
  router.get('/', server.loopback.status());
  server.use(router);*/
	var router = server.loopback.Router();
 	router.get('/getNumber',function(req,res){
	var number = Math.floor((Math.random() * 10) + 1);
	res.json(number);
});
 	server.use(router);
};
