/**
 * Runs this application using the initialization method.
 * 
 * @module app
 * @author George Petersen
 */

define([
    //Add File Paths to different visualizations
    'visualizations/THREEjs/spinCube'
], function(
    SpinCube //Reference to this Boilerplate Module
    ){
    
    /*
     * This initialize method runs all THREEjs visualizations
     *
     * @method initialize
     */
    var initialize = function(){
       SpinCube.initialization(); //Runs Boilerplate THREEjs Visualization
    }

    //Returns this initialize method for other modules to initilize app
    return {
        initialize:initialize
        
    };
    
});