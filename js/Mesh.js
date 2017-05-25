import {GL} from './GL'

class Mesh {

	constructor(programID){
		this._programID = programID;
		this._vertexBuffer = null;
		this._indexBuffer = null;
		this._uvBuffer = null;

		this._vertexPositionAttribute = GL.getAttribLocation(this._programID, 'aVertexPosition');
		GL.enableVertexAttribArray(this._vertexPositionAttribute);
		this._uvPositionAttribute = GL.getAttribLocation(this._programID, 'aTextureCoord');
		GL.enableVertexAttribArray(this._uvPositionAttribute);
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

	render(){
		GL.bindBuffer(GL.ARRAY_BUFFER, this._vertexBuffer);
		GL.vertexAttribPointer(this._vertexPositionAttribute, 3, GL.FLOAT, false, 0, 0);
		GL.bindBuffer(GL.ARRAY_BUFFER, this._uvBuffer);
		GL.vertexAttribPointer(this._uvPositionAttribute, 2, GL.FLOAT, false, 0, 0);

		GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, this._indexBuffer);
		
		GL.drawElements(GL.TRIANGLES, 6, GL.UNSIGNED_SHORT, 0);
	}


}

export default Mesh;