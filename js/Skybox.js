import {loadCubeMap} from './TextureSources';
import CubeMesh from './CubeMesh';
import {GL} from './GL';

class Skybox {

	constructor(cubeMapID){
		this._cubeMapTextures = loadCubeMap(cubeMapID);
		this._cubeMapTextureID = null;
		this.loadTextureCube(this._cubeMapTextures);
	}

	loadTextureCube(urls) {
	    var ct = 0;
	    var img = new Array(6);
	    let self = this;
	    for (var i = 0; i < 6; i++) {
	        img[i] = new Image();
	        img[i].onload = function() {
	            ct++;
	            if (ct == 6) {
	                self._cubeMapTextureID = GL.createTexture();
	                GL.bindTexture(GL.TEXTURE_CUBE_MAP, self._cubeMapTextureID);
	                var targets = [
	                   GL.TEXTURE_CUBE_MAP_POSITIVE_X, GL.TEXTURE_CUBE_MAP_NEGATIVE_X, 
	                   GL.TEXTURE_CUBE_MAP_POSITIVE_Y, GL.TEXTURE_CUBE_MAP_NEGATIVE_Y, 
	                   GL.TEXTURE_CUBE_MAP_POSITIVE_Z, GL.TEXTURE_CUBE_MAP_NEGATIVE_Z 
	                ];
	                for (var j = 0; j < 6; j++) {
	                    GL.texImage2D(targets[j], 0, GL.RGBA, GL.RGBA, GL.UNSIGNED_BYTE, img[j]);
	                    GL.texParameteri(GL.TEXTURE_CUBE_MAP, GL.TEXTURE_WRAP_S, GL.CLAMP_TO_EDGE);
	                    GL.texParameteri(GL.TEXTURE_CUBE_MAP, GL.TEXTURE_WRAP_T, GL.CLAMP_TO_EDGE);
	                }
	                GL.generateMipmap(GL.TEXTURE_CUBE_MAP);
	            }
	        }
	        img[i].src = urls[i];
	    }
	}

	render(programID) {
		GL.activeTexture(GL.TEXTURE_CUBE_MAP);
		GL.bindTexture(GL.TEXTURE_CUBE_MAP, this._cubeMapTextureID);
		GL.uniform1i(GL.getUniformLocation(programID, "skybox"), 0);
	}

}

export default Skybox;