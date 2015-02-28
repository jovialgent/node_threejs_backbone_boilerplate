//Code built following this tutorial: http://blog.teamtreehouse.com/the-beginners-guide-to-three-js


define([
    'jquery',
    'underscore',
    'backbone',

    //NON AMD MODULES
    'threejs'
    //'detector'
], function($, _, Backbone) {

    var $vis = $('#visualization');

    var initialization = function() {
        init();

    }

    var init = function() {
        var scene, camera, renderer, controls;

        var cameraPosition = {
            x: 0,
            y: 0,
            z: 0,
        }

        //Create Scene
        scene = new THREE.Scene();

        //Create Renderer
        var WIDTH = window.innerWidth;
        var HEIGHT = window.innerHeight;
        renderer = new THREE.WebGLRenderer({
            antialias: true
        });
        renderer.setSize(WIDTH, HEIGHT);
        renderer.setClearColor(0x717073, 1);

        //Create Camera
        camera = new THREE.PerspectiveCamera(45, WIDTH / HEIGHT, 0.1, 20000);
        camera.position.set(cameraPosition.x, cameraPosition.y, cameraPosition.y);
        scene.add(camera);

      	var directionalLight = new THREE.DirectionalLight( 0x888888, .5 );
      	directionalLight.position.set(.5,0,3);
      	scene.add(directionalLight);

      	var pointLight = new THREE.PointLight(0x0000ff, 1, 10);
      	pointLight.position.set(0, 0, 0);
      	scene.add(pointLight)


        windorResizeHandler(camera, renderer);

        var cube = createCube(scene);
        var duration = 1000;
        var currentTime = Date.now();


        var animate = function() {
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
            var now = Date.now();
            var deltat = now - currentTime;
            currentTime = now;
            var fract = deltat / duration;
            var angle = Math.PI * 2 * fract;
            camera.updateProjectionMatrix();
            cube.rotation.z += angle;
            

        }

        animate();


        $vis.append(renderer.domElement);
        
    }

    var createCube = function(scene) {
        var geometry = new THREE.BoxGeometry(2, 2, 2);
        var material = new THREE.MeshLambertMaterial({
            color: 0x999999
        });


        var cube = new THREE.Mesh(geometry, material);


        cube.position.z = -8;
        cube.rotation.x = Math.PI / 5;
        cube.rotation.y = Math.PI / 5;
        scene.add(cube);

        return cube;
    }


    var windorResizeHandler = function(camera, renderer) {
        window.addEventListener('resize', function() {
            var WIDTH = window.innerWidth;
            var HEIGHT = window.innerHeight;
            renderer.setSize(WIDTH, HEIGHT);
            camera.aspect = WIDTH / HEIGHT;
            camera.updateProjectionMatrix();

        })
    }


    var spinCube = function() {


    }

    return {
        initialization: initialization


    };
    // What we return here will be used by other modules
});