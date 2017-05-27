import {GL} from './GL'
import GLMATRIX from '../bower_components/gl-matrix/dist/gl-matrix';

class Mesh {

	constructor(programID){
		this._programID = programID;
		this._vertexBuffer = null;
		this._indexBuffer = null;
		this._uvBuffer = null;
		this._modelTransform = GLMATRIX.mat4.create();
		console.log();

		this._vertexPositionAttribute = GL.getAttribLocation(this._programID, 'aVertexPosition');
		GL.enableVertexAttribArray(this._vertexPositionAttribute);
		this._uvPositionAttribute = GL.getAttribLocation(this._programID, 'aTextureCoord');
		GL.enableVertexAttribArray(this._uvPositionAttribute);
		this._modelTransformUniformLoc = GL.getUniformLocation(this._programID, 'M');
	}

	setVertexBuffer(verticesArray){
		this._verticesArray = verticesArray;
		this._vertexBuffer = GL.createBuffer();
		GL.bindBuffer(GL.ARRAY_BUFFER, this._vertexBuffer);
		GL.bufferData(GL.ARRAY_BUFFER, new Float32Array(verticesArray), GL.STATIC_DRAW);
	}

	setIndexBuffer(indexArray){
		this._indexArray = indexArray;
		this._indexBuffer = GL.createBuffer();
		GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, this._indexBuffer);
		GL.bufferData(GL.ELEMENT_ARRAY_BUFFER, new Uint16Array(indexArray),GL.STATIC_DRAW);
	}

	setUVBuffer(uvArray){
		this._uvArray = uvArray;
		this._uvBuffer = GL.createBuffer();
		GL.bindBuffer(GL.ARRAY_BUFFER, this._uvBuffer);
		GL.bufferData(GL.ARRAY_BUFFER, new Float32Array(uvArray), GL.STATIC_DRAW);
	}

	setModelTransform(some4x4Matrix) {
		this._modelTransform = some4x4Matrix;
	}

	render() {
		GL.uniformMatrix4fv(this._modelTransformUniformLoc, false, new Float32Array(this._modelTransform));
		GL.bindBuffer(GL.ARRAY_BUFFER, this._vertexBuffer);
		GL.vertexAttribPointer(this._vertexPositionAttribute, 3, GL.FLOAT, false, 0, 0);
		GL.bindBuffer(GL.ARRAY_BUFFER, this._uvBuffer);
		GL.vertexAttribPointer(this._uvPositionAttribute, 2, GL.FLOAT, false, 0, 0);
		GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, this._indexBuffer);		
		GL.drawElements(GL.TRIANGLES, this._indexArray.length, GL.UNSIGNED_SHORT, 0);
	}


}

export default Mesh;