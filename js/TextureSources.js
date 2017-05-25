let textureSources = {};
textureSources.waterDUDVMapSrc = require('../assets/textures/waterDUDVMap.png');
textureSources.waterNormalMapSrc = require('../assets/textures/waterNormalMap.png');

let loadTextureSrc = (textureID) => {
	return textureSources[textureID + 'Src'];
}

export default loadTextureSrc;