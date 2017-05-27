precision mediump float;

varying highp vec2 vTextureCoord;
uniform sampler2D waterDUDVMap;
uniform sampler2D whiteTiles;

uniform float moveFactor;
float waveStrength = 0.05;

void main(void) {

	//vec2 uvDistortionX =  (texture2D(waterDUDVMap, vec2(vTextureCoord.x + moveFactor, vTextureCoord.y)).rg * 2.0 - 1.0) * waveStrength;
	//vec2 uvDistortionXY = (texture2D(waterDUDVMap, vec2(vTextureCoord.x + moveFactor, vTextureCoord.y + moveFactor)).rg * 2.0 - 1.0) * waveStrength;
	//vec2 uvTotalDistortion = mix(uvDistortionX, uvDistortionXY, 0.5);
	//gl_FragColor = texture2D(whiteTiles, vTextureCoord + uvTotalDistortion);

	gl_FragColor = texture2D(whiteTiles, vTextureCoord);
}