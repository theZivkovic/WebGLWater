attribute vec3 aVertexPosition;
attribute vec2 aTextureCoord;

uniform mat4 P;
uniform mat4 V;
uniform mat4 M;

uniform vec3 lightPosition;
uniform vec3 cameraPosition;


varying vec4 waterCoordinates;
varying vec3 lightVector;
varying vec3 cameraVector;

void main(void){

	vec3 worldPosition = (M * vec4(aVertexPosition, 1.0)).xyz;
	waterCoordinates = P * V * vec4(worldPosition, 1.0);
	lightVector = normalize(lightPosition - worldPosition);
	cameraVector = normalize(cameraPosition - worldPosition);
	gl_Position = waterCoordinates;
}