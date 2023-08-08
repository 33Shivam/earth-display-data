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
renderer.setSize( containerSize.offsetWidth, containerSize.offsetHeight );//set size of renderer which is height and width of window
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


camera.position.z = 15; //set camera position to z-index of 15

const mouse = {
  x: undefined,
  y: undefined
}

let isClicked = false;

function animate() {
  requestAnimationFrame( animate );
  renderer.render( scene, camera );
  sphere.rotation.y += 0.001; //adding rortaion to sphere Eluers angles in radians
  gsap.to(group.rotation, {
    x: -mouse.y * 0.2,
    y: mouse.x * 0.5,
    duration:3
})}

// console.log(animate)  

animate()


// addEventListener('mousedown', () => {
//   isClicked = true;
// });

// addEventListener('mouseup', () => {
//   isClicked = false;
// });

// addEventListener('mousemove', (event) => {
//   if (isClicked) {
//     mouse.x = (event.clientX / innerWidth) * 2 - 1;
//     mouse.y = (event.clientY / innerHeight) * 2 + 1;
//     // console.log(mouse);
//   }
// });



const handleMouseMove = (event) => {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
};

window.addEventListener('mousemove', handleMouseMove);

// Clean up event listener
return () => {
  window.removeEventListener('mousemove', handleMouseMove);
  dummy.removeChild(renderer.domElement);
};

}, [])


  return (
    <div id="right" style={{width:'100%' , height:'100%'}}>
        </div>  
  )
}

export default Landing ;