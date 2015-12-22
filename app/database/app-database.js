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
                    defer.resolve(docs, err);
                });
                
                return defer.promise;
            },
            
            insert: function(newMovie){
                var defer = $q.defer();
                                           
                db.movies.insert(newMovie, function(err, newDoc) {
                    defer.resolve(newDoc, err);
                });
                
                return defer.promise;                
            },            
            
            count: function(query){
                var defer = $q.defer();                               
                                           
                db.movies.count(query, function(err, count) {
                    defer.resolve(count, err);
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
                    defer.resolve(docs, err);
                });
                
                return defer.promise;
            },
            
            insert: function(newShow){
                var defer = $q.defer();
                                           
                db.shows.insert(newShow, function(err, newDoc) {
                    defer.resolve(newDoc, err);
                });
                
                return defer.promise;                
            },            
            
            count: function(query){
                var defer = $q.defer();                               
                                           
                db.shows.count(query, function(err, count) {
                    defer.resolve(count, err);
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
                    defer.resolve(docs, err);
                });
                
                return defer.promise;
            },
            
            insert: function(newPerson){
                var defer = $q.defer();
                                           
                db.people.insert(newPerson, function(err, newDoc) {
                    defer.resolve(newDoc, err);
                });
                
                return defer.promise;                
            },            
            
            count: function(query){
                var defer = $q.defer();                               
                                           
                db.people.count(query, function(err, count) {
                    defer.resolve(count, err);
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
                    defer.resolve(docs, err);
                });
                
                return defer.promise;
            },
            
            insert: function(newSettings){
                var defer = $q.defer();
                                           
                db.settings.insert(newSettings, function(err, newDoc) {
                    defer.resolve(newDoc, err);
                });
                
                return defer.promise;                
            },            
            
            count: function(query){
                var defer = $q.defer();                               
                                           
                db.settings.count(query, function(err, count) {
                    defer.resolve(count, err);
                });
                
                return defer.promise;                
            }
        }
    }]);
});