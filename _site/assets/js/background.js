import * as THREE from './three/build/three.module.js';
import { GLTFLoader } from './three/examples/jsm/loaders/GLTFLoader.js';

var container, controls;
var camera, scene, renderer;

var cameraLimit = 7;
var randomSpreadShards = 20;
var randomSpreadStars = 100;

var cameraCenter = new THREE.Vector3();
var cameraHorzLimit = 1;
var cameraVertLimit = 1;
var mouse = new THREE.Vector2();


var particleSystem = new Array();

var gemCells;
var orb;
var trajectories= [];
var gemRotation = 0.005;



// stars
var starTypes = 7;
var starCount = 400/starTypes;
var stars = new Array();


init();
render();


function init() {
    container = document.querySelector('.background');

    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

    scene = new THREE.Scene();
                
    /**         LOAD LIGHTING       **/
    // var light = new THREE.PointLight( 0xff0000, 1, 100 );
    // light.position.set( 50, 50, 50 );
    // scene.add( light );

    var ambientLight = new THREE.AmbientLight( 0xf1edff);
    ambientLight.position.set( 1, 0, 0 ).normalize();
    scene.add( ambientLight );

    var ambientLight2 = new THREE.AmbientLight( 0xffffff );
    ambientLight2.position.set( 0, 1, 0 ).normalize();
    scene.add( ambientLight2 );
            
    var directionalLight = new THREE.DirectionalLight( 0xffffff );
    directionalLight.position.set( 1, 1, 0 ).normalize();
    scene.add( directionalLight );
    
    var directionalLight2 = new THREE.DirectionalLight( 0xF37B9A, );
    directionalLight2.position.set( 0, 0, 1 ).normalize();
    scene.add( directionalLight2 );

    var directionalLightBlue = new THREE.DirectionalLight( 0xb5fffe );
    directionalLightBlue.position.set( 1, 0, 1 ).normalize();
    scene.add( directionalLightBlue );	

    var directionalLightPink = new THREE.DirectionalLight( 0xf7b0ff );
    directionalLightPink.position.set( 0, 1, 1 ).normalize();
    scene.add( directionalLightPink );	

    var directionalLightPink2 = new THREE.DirectionalLight( 0xf7b0ff );
    directionalLightPink2.position.set( 1, 1, 1 ).normalize();
    scene.add( directionalLightPink2 );	

    /**         LOAD FOG            **/
    scene.fog = new THREE.Fog(0x4000ff);
    
    /**         PARTICLE SYSTEM           **/
    for(let i = 1; i < starTypes+1; i++)
    {
        var starMaterial = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            transparent: true,
            map: new THREE.TextureLoader().load(
                '/assets/models/textures/stars/star_'+i.toString()+'.png'
            ),
            side: THREE.DoubleSide
        });

        // var material = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );

        // copy to debris
        for (var p = 0; p < starCount; ++p)
        {
            var starGeometry = new THREE.PlaneGeometry();
            var position = getTrajectory(randomSpreadStars);
            starGeometry.translate(position.x, position.y+10, position.z);
            var star = new THREE.Mesh(starGeometry, starMaterial);

            stars.push(star);
            scene.add(star);
        }
    }
  


    /**         RENDERING AND CAMERA           **/

    renderer = new THREE.WebGLRenderer( { 
        antialias: true,
        container,
        alpha: true,
    } );

    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1;
    renderer.outputEncoding = THREE.sRGBEncoding;
    container.appendChild( renderer.domElement );                

    camera.position.z = cameraLimit;

    
    window.addEventListener('resize', onWindowResize, false);
    document.addEventListener('mousemove', function(event) {
        onDocumentMouseMove(event)
    });

    render();
    animate();
}

function animate () {  
    requestAnimationFrame( animate );

    // gemCells.rotation.y += gemRotation;
    scene.rotation.y += 0.001; 

    render();
	
}

function render() {
    renderer.render( scene, camera );
}


function onDocumentMouseMove(event) {
    event.preventDefault();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

    render();
}


function getTrajectory(limit) {
    let x = Math.random() * (limit); 
    x *= Math.floor(Math.random()*2) == 1 ? 1 : -1;
    let y = Math.random() * (limit);
    y *= Math.floor(Math.random()*2) == 1 ? 1 : -1;
    let z = Math.random() * (limit);
    z *= Math.floor(Math.random()*2) == 1 ? 1 : -1;

    return new THREE.Vector3(x, y, z);
}
