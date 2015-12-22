define(['app'], function(app) {
   'use strict';
    
   app.controller('ExampleController', ['Movies', function(moviesDb){
        var vm = this;
        
        vm.example = 'This is an example controller :)'; 
        
        moviesDb.find({ title: /Aweso/}).then(function(docs){
           var teste; 
        });
        
        var allMovies = moviesDb.getAll();
        
        moviesDb.count().then(function(count, err){
            vm.movieCount = 'There are ' + count + ' movies in the database :)';
        })
        
        // var newMovie = {title: 'ome Movie!', Date: new Date(), Boolean: true, actors: ['lala, lulu, lili'], infos: {description : 'test'} };
        // moviesDb.insert(newMovie).then(function(newDoc, err){
        //    var teste; 
        // });
   }]); 
});