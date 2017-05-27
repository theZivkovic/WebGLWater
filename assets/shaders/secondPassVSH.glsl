attribute vec3 aVertexPosition;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 M;

varying highp vec2 vTextureCoord;

void main(void) {
	gl_Position = uPMatrix * uMVMatrix * M * vec4(aVertexPosition, 1.0);
	vTextureCoord = aTextureCoord;
}