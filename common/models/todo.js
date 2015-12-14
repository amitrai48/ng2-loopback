module.exports = function(Todo) {
	console.log(Todo.getDataSource());
	Todo.beforeRemote('find',function(ctx,user,next){
		console.log("I AM FROM TODO");
		next();
	});
	Todo.beforeRemote('create',function(ctx,user,next){
		next();
	});
};
