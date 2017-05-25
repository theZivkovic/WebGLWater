import {GL} from './GL'

class Mesh {

	constructor(){
		this._vertexBuffer = null;
		this._indexBuffer = null;
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

	render(programID){
		GL.bindBuffer(GL.ARRAY_BUFFER, this._vertexBuffer);
		let vertexPositionAttribute = GL.getAttribLocation(programID, 'aVertexPosition');
		GL.vertexAttribPointer(vertexPositionAttribute, 3, GL.FLOAT, false, 0, 0);
		GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, this._indexBuffer);
		GL.drawElements(GL.TRIANGLES, 6, GL.UNSIGNED_SHORT, 0);
	}


}

export default Mesh;