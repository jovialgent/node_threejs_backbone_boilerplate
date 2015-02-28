//Filename: boilerplate.js

define([
    // These are path alias that we configured in our bootstrap
    'jquery',     
    'underscore', 
    'backbone',
    'router', 

    'views/threejsViz/boilerplate'
], function($, _, Backbone, Router, ThreeJsVis){
    
    var initialize = function(){
       ThreeJsVis.initialization();
    }
    
    // Above we have passed in jQuery, Underscore and Backbone
    // They will not be accessible in the global scope
    return {
        initialize:initialize
        
    };
    // What we return here will be used by other modules
});