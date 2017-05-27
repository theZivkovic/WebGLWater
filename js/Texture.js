import {GL} from './GL'

import loadTextureSrc from './TextureSources';

class Texture {

	constructor(textureSrcID, textureUnit){
		this._textureSrcID = textureSrcID;
		this._textureUnit = textureUnit;
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
		textureImage.src = loadTextureSrc(textureSrcID);
	}

	render(programID){
		GL.activeTexture(GL.TEXTURE0 + this._textureUnit);
		GL.bindTexture(GL.TEXTURE_2D, this._texture);
		GL.uniform1i(GL.getUniformLocation(programID, this._textureSrcID), this._textureUnit);
	}

}

export default Texture;