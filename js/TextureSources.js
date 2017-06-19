import {GL} from './GL';

let textureSources = {};
textureSources.waterDUDVMapSrc = require('../assets/textures/waterDUDVMap.png');
textureSources.waterNormalMapSrc = require('../assets/textures/waterNormalMap.png');
textureSources.wallSrc = require('../assets/textures/wall.jpg');
textureSources.whiteTilesSrc = require('../assets/textures/whiteTiles.png');
textureSources.cubeMaps = {};
textureSources.cubeMaps.fadeaway = [];
textureSources.cubeMaps.fadeaway.front = require('../assets/textures/cubemap_fadeaway/fadeaway_ft.png');
textureSources.cubeMaps.fadeaway.back = require('../assets/textures/cubemap_fadeaway/fadeaway_bk.png');
textureSources.cubeMaps.fadeaway.up = require('../assets/textures/cubemap_fadeaway/fadeaway_up.png');
textureSources.cubeMaps.fadeaway.down = require('../assets/textures/cubemap_fadeaway/fadeaway_dn.png');
textureSources.cubeMaps.fadeaway.right = require('../assets/textures/cubemap_fadeaway/fadeaway_rt.png');
textureSources.cubeMaps.fadeaway.left = require('../assets/textures/cubemap_fadeaway/fadeaway_lf.png');

let loadTextureSrc = (textureSrcID) => {
	return textureSources[textureSrcID + 'Src'];
}

let loadCubeMap = (cubeMapID) => {
	// let result = {};
	// result[GL.TEXTURE_CUBE_MAP_POSITIVE_X] = textureSources.cubeMaps[cubeMapID].right;
	// result[GL.TEXTURE_CUBE_MAP_NEGATIVE_X] = textureSources.cubeMaps[cubeMapID].left;
	// result[GL.TEXTURE_CUBE_MAP_POSITIVE_Y] = textureSources.cubeMaps[cubeMapID].up;
	// result[GL.TEXTURE_CUBE_MAP_NEGATIVE_Y] = textureSources.cubeMaps[cubeMapID].down;
	// result[GL.TEXTURE_CUBE_MAP_POSITIVE_Z] = textureSources.cubeMaps[cubeMapID].front;
	// result[GL.TEXTURE_CUBE_MAP_NEGATIVE_Z] = textureSources.cubeMaps[cubeMapID].back;
	// return result;
	return Object.keys(textureSources.cubeMaps[cubeMapID]).map((textureID) => {
		return textureSources.cubeMaps[cubeMapID][textureID];
	});
}

export { loadTextureSrc as loadTextureSrc, loadCubeMap as loadCubeMap};