attribute vec3 aVertexPosition;
attribute vec2 aTextureCoord;

uniform mat4 V;
uniform mat4 P;
uniform mat4 M;

varying highp vec3 vTextureCoord;

void main(void)
{
	vTextureCoord = vec3(aTextureCoord, 1.0);
	gl_Position = P * V * M * vec4(aVertexPosition, 1.0);
}