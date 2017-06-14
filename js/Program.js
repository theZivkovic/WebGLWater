import {GL} from './GL'
import loadShaderSource from './ShaderSources';
import Shader from './Shader';

class Program {

	constructor() {
		this._programID = GL.createProgram();
	}

	addShaderDuo(shaderID) {
		
		let vertexShader = new Shader(loadShaderSource(shaderID, 'vertex'), GL.VERTEX_SHADER);
		let fragmentShader = new Shader(loadShaderSource(shaderID, 'fragment'), GL.FRAGMENT_SHADER);
		GL.attachShader(this._programID, vertexShader.id);
		GL.attachShader(this._programID, fragmentShader.id);
		GL.linkProgram(this._programID);

		if (!GL.getProgramParameter(this._programID, GL.LINK_STATUS)) {
		 	throw 'Unable to initialize the shader program: ' + GL.getProgramInfoLog(this._programID);
		}
		
		GL.useProgram(this._programID);
	}

	enableVertexPositionAttribute() {
		let vertexPositionAttribute = GL.getAttribLocation(this._programID, 'aVertexPosition');
		GL.enableVertexAttribArray(vertexPositionAttribute);
	}

	enableTextureCoordAttribute() {
		let uvPositionAttribute = GL.getAttribLocation(this._programID, 'aTextureCoord');
		GL.enableVertexAttribArray(uvPositionAttribute);
	}

	enableVertexColorAttribute() {
		let vertexColorAttribute = GL.getAttribLocation(this._programID, 'aVertexColor');
		GL.enableVertexAttribArray(vertexColorAttribute);
	}

	get id(){
		return this._programID;
	}

}

export default Program;
