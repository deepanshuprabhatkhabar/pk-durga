'use strict';

module.exports = function(app) {
    require('./views')(app);
    require('./pk')(app);
    require('./user')(app);
};