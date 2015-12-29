define(['app'], function(app) {
   'use strict';
    
   app.controller('ExampleController', ['MoviesDb', 'MoviesRestService', 'SearchRestService', function(moviesDb, MoviesRestService, SearchRestService){
        var vm = this;
        
        MoviesRestService.get('the-martian-2015').then(function(movie){
           console.log(movie.plain()); 
        });
        
        MoviesRestService.get('the-martian-2015?extended=full,images').then(function(movie){
           console.log(movie.plain()); 
        });
        
        SearchRestService.getList({query:'mr-robot', year:2015, type:'movie,show'}).then(function(result){
           console.log(result.plain()); 
        });
        
        vm.example = 'This is an example controller :)'; 
        
        // moviesDb.insert({newItem : 'hahGAfafADFGAFGAaha'}).then(function(result){
        //     var teste;
        // });
        
        moviesDb.find({ title: /one mor/}).then(function(result){
           var teste; 
        });
        
        var allMovies = moviesDb.getAll();
        
        moviesDb.count().then(function(result){
            vm.movieCount = 'There are ' + result.count + ' movies in the database :)';
        });

        var query = {title: /one mor/};
        var updateObj = {title: 'hey im updated :)'};
        
        moviesDb.update(query, updateObj, { multi: true }).then(function(result){
            vm.moviesUpdated = 'There are ' + result.numUpdated + ' updated movies in the database :)';
        });
        
        // moviesDb.remove({newItem: 'hahGAfafADFGAFGAaha'}, {multi: true}).then(function(result){
        //    var teste; 
        // });
        
        //moviesDb.removeAll();
        
        // var newMovie = {title: 'ome Movie!', Date: new Date(), Boolean: true, actors: ['lala, lulu, lili'], infos: {description : 'test'} };
        // moviesDb.insert(newMovie).then(function(newDoc, err){
        //    var teste; 
        // });
   }]); 
});