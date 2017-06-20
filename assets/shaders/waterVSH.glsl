attribute vec3 aVertexPosition;
attribute vec2 aTextureCoord;

uniform mat4 P;
uniform mat4 V;
uniform mat4 M;

varying vec4 waterCoordinates;


void main(void){

	waterCoordinates = P * V * M * vec4(aVertexPosition, 1.0);
	gl_Position = waterCoordinates;
}