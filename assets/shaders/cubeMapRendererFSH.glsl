precision mediump float;

uniform samplerCube skybox;

//varying highp vec3 vTextureCoord;

void main(void)
{
	//gl_FragColor = textureCube(skybox, vTextureCoord);	
	gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
}