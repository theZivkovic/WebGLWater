import {loadCubeMap} from './TextureSources';
import CubeMesh from './CubeMesh';
import GLMATRIX from '../bower_components/gl-matrix/dist/gl-matrix';
import {GL} from './GL';

class Skybox {

	constructor(cubeMapID){
		this._cubeMapTextures = loadCubeMap(cubeMapID);
		this._mesh = new CubeMesh(GLMATRIX.vec3.fromValues(0,0,0), 30);
		console.log(this._cubeMapTextures);
	}

	loadTextureCube(urls) {
	    var ct = 0;
	    var img = new Array(6);
	    var urls = [
	       "park/posx.jpg", "park/negx.jpg", 
	       "park/posy.jpg", "park/negy.jpg", 
	       "park/posz.jpg", "park/negz.jpg"
	    ];
	    for (var i = 0; i < 6; i++) {
	        img[i] = new Image();
	        img[i].onload = function() {
	            ct++;
	            if (ct == 6) {
	                texID = GL.createTexture();
	                GL.bindTexture(GL.TEXTURE_CUBE_MAP, texID);
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
		GL.uniform1i(GL.getUniformLocation(programID, "skybox"), 0);
		this._mesh.mesh.render(programID);
	}

}

export default Skybox;