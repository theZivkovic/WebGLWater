precision mediump float;

varying highp vec2 vTextureCoord;
uniform sampler2D firstPassTexture;

void main(void) {

	gl_FragColor = texture2D(firstPassTexture, vTextureCoord);
}