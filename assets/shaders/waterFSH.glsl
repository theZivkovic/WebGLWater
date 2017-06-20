precision mediump float;

uniform sampler2D reflectionTexture;
uniform sampler2D refractionTexture;

varying vec2 vTextureCoord;

void main(void){

	vec4 reflectionColor = texture2D(reflectionTexture, vTextureCoord);
	vec4 refractionColor = texture2D(refractionTexture, vTextureCoord);
	gl_FragColor = mix(reflectionColor, refractionColor, 0.5);
}