/**
 * Configures this require module and runs this application using
 * this app.js initialize method
 *
 * @module main.js
 * @author George Petersen
 */
require.config({

    //Shorthand for reoccuring paths
    paths: {
        jquery: 'libs/jquery/jquery-2.1.1', //Sts this jQuery module
        underscore: 'libs/underscore/underscore', //Sets this underscore module
        backbone: 'libs/backbone/backbone', //Sets this backbone module
        threejs: 'libs/threejs/three' //Sets this threejs module
    }
});

/*
 * Gets this app module and runs its initialization method
 */
require([

    // Load our app module and pass it to our definition function
    'app'
    
], function(

    App //App reference

) {

    // The "app" dependency is passed in as "App"
    App.initialize();

});