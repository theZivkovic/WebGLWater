let shaderSources = {};
shaderSources.defaultVertexSource = require('../assets/shaders/defaultVSH.glsl');
shaderSources.defaultFragmentSource = require('../assets/shaders/defaultFSH.glsl');
shaderSources.secondPassVertexSource = require('../assets/shaders/secondPassVSH.glsl');
shaderSources.secondPassFragmentSource = require('../assets/shaders/secondPassFSH.glsl');
shaderSources.environmentShaderVertexSource = require('../assets/shaders/environmentShaderVSH.glsl');
shaderSources.environmentShaderFragmentSource = require('../assets/shaders/environmentShaderFSH.glsl');
shaderSources.skyboxShaderVertexSource = require('../assets/shaders/skyboxShaderVSH.glsl');
shaderSources.skyboxShaderFragmentSource = require('../assets/shaders/skyboxShaderFSH.glsl');

let capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
let loadShaderSource = (shaderID, shaderType) => {
	return shaderSources[shaderID + capitalizeFirstLetter(shaderType) + "Source"];
}

export default loadShaderSource;