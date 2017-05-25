import {GL} from './GL'

let  a = require("../assets/textures/waterDUDVMap.png");

class Texture {

	constructor(textureSrc){
		let texture = GL.createTexture();
		let textureImage = new Image();
		textureImage.onLoad = () => {
			GL.bindTexture(GL.Texture_2D, texture);
			GL.texImage2D(GL.Texture_2D, GL.RGBA, GL.RGBA, GL.UNSIGNED_BYTE, textureImage);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
  			gl.generateMipMap(GL.TEXTURE_2D);
  			gl.bindTexture(GL.TEXTURE_2D, null);
		}
		textureImage.src = a;
	}

}

export default Texture;