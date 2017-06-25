precision mediump float;

uniform sampler2D reflectionTexture;
uniform sampler2D refractionTexture;
uniform sampler2D waterDUDVMap;
uniform float waterMoveFactor;
uniform float relectionRefractionFactor;

varying vec4 waterCoordinates;

float waveStrength = 0.01;
void main(void){

	vec2 waterCoords = (waterCoordinates.xy / waterCoordinates.w) / 2.0 + 0.5;
	vec2 waterHorizontalDistortion = (texture2D(waterDUDVMap, vec2(waterCoords.x + waterMoveFactor, waterCoords.y)).rg * 2.0 - 1.0) * waveStrength;
	vec2 waterDiagonalDistortion = (texture2D(waterDUDVMap, vec2(waterCoords.x + waterMoveFactor, waterCoords.y + waterMoveFactor)).rg * 2.0 - 1.0) * waveStrength;

	vec2 totalWaterDistortion = waterHorizontalDistortion + waterDiagonalDistortion;
    vec2 distortedReflectionCoords = waterCoords + totalWaterDistortion;
    vec2 distortedRefractionCoords = waterCoords + totalWaterDistortion;
	vec4 reflectionColor = texture2D(reflectionTexture, vec2(distortedReflectionCoords.x, 1.0 - distortedReflectionCoords.y));
	vec4 refractionColor = texture2D(refractionTexture, distortedRefractionCoords);
	gl_FragColor = mix(reflectionColor, refractionColor, relectionRefractionFactor);
	
}