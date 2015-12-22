define([], function() {
    'use strict';
    
    angular.module('app.database', []);

    angular.module('app.database').factory('Movies', ['$q', function($q){
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
                    defer.resolve({ newDoc: newDoc, error: err });
                });
                
                return defer.promise;                
            },            
            
            count: function(query){
                var defer = $q.defer();
                                           
                db.movies.count(query, function(err, count) {
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
                
                db.movies.update(query, { $set : updateObj }, options, function(err, numReplaced) {
                    $this.find(updateObj).then(function(result){
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
                    defer.resolve({ numRemoved: numRemoved, error: err });
                });
                
                return defer.promise;
            },
            
            removeAll: function(){
                var defer = $q.defer();               
                
                db.movies.remove({}, { multi: true }, function(err, numRemoved){
                    defer.resolve({ numRemoved: numRemoved, error: err });
                });
                
                return defer.promise;
            }
        }
    }]);

    angular.module('app.database').factory('Shows', ['$q', function($q){
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
                    defer.resolve({ newDoc: newDoc, error: err });
                });
                
                return defer.promise;                
            },            
            
            count: function(query){
                var defer = $q.defer();                               
                                           
                db.shows.count(query, function(err, count) {
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
                
                db.shows.update(query, { $set : updateObj }, options, function(err, numReplaced) {
                    $this.find(updateObj).then(function(result){
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
                
                db.shows.remove(query, options, function(err, numRemoved){
                    defer.resolve({ numRemoved: numRemoved, error: err });
                });
                
                return defer.promise;
            },
            
            removeAll: function(){
                var defer = $q.defer();               
                
                db.shows.remove({}, { multi: true }, function(err, numRemoved){
                    defer.resolve({ numRemoved: numRemoved, error: err });
                });
                
                return defer.promise;
            }
        }
    }]);

    angular.module('app.database').factory('People', ['$q', function($q){
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
                    defer.resolve({ newDoc: newDoc, error: err });
                });
                
                return defer.promise;                
            },            
            
            count: function(query){
                var defer = $q.defer();                               
                                           
                db.people.count(query, function(err, count) {
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
                
                db.people.update(query, { $set : updateObj }, options, function(err, numReplaced) {
                    $this.find(updateObj).then(function(result){
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
                    defer.resolve({ numRemoved: numRemoved, error: err });
                });
                
                return defer.promise;
            },
            
            removeAll: function(){
                var defer = $q.defer();               
                
                db.people.remove({}, { multi: true }, function(err, numRemoved){
                    defer.resolve({ numRemoved: numRemoved, error: err });
                });
                
                return defer.promise;
            }
        }
    }]);

    angular.module('app.database').factory('Settings', ['$q', function($q){
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
                    defer.resolve({ newDoc: newDoc, error: err });
                });
                
                return defer.promise;                
            },            
            
            count: function(query){
                var defer = $q.defer();                               
                                           
                db.settings.count(query, function(err, count) {
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
                
                db.settings.update(query, { $set : updateObj }, options, function(err, numReplaced) {
                    $this.find(updateObj).then(function(result){
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
                    defer.resolve({ numRemoved: numRemoved, error: err });
                });
                
                return defer.promise;
            },
            
            removeAll: function(){
                var defer = $q.defer();               
                
                db.settings.remove({}, { multi: true }, function(err, numRemoved){
                    defer.resolve({ numRemoved: numRemoved, error: err });
                });
                
                return defer.promise;
            }
        }
    }]);
});