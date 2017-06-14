attribute vec3 aVertexPosition;
attribute vec3 aVertexColor;

uniform mat4 P;
uniform mat4 V;
uniform mat4 M;

varying vec3 vVertexColor;

void main(void)
{
	gl_Position = P * V * M * vec4(aVertexPosition, 1.0);
	vVertexColor = aVertexColor;	
}