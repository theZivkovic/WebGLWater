let shaderSources = {};
shaderSources.defaultVertexSource = require('../assets/shaders/defaultVSH.glsl');
shaderSources.defaultFragmentSource = require('../assets/shaders/defaultFSH.glsl');

let capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
let loadShaderSource = (shaderID, shaderType) => {
	return shaderSources[shaderID + capitalizeFirstLetter(shaderType) + "Source"];
}

export default loadShaderSource;