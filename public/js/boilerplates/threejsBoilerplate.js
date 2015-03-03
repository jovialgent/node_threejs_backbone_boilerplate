/**
 * This THREEjs Boilerplate will create the scene, renderer and camera for a scene
 * and set up a basic structure for animation. This is meant for smaller animations
 *
 * @module threejsBoilerplate.js
 * @author George Petersen
 */
define([
    'jquery', //Reference for jQuery
    'underscore', //Reference for underscore

    //NON AMD MODULES
    'threejs' //Reference for this THREEjs library
], function(
    $, //References jQuery module 
    _ //References underscore module

    //NOTE: Non AMD Modules don't need to be referenced
    ) {


    //Global Variables

    /**
     * Holds the container for this visualization
     *
     * @property $vis
     * @type jQuery Object
     */
    var $vis = $('#visualization');

    /**
     * The current time step for animations.
     *
     * @variable: currentTime
     * @type: Number
     */
    var currentTime = 0;

    /**
     * This initialization method will create the initial scene
     * and then starts the animation for this visualization
     *
     * @method initialization
     */
    var initialization = function() {

        /*
         * Initializes this THREEJS visualization and returns
         * the renderer, scene and camera from the initial
         * creation.
         */
        var initialSettings = init();

        //Sets the current time to when the initial creation ends
        var startTime = Date.now();

        /*
         * Begins animation by taking the start time and the elements of this
         * THREEJS visualization
         */
        animate(initialSettings, startTime);


    }

    /**
     * This will initialize this visualization. For this boilerplate, it will
     * create a background of grey. Afterwards, this method returns the scene, 
     * camera and renderer
     *
     * @method init
     * @return {Object} Returns an object with this visualization's camera, renderer and scene
     */
    var init = function() {

            //Local Variables

            //Reference to this visualzation's scene
            var scene;

            //Reference to this visualization's camera
            var camera;

            //Reference to this visualization's renderer
            var renderer;

            //Initial Camera Position: X, Y Z
            var cameraPosition = {
                x: 0,
                y: 0,
                z: 0,
            }

            /*
             * Creates a new  THREE.Scene:
             *
             * This scene will hold all the data for the
             * geometry, lighting, etc.
             * doc: http://threejs.org/docs/#Reference/Scenes/Scene
             */

            scene = new THREE.Scene();

            //Create Renderer

            //Width of this visualization viewer
            var WIDTH = window.innerWidth;

            //Height of this visualization viewer
            var HEIGHT = window.innerHeight;

            /*
             * Creates a WebGL Renderer
             * doc: http://threejs.org/docs/#Reference/Renderers/WebGLRenderer
             */
            renderer = new THREE.WebGLRenderer({
                antialias: true //Sets Antialias for this renderer to true
            });

            //Sets the size of this viewer
            renderer.setSize(WIDTH, HEIGHT);

            //Sets this background to grey
            renderer.setClearColor(0x717073, 1);

            //Create Camera

            /*
             * Sets this camera to a perspective camera.
             * doc: http://threejs.org/docs/#Reference/Cameras/PerspectiveCamera
             */
            camera = new THREE.PerspectiveCamera(45, WIDTH / HEIGHT, 0.1, 20000);

            //Sets this camera's position to the default values above
            camera.position.set(cameraPosition.x, cameraPosition.y, cameraPosition.y);

            //Adds this camera to this scene
            scene.add(camera);

            /*
             * This adds a window resize handler. This will make it
             * so the camera and renderer updated as the window changes
             * in size.
             */
            windowResizeHandler(camera, renderer);

            // TODO: Add code to add lighting, geometry and other elements to scene

            //Renders this scene and sets this camera
            renderer.render(scene, camera)

            /*
             * Appends this render to this container which is
             * refereneced in this $vis element
             */
            $vis.append(renderer.domElement);




            /*
             * This returns this visualizations scene, renderer and camera
             * to be used by other functions like animation.
             */
            return {
                scene: scene,
                renderer: renderer,
                camera: camera
            }

        } //End of init()   


    /**
     * This animate function accepts all the elements to create
     * a visualization and run animations from this central method
     *
     * @method animate
     * @param {Object} Object containing this initial scene, camera, renderer
     */
    var animate = function(elements) {

            //Local Variables

            //Holds this current scene
            var tempScene = elements.scene;

            //Holds this current camera
            var tempCamera = elements.camera;

            //Holds this current renderer
            var tempRenderer = elements.renderer;

            //TODO: add animation code here

            
            //Renders this scene with the updated data
            tempRenderer.render(tempScene, tempCamera);

            //Refreshes the renderer, scene and camera 
            elements = {
                scene: tempScene,
                camera: tempCamera,
                renderer: tempRenderer
            }

            //Sets and runs animation by requesting this browser's framerate
            requestAnimationFrame(function() {
                //Animates this scene with these update elements
                animate(elements);
            });

        } // End of animate

    /**
     * Changes the camera aspect and renderer size when window changes.
     * This is in case the visualization is the size of the window
     *
     * @method windowResizeHandler
     * @params camera {THREE.PerspectiveCamera} camera to be adjusted due to window resize
     * @params renderer {THREE.WebGLRenderer} renderer to be adjusted do to window resize
     */
    var windowResizeHandler = function(camera, renderer) {
            //Adds a resize eventListener to this window
            window.addEventListener('resize', function() {

                //Gets this innerWidth of this window
                var WIDTH = window.innerWidth;

                //Gets this innerHeight of this window
                var HEIGHT = window.innerHeight;

                //Sets this render's size to width and height
                renderer.setSize(WIDTH, HEIGHT);

                //Changes the aspect ratio of this camera
                camera.aspect = WIDTH / HEIGHT;

                //Updates this camera's projection matrix
                camera.updateProjectionMatrix();
            });
        } // end of windowResizeHandler

    return {
        initialization: initialization


    };
    // What we return here will be used by other modules
});