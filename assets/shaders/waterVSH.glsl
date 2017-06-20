attribute vec3 aVertexPosition;
attribute vec2 aTextureCoord;

uniform mat4 P;
uniform mat4 V;
uniform mat4 M;

varying vec2 vTextureCoord;

void main(void){
	vTextureCoord = aTextureCoord;
	gl_Position = P * V * M * vec4(aVertexPosition, 1.0);
}