attribute vec3 aVertexPosition;

uniform mat4 P;
uniform mat4 V;
uniform mat4 M;

varying vec3 texPosition;

void main(void)
{
	texPosition = aVertexPosition;
	gl_Position = P * V * M * vec4(aVertexPosition, 1.0);	
}