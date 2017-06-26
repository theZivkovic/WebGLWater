precision mediump float;

uniform sampler2D reflectionTexture;
uniform sampler2D refractionTexture;
uniform sampler2D waterDUDVMap;
uniform sampler2D waterNormalMap;

uniform float waterMoveFactor;
uniform float relectionRefractionFactor;

varying vec4 waterCoordinates;
varying vec3 lightVector;
varying vec3 cameraVector;

float waveStrength = 0.02;

void main(void) 
{
	vec2 waterCoords = (waterCoordinates.xy / waterCoordinates.w) / 2.0 + 0.5;

	vec2 waterMovementXCoords = clamp(vec2(waterCoords.x + waterMoveFactor, waterCoords.y), vec2(0.0, 0.0), vec2(1.0, 1.0));
	vec2 waterMovementXYCoords = clamp(vec2(waterCoords.x + waterMoveFactor, waterCoords.y + waterMoveFactor), vec2(0.0, 0.0), vec2(1.0, 1.0));
	
	vec2 waterHorizontalDistortion = (texture2D(waterDUDVMap, waterMovementXCoords).rg * 2.0 - 1.0) * waveStrength;
	vec2 waterDiagonalDistortion = (texture2D(waterDUDVMap, waterMovementXYCoords).rg * 2.0 - 1.0) * waveStrength;

	vec2 totalWaterDistortion = waterHorizontalDistortion + waterDiagonalDistortion;
    vec2 distortedCoords = waterCoords + totalWaterDistortion;

	vec4 reflectionColor = texture2D(reflectionTexture, vec2(distortedCoords.x, 1.0 - distortedCoords.y));
	vec4 refractionColor = texture2D(refractionTexture, distortedCoords);
	
	vec4 reflectionAndRefractionColor = mix(reflectionColor, refractionColor, relectionRefractionFactor);

	// normal map calculations
	vec3 normalVector = (texture2D(waterNormalMap, distortedCoords) * 2.0 - 1.0).rgb;
	vec3 reflectionVector = normalVector * dot(normalVector, lightVector) * 2.0 - lightVector;
	float specularFactor = pow(max(0.0, dot(reflectionVector, cameraVector)), 3.0);

	//gl_FragColor = reflectionAndRefractionColor;
	gl_FragColor = reflectionAndRefractionColor * (1.0 + specularFactor);
}