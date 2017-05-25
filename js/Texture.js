import {GL} from './GL'

let  a = require("../assets/textures/waterDUDVMap.png");

class Texture {

	constructor(textureSrc, programID){
		this._programID = programID;
		this._texture = GL.createTexture();
		GL.bindTexture(GL.TEXTURE_2D, this._texture);
		GL.texImage2D(GL.TEXTURE_2D, 0, GL.RGBA, 1, 1, 0, GL.RGBA, GL.UNSIGNED_BYTE, new Uint8Array([255, 255, 0, 255])); // small texture

		let textureImage = new Image();
		textureImage.onload = () => {
			GL.bindTexture(GL.TEXTURE_2D, this._texture);
			GL.texImage2D(GL.TEXTURE_2D, 0, GL.RGBA, GL.RGBA, GL.UNSIGNED_BYTE, textureImage);
			GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_MAG_FILTER, GL.LINEAR);
  			GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_MIN_FILTER, GL.LINEAR_MIPMAP_NEAREST);
  			GL.generateMipmap(GL.TEXTURE_2D);
  			GL.bindTexture(GL.TEXTURE_2D, null);
		}
		textureImage.src = a;
	}

	render(){
		GL.activeTexture(GL.TEXTURE0);
		GL.bindTexture(GL.TEXTURE_2D, this._texture);
		GL.uniform1i(GL.getUniformLocation(this._programID, 'uSampler'), 0);
	}

}

export default Texture;