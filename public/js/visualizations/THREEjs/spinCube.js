/**
 * This visualization will create a cube and spin it with simple lighting effects
 *
 * @module spinCube.js
 * @author George Petersen
 * @note:
 *
 * Reference for Cube Spinning:
 *
 * "Programming 3D Applications with HTML5 and WebGL: 3D Animation and Visualization for Web Pages",
 * by Tony Parisi (O'Reily). Copyright 2014 Tony Parisi, 978-1-449-36296-6 (Chapter 3)
 */

define([
    'jquery', //Shorthand for this jquery path
    'underscore', //Shorthand for this underscore path

    //NON AMD MODULES
    'threejs' //Loads this THREEjs library

], function(
    $, //Reference for this jQuery module
    _ //Reference for this underscore module

    //NOTE: Non-AMD modules don't need to be referenced
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
     * create a background of grey and a cube with some lighting effects. Afterwards,
     * this method returns the scene, camera and renderer
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
             * Adds a subtle grey directional light from off screen
             * doc: http://threejs.org/docs/#Reference/Lights/DirectionalLight
             */
            var directionalLight = new THREE.DirectionalLight(0x888888, .5);

            //Sets the position a little off the initial scene
            directionalLight.position.set(.5, 0, 3);

            //Adds this directionLight to this scene
            scene.add(directionalLight);

            /*
             * Adds a blue point light to this scene
             * doc: http://threejs.org/docs/#Reference/Lights/PointLight
             */
            var pointLight = new THREE.PointLight(0x0000ff, 1, 10);

            //Sets this point light in the origin
            pointLight.position.set(0, 0, 0);

            //Add this pointLight to this scene
            scene.add(pointLight)

            /*
             * This adds a window resize handler. This will make it
             * so the camera and renderer updated as the window changes
             * in size.
             */
            windowResizeHandler(camera, renderer);

            /* 
             * Creates one cube using this local createCube function.
             */
            var cube = createCube({

                size: 2, //Size of cube

                color: 0x999999, //Color of cube

                //This cube's position
                position: {
                    x: 0, // x position
                    y: 0, // y position
                    z: -8 // z position
                },

                //This cube's rotation in radians
                rotation: {
                    x: Math.PI / 5, //Rotation on x-axis
                    y: Math.PI / 5, //Rotation on y-axis
                    z: 0 //Rotation on z-axis
                }
            });

            //Adds this sample cube to this scene
            scene.add(cube);

            //Renders this scene and sets this camera
            renderer.render(scene, camera)

            /*
             * Appends this render to this container which is
             * refereneced in this $vis element
             */
            $vis.append(renderer.domElement);


            /*
             * To help with animation, this geometries object
             * will hold the MESHes for all geometries and set
             * their keys to their unique ids created by THREE.js
             */
            var geometries = {};

            //Sets this sample cube to this unique id
            geometries[cube.uuid] = cube

            //Adds these geometries and ids to this scene's userData object
            scene.userData = {
                geometries: geometries, //All geometries in this scene
                uuids: [cube.uuid] // All ids
            }

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

            //Cube Spin duration
            var spinCubeDuration = 1000;

            //Gets this first cube's id
            var firstCubeID = tempScene.userData.uuids[0];

            //Gets the THREE.Mesh of this first cube
            var firstCube = tempScene.userData.geometries[firstCubeID];

            /*
             * Spins this first cube and returns the new time step
             * after this animation and sets this currentTime
             * to it.
             */
            currentTime = spinCube(
                firstCube, //First cube to spin
                currentTime, //Current time of this call
                spinCubeDuration, //Duration of this spin
                {
                    x: 0, //Speed of spin on x-axis
                    y: 0, //Speed of spin on y-axis
                    z: .5 //Speed of spin on z-axis
                });

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


    //Added Functions

    /**
     * Creates a cube by making a THREE.BoxGeometry of the same size and
     * adds a THREE.MeshLambertMaterial to this cube in the color provided.
     * This material is so lighting effects can be seen.
     *
     * @method createCube
     * @params data {Object} object holding size, position, rotation and color data
     * @return {THREE.Mesh} returns this cube mesh with the material and geometry
     */
    var createCube = function(data) {

        /*
         * Creates a THREE.BoxGeometry with all sides being the same size as
         * dictated by this data.size reference
         * Doc: http://threejs.org/docs/#Reference/Extras.Geometries/BoxGeometry
         */
        var geometry = new THREE.BoxGeometry(
            data.size, //Width
            data.size, //Height
            data.size  //Depth
        );

        /*
         * Creates a new THREE.MeshLambertMaterial in the color given from this
         * data object. 
         * Doc: http://threejs.org/docs/#Reference/Materials/MeshLambertMaterial
         */
        var material = new THREE.MeshLambertMaterial({
            color: data.color //Color for this Material
        });


        /*
         * Creates a THREE.Mesh object with this box geometry and
         * using this MeshLambertMaterial.
         * Doc: http://threejs.org/docs/#Reference/Objects/Mesh
         */
        var cube = new THREE.Mesh(geometry, material);

        //Sets the x, y, and z positions of this cube from this data object
        cube.position.x = data.position.x;
        cube.position.y = data.position.y;
        cube.position.z = data.position.z;

        //Sets the x, y, and z rotations of this cube in radians
        cube.rotation.x = data.rotation.x;
        cube.rotation.y = data.rotation.y;
        cube.rotation.z = data.rotation.z;


        //Return this THREE.Mesh object with information of the cube
        return cube;

    } //End of createCube

    /**
     * Spins a cube (THREE.BoxGeometry) by an amount that is a fraction
     * of this duration and the space between frames. It also has
     * an argument to adjust the speed of spinning on any axis
     *
     * @method spinCube
     * @param cube {THREE.BoxGeometry} cube which to spin
     * @param currentTime {Number} time of the start of this animation
     * @param duration {Number} full duration of a full spin
     * @param axisSpeed {Object} An object with x, y, z coordinates to adjust the speed
     * @return {Number} Time when all animation is over
     */
    var spinCube = function(cube, oldTime, duration, axisSpeed) {
            //Local Variables

            //The time starting of now
            var now = Date.now();

            //Change in time
            var deltaT = now - oldTime;

            //Fraction to rotate this cube
            var frac = deltaT / duration;

            //Finds the angle by multiplying this frac by 2*PI
            var angle = Math.PI * 2 * frac;

            //Rotates the x-axis by this angle and the speed of the axisSpeed.x
            cube.rotation.x += angle * axisSpeed.x;

            //Rotates the y-axis by this angle and the speed of the axisSpeed.y
            cube.rotation.y += angle * axisSpeed.y;

            //Rotates the z-axis by this angle and the speed of the axisSpeed.z
            cube.rotation.z += angle * axisSpeed.z;

            //Return this time after animation
            return now;

        } //End of Spin Cube

    //All functions and variables to be used by other modules
    return {
        initialization: initialization

    };


}); //End of Module