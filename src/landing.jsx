import gsap from 'gsap'
import React, { useEffect } from 'react'
import * as THREE from 'three'
import vertexShader from './shaders/vertex.glsl'
import fragmentShader from './shaders/fragment.glsl'
import atmosphereVertexShader from './shaders/atmosphereVertex.glsl'
import atmosphereFragmentShader from './shaders/atmosphereFragment.glsl'

function Landing() {
useEffect(() => {
  const scene = new THREE.Scene();//create scene object
  const containerSize=document.querySelector('#right')

const camera = new THREE.PerspectiveCamera( 75, containerSize.offsetWidth / containerSize.offsetHeight, 0.1, 10000 );//create camera object
const renderer = new THREE.WebGLRenderer({antialias: true});//create renderer object
console.log(containerSize)
renderer.setSize( containerSize.offsetWidth, containerSize.offsetHeight );//set size of renderer which is height and width of DIV
renderer.setPixelRatio(window.devicePixelRatio)  //sharpen the image

// document.body.appendChild( renderer.domElement );//adding to HTML body 

const dummy = document.getElementById('right')//adding to HTML body
dummy.appendChild(renderer.domElement)
  




//creating sphere and assing map texture to it
const sphere = new THREE.Mesh( new THREE.SphereGeometry( 5, 50, 50 ), new THREE.ShaderMaterial( {vertexShader, fragmentShader,uniforms:{
  globeTexture:{value: new THREE.TextureLoader().load('./img/globe.jpg')}  
}} ) ); //create sphere object with Mesh Ggeometry and Custom ShaderMaterial



//outside atmosphere look closely
const atmosphere = new THREE.Mesh( new THREE.SphereGeometry( 5, 50, 50 ), new THREE.ShaderMaterial( {vertexShader:atmosphereVertexShader, fragmentShader:atmosphereFragmentShader,
  blending: THREE.AdditiveBlending,side: THREE.BackSide
} ) );
atmosphere.scale.set( 1.1, 1.1, 1.1 ); //creating outside blue hue

scene.add( atmosphere );//adding to it to scene


//group for rotation
const group = new THREE.Group();//create group object
group.add(sphere);//adding sphere 
scene.add(group);//adding group to scene

//stars background 
const starGeometry = new THREE.BufferGeometry();//create BufferGeometry object
const starMaterial = new THREE.PointsMaterial({color: 0xffffff});//create PointsMaterial object
const stars = new THREE.Points(starGeometry, starMaterial);//create Points object
scene.add(stars);//adding stars to scene
const starVertices = [];//create empty array  for vertices and number of stars!
for(let i = 0 ; i < 5000; i++){
  const x = (Math.random() - 0.5) * 2000;
  const y = (Math.random() - 0.5) * 2000;
  const z = -Math.random() * 900
  ;
  starVertices.push(x,y,z);
}
console.log(starVertices);
starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));//set attribute of starGeometry



//data points


function createPoints(lat , lng){
  const points = new THREE.Mesh( new THREE.SphereGeometry( 0.1, 50, 50 ), new THREE.MeshBasicMaterial( {color: 0xff0000} ) );//create sphere object with Mesh Ggeometry and Custom ShaderMaterial
  


  //mexico 23.6345° N, 102.5528° W
const latitude = (lat/ 180) * Math.PI ;
const longitude = (lng/ 180) * Math.PI ;
const radius = 5;


const x = radius * Math.cos(latitude) * Math.sin(longitude);
const y = radius * Math.sin(latitude);
const z = radius * Math.cos(latitude) * Math.cos(longitude);

points.position.set(x,y,z);

group.add(points)

}

createPoints(25.2744, 133.7751)//Australia  
createPoints(23.6345 ,-102.5528) // mexico
createPoints(20.5937, 78.9629) // india
createPoints(61.5240 ,105.3188) // russia
createPoints(35.8617 ,104.1954) // china
createPoints(60.4720, 8.4689 ) // norway

sphere.rotation.y = -Math.PI / 2;

camera.position.z = 15; //set camera position to z-index of 15




const mouse = {
  x: undefined,
  y: undefined // intializ mosue movement to undefined
}

let isClicked = false;   

function animate() {
  requestAnimationFrame( animate );
  renderer.render( scene, camera );
  // sphere.rotation.y += 0.001; //adding rortaion to sphere Eluers angles in radians
  
  if(mouse.x ) {
  gsap.to(group.rotation, {
    x: -mouse.y * 1.8,
    y: mouse.x * 1.8,
    duration:1
})}}

// console.log(animate)  

animate()


addEventListener('mousedown', () => {
  isClicked = true;
});

addEventListener('mouseup', () => {
  isClicked = false;
});
addEventListener('mousemove', (event) => {
  if (isClicked) {
    mouse.x = (event.clientX / innerWidth) * 2 - 1;
    mouse.y = (event.clientY / innerHeight) * 2 + 1;
    // console.log(mouse);
  }
});



const handleMouseMove = (event) => {     //track mouse movement using event listner
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
};

window.addEventListener('mousemove', handleMouseMove);

// Clean up event listener
return () => {
  window.removeEventListener('mousemove', handleMouseMove); //remove event listner as to Why it causes DOM to render twice causing two instances of same 3D model
  dummy.removeChild(renderer.domElement);
};

}, [])


  return (
    <div id="right" style={{width:'100%' , height:'100%'}}>   
        </div>  
  )
}

export default Landing ;
