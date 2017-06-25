precision mediump float;

uniform sampler2D reflectionTexture;
uniform sampler2D refractionTexture;
uniform sampler2D waterDUDVMap;
uniform sampler2D waterNormalMap;

uniform float waterMoveFactor;
uniform float relectionRefractionFactor;

varying vec4 waterCoordinates;

float waveStrength = 0.01;

void main(void) 
{

	vec2 waterCoords = (waterCoordinates.xy / waterCoordinates.w) / 2.0 + 0.5;

	vec2 waterMovementXCoords = clamp(vec2(waterCoords.x + waterMoveFactor, waterCoords.y), vec2(0.0, 0.0), vec2(1.0, 1.0));
	vec2 waterMovementXYCoords = clamp(vec2(waterCoords.x + waterMoveFactor, waterCoords.y + waterMoveFactor), vec2(0.0, 0.0), vec2(1.0, 1.0));
	
	vec2 waterHorizontalDistortion = (texture2D(waterDUDVMap, waterMovementXCoords).rg * 2.0 - 1.0) * waveStrength;
	vec2 waterDiagonalDistortion = (texture2D(waterDUDVMap, waterMovementXYCoords).rg * 2.0 - 1.0) * waveStrength;

	vec2 totalWaterDistortion = waterHorizontalDistortion + waterDiagonalDistortion;
    vec2 distortedCoords = clamp(waterCoords + totalWaterDistortion, vec2(0.0, 0.0), vec2(1.0, 1.0));

	vec4 reflectionColor = texture2D(reflectionTexture, vec2(distortedCoords.x, 1.0 - distortedCoords.y));
	vec4 refractionColor = texture2D(refractionTexture, distortedCoords);
	
	gl_FragColor = mix(reflectionColor, refractionColor, relectionRefractionFactor);
}