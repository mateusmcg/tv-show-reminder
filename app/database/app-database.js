define([], function() {
    'use strict';
    
    angular.module('app.database', []);

    angular.module('app.database').factory('MoviesDb', ['$q', function($q){
        return{
            getAll: function(){
                return db.movies.getAllData();
            },
            
            find: function(query){     
                var defer = $q.defer();
                                           
                db.movies.find(query, function(err, docs) {
                    defer.resolve({ docs: docs, errors: err });
                });
                
                return defer.promise;
            },
            
            insert: function(newMovie){
                var defer = $q.defer();
                                           
                db.movies.insert(newMovie, function(err, newDoc) {
                    db.movies.loadDatabase();
                    defer.resolve({ newDoc: newDoc, error: err });
                });
                
                return defer.promise;                
            },            
            
            count: function(query){
                var defer = $q.defer();
                                           
                db.movies.count(query, function(err, count) {
                    db.movies.loadDatabase();
                    defer.resolve({ count: count, error: err });
                });
                
                return defer.promise;                
            },
            
            update: function(query, updateObj, options){
                var $this = this;
                var defer = $q.defer();
                                
                options = !options ? {} : options;
                
                if(!query || !updateObj){
                    defer.resolve({ numUpdated: 0, err: 'The query or the updateObj must be an object.' });
                    return defer.promise;   
                }
                
                db.movies.update(query, updateObj, options, function(err, numReplaced) {
                    $this.find(updateObj).then(function(result){
                        db.movies.loadDatabase();
                        defer.resolve({ numUpdated: numReplaced, updatedObjs: result && numReplaced > 0 ? result.docs : [], error: err });  
                    })                    
                });
                
                return defer.promise;       
            },
            
            remove: function(query, options){
                var defer = $q.defer();
                
                options = !options ? {} : options;
                
                if(!query){
                    defer.resolve({ numRemoved: 0, err: 'The query must be an object.' });
                    return defer.promise;   
                }
                
                db.movies.remove(query, options, function(err, numRemoved){
                    db.movies.loadDatabase();
                    defer.resolve({ numRemoved: numRemoved, error: err });
                });
                
                return defer.promise;
            },
            
            removeAll: function(){
                var defer = $q.defer();               
                
                db.movies.remove({}, { multi: true }, function(err, numRemoved){
                    db.movies.loadDatabase();
                    defer.resolve({ numRemoved: numRemoved, error: err });
                });
                
                return defer.promise;
            }
        }
    }]);

    angular.module('app.database').factory('ShowsDb', ['$q', function($q){
        return{
            getAll: function(){
                return db.shows.getAllData();
            },
            
            find: function(query){
                var defer = $q.defer();
                
                db.shows.find(query, function(err, docs) {
                    defer.resolve({ docs: docs, errors: err });
                });
                
                return defer.promise;
            },
            
            insert: function(newShow){
                var defer = $q.defer();
                                           
                db.shows.insert(newShow, function(err, newDoc) {
                    db.shows.loadDatabase();
                    defer.resolve({ newDoc: newDoc, error: err });
                });
                
                return defer.promise;                
            },            
            
            count: function(query){
                var defer = $q.defer();                               
                                           
                db.shows.count(query, function(err, count) {
                    db.shows.loadDatabase();
                    defer.resolve({ count: count, error: err });
                });
                
                return defer.promise;                
            },
            
            update: function(query, updateObj, options){
                var $this = this;
                var defer = $q.defer();
                                
                options = !options ? {} : options;
                
                if(!query || !updateObj){
                    defer.resolve({ numUpdated: 0, err: 'The query or the updateObj must be an object.' });
                    return defer.promise;   
                }
                
                db.shows.update(query, updateObj, options, function(err, numReplaced, updatedDoc) {
                    db.shows.loadDatabase();
                    defer.resolve({ numUpdated: numReplaced, updatedDoc: updatedDoc, error: err });                    
                });
                
                return defer.promise;       
            },
            
            remove: function(query, options){
                var defer = $q.defer();
                
                //options -> only one option for now: multi which allows the removal of multiple documents if set to true. Default is false
                options = !options ? {} : options;
                
                if(!query){
                    defer.resolve({ numRemoved: 0, err: 'The query must be an object.' });
                    return defer.promise;   
                }
                
                db.shows.remove(query, options, function(err, numRemoved){
                    db.shows.loadDatabase();
                    defer.resolve({ numRemoved: numRemoved, error: err });
                });
                
                return defer.promise;
            },
            
            removeAll: function(){
                var defer = $q.defer();               
                
                db.shows.remove({}, { multi: true }, function(err, numRemoved){
                    db.shows.loadDatabase();
                    defer.resolve({ numRemoved: numRemoved, error: err });
                });
                
                return defer.promise;
            }
        }
    }]);

    angular.module('app.database').factory('PeopleDb', ['$q', function($q){
        return{
            getAll: function(){
                return db.people.getAllData();
            },
            
            find: function(query){
                var defer = $q.defer();
                
                db.people.find(query, function(err, docs) {
                    defer.resolve({ docs: docs, errors: err });
                });
                
                return defer.promise;
            },
            
            insert: function(newPerson){
                var defer = $q.defer();
                                           
                db.people.insert(newPerson, function(err, newDoc) {
                    db.people.loadDatabase();
                    defer.resolve({ newDoc: newDoc, error: err });
                });
                
                return defer.promise;                
            },            
            
            count: function(query){
                var defer = $q.defer();                               
                                           
                db.people.count(query, function(err, count) {
                    db.people.loadDatabase();
                    defer.resolve({ count: count, error: err });
                });
                
                return defer.promise;                
            },
            
            update: function(query, updateObj, options){
                var $this = this;
                var defer = $q.defer();
                                
                options = !options ? {} : options;
                
                if(!query || !updateObj){
                    defer.resolve({ numUpdated: 0, err: 'The query or the updateObj must be an object.' });
                    return defer.promise;   
                }
                
                db.people.update(query, updateObj, options, function(err, numReplaced) {
                    $this.find(updateObj).then(function(result){
                        db.people.loadDatabase();
                        defer.resolve({ numUpdated: numReplaced, updatedObjs: result && numReplaced > 0 ? result.docs : [], error: err });  
                    })                    
                });
                
                return defer.promise;       
            },
            
            remove: function(query, options){
                var defer = $q.defer();
                
                options = !options ? {} : options;
                
                if(!query){
                    defer.resolve({ numRemoved: 0, err: 'The query must be an object.' });
                    return defer.promise;   
                }
                
                db.people.remove(query, options, function(err, numRemoved){
                    db.people.loadDatabase();
                    defer.resolve({ numRemoved: numRemoved, error: err });
                });
                
                return defer.promise;
            },
            
            removeAll: function(){
                var defer = $q.defer();               
                
                db.people.remove({}, { multi: true }, function(err, numRemoved){
                    db.people.loadDatabase();
                    defer.resolve({ numRemoved: numRemoved, error: err });
                });
                
                return defer.promise;
            }
        }
    }]);

    angular.module('app.database').factory('SettingsDb', ['$q', function($q){
        return{
            getAll: function(){
                return db.settings.getAllData();
            },
            
            find: function(query){
                var defer = $q.defer();
                
                db.settings.find(query, function(err, docs) {
                    defer.resolve({ docs: docs, errors: err });
                });
                
                return defer.promise;
            },
            
            insert: function(newSettings){
                var defer = $q.defer();
                                           
                db.settings.insert(newSettings, function(err, newDoc) {
                    db.settings.loadDatabase();
                    defer.resolve({ newDoc: newDoc, error: err });
                });
                
                return defer.promise;                
            },            
            
            count: function(query){
                var defer = $q.defer();                               
                                           
                db.settings.count(query, function(err, count) {
                    db.settings.loadDatabase();
                    defer.resolve({ count: count, error: err });
                });
                
                return defer.promise;                
            },
            
            update: function(query, updateObj, options){
                var $this = this;
                var defer = $q.defer();
                                
                options = !options ? {} : options;
                
                if(!query || !updateObj){
                    defer.resolve({ numUpdated: 0, err: 'The query or the updateObj must be an object.' });
                    return defer.promise;   
                }
                
                db.settings.update(query, updateObj, options, function(err, numReplaced) {
                    $this.find(updateObj).then(function(result){
                      db.settings.loadDatabase();
                      defer.resolve({ numUpdated: numReplaced, updatedObjs: result && numReplaced > 0 ? result.docs : [], error: err });  
                    })                    
                });
                
                return defer.promise;       
            },
            
            remove: function(query, options){
                var defer = $q.defer();
                
                options = !options ? {} : options;
                
                if(!query){
                    defer.resolve({ numRemoved: 0, err: 'The query must be an object.' });
                    return defer.promise;   
                }
                
                db.settings.remove(query, options, function(err, numRemoved){
                    db.settings.loadDatabase();
                    defer.resolve({ numRemoved: numRemoved, error: err });
                });
                
                return defer.promise;
            },
            
            removeAll: function(){
                var defer = $q.defer();               
                
                db.settings.remove({}, { multi: true }, function(err, numRemoved){
                    db.settings.loadDatabase();
                    defer.resolve({ numRemoved: numRemoved, error: err });
                });
                
                return defer.promise;
            }
        }
    }]);
});