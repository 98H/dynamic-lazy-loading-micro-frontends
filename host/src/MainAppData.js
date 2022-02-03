var fetchMainAppApi = require('./api/main-app-api');

var data = fetchMainAppApi();
exports.data = data;
