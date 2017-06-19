precision mediump float;

varying vec2 vTextureCoord;
uniform sampler2D whiteTiles;

void main(void)
{
	gl_FragColor = texture2D(whiteTiles, vTextureCoord);
}