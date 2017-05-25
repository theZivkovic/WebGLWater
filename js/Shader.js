import {GL} from './GL'

class Shader {

	constructor(shaderSource, shaderType) {
		this._shaderID = GL.createShader(shaderType);
		GL.shaderSource(this._shaderID, shaderSource.toString());
		GL.compileShader(this._shaderID);

		if (!GL.getShaderParameter(this._shaderID, GL.COMPILE_STATUS)) {  
      		GL.deleteShader(this._shaderID);
      		throw  'An error occurred compiling the shader: ' + GL.getShaderInfoLog(this._shaderID) 
  		}
	}

	get id() {
		return this._shaderID;
	}

}

export default Shader;