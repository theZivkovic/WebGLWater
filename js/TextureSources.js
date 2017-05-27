let textureSources = {};
textureSources.waterDUDVMapSrc = require('../assets/textures/waterDUDVMap.png');
textureSources.waterNormalMapSrc = require('../assets/textures/waterNormalMap.png');
textureSources.wallSrc = require('../assets/textures/wall.jpg');
textureSources.whiteTilesSrc = require('../assets/textures/whiteTiles.png');

let loadTextureSrc = (textureSrcID) => {
	return textureSources[textureSrcID + 'Src'];
}

export default loadTextureSrc;