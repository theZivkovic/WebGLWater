let shaderSources = {};
shaderSources.defaultVertexSource = require('../assets/shaders/defaultVSH.glsl');
shaderSources.defaultFragmentSource = require('../assets/shaders/defaultFSH.glsl');
shaderSources.secondPassVertexSource = require('../assets/shaders/secondPassVSH.glsl');
shaderSources.secondPassFragmentSource = require('../assets/shaders/secondPassFSH.glsl');
shaderSources.coloredCubesShaderVertexSource = require('../assets/shaders/coloredCubesShaderVSH.glsl');
shaderSources.coloredCubesShaderFragmentSource = require('../assets/shaders/coloredCubesShaderFSH.glsl');
shaderSources.skyboxShaderVertexSource = require('../assets/shaders/skyboxShaderVSH.glsl');
shaderSources.skyboxShaderFragmentSource = require('../assets/shaders/skyboxShaderFSH.glsl');
shaderSources.poolSidesShaderVertexSource = require('../assets/shaders/poolSidesVSH.glsl');
shaderSources.poolSidesShaderFragmentSource = require('../assets/shaders/poolSidesFSH.glsl');
shaderSources.waterShaderVertexSource = require('../assets/shaders/waterVSH.glsl');
shaderSources.waterShaderFragmentSource = require('../assets/shaders/waterFSH.glsl');

let capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
let loadShaderSource = (shaderID, shaderType) => {
	return shaderSources[shaderID + capitalizeFirstLetter(shaderType) + "Source"];
}

export default loadShaderSource;