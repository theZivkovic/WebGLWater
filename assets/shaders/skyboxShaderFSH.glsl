precision mediump float;

varying vec3 texPosition;
uniform samplerCube skybox;

void main(void)
{
	gl_FragColor = textureCube(skybox, texPosition);
}