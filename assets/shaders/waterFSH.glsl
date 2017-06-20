precision mediump float;

uniform sampler2D reflectionTexture;
varying vec2 vTextureCoord;

void main(void){
	gl_FragColor = texture2D(reflectionTexture, vTextureCoord);
}