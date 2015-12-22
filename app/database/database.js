var Datastore = require('nedb'),
    path = require('path'),
    Q = require('q'),

    db = {},
    data_path = require('nw.gui').App.dataPath,
    TTL = 1000 * 60 * 60 * 24;

console.time('App startup time');
console.debug('Database path: ' + data_path);

db.settings = new Datastore({
    filename: path.join(data_path, 'data/settings.db'),
    autoload: true
});

db.shows = new Datastore({
    filename: path.join(data_path, 'data/shows.db'),
    autoload: true
});


db.movies = new Datastore({
    filename: path.join(data_path, 'data/movies.db'),
    autoload: true
});


db.people = new Datastore({
    filename: path.join(data_path, 'data/people.db'),
    autoload: true
});