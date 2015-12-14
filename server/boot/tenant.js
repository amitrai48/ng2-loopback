var fs = require('fs');
var path = require('path');
var util = require('util');
var DataSource = require('loopback-datasource-juggler').DataSource;

exports = module.exports = function tenant(app) {

  console.log("WHY");

  app.use('/api/:tenant/', function(req, res, next) {
    console.log("I am called");

    var tenant = req.params.tenant;
    var dataSourceFileName = util.format('datasources.%s.json', tenant);
    console.log("called now : "+dataSourceFileName);
    var dataSourcePath = path.resolve(__dirname, '../', dataSourceFileName);

    if (fs.existsSync(dataSourcePath)) {

      var dataSourceObj = JSON.parse(fs.readFileSync(dataSourcePath, 'utf8'));

      Object.keys(dataSourceObj).forEach(function(dataSource) {
        app.dataSources[dataSource].adapter.settings = dataSourceObj[dataSource];
        app.dataSources[dataSource].adapter.clientConfig = dataSourceObj[dataSource];
        app.dataSources[dataSource].settings = dataSourceObj[dataSource];
        app.dataSources[dataSource].connector.settings = dataSourceObj[dataSource];
        app.dataSources[dataSource].connector.clientConfig = dataSourceObj[dataSource];
         console.log(app.dataSources[dataSource]);
      });

      next();
    }
    else {

      // Invalid tenant
      res.json({
        'error': {
          'name':'Error',
          'status':404,
          'message':'Invalid tenant',
          'statusCode':404,
          'stack':'https://www.npmjs.com/package/loopback-tenant'
        }
      });

    }

  });
};