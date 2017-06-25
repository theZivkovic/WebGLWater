# WebGLWater

## What is this about?

This is a simulation of water in WebGL.
A simple scene containing a skybox, 5 cubes
and a pool with water. 

## Instalation

- Clone the repository
- npm install
- bower install
- npm run start
- Fire up the browser and go to: http://localhost:8080/

## Techniques

First the skybox, cubes and pool sides are rendered on
the screen. Then the reflection and refraction textures
are generated using special framebuffers. Then those
textures are applied to the water plane with some distortion
made by dudv maps. In the end, those two textures are mixed 
in a ratio that depends on the camera angle to the water
surface (Fresnel effect).