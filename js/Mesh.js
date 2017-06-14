import {GL} from './GL'
import GLMATRIX from '../bower_components/gl-matrix/dist/gl-matrix';

class Mesh {

	constructor(){
		this._vertexBuffer = null;
		this._indexBuffer = null;
		this._uvBuffer = null;
		this._colorBuffer = null;
		this._modelTransform = GLMATRIX.mat4.create();
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

	setColorBuffer(colorArray){
		this._colorArray = colorArray;
		this._colorBuffer = GL.createBuffer();
		GL.bindBuffer(GL.ARRAY_BUFFER, this._colorBuffer);
		GL.bufferData(GL.ARRAY_BUFFER, new Float32Array(colorArray), GL.STATIC_DRAW);
	}

	setModelTransform(some4x4Matrix) {
		this._modelTransform = some4x4Matrix;
	}

	setColor(someColor){
		let colorArray = [];
		for (var i = 0; i < this._verticesArray.length / 3; i++){
			colorArray.push(someColor[0], someColor[1], someColor[2]);
		}
		this.setColorBuffer(colorArray);
	}
	
	render(programID) {
		GL.uniformMatrix4fv(GL.getUniformLocation(programID, 'M'), false, new Float32Array(this._modelTransform));
	
		if (this._vertexBuffer && GL.getAttribLocation(programID, 'aVertexPosition') >= 0){
			GL.bindBuffer(GL.ARRAY_BUFFER, this._vertexBuffer);
			GL.vertexAttribPointer(GL.getAttribLocation(programID, 'aVertexPosition'), 3, GL.FLOAT, false, 0, 0);
		}
		
		if (this._uvBuffer && GL.getAttribLocation(programID, 'aTextureCoord') >= 0){
			GL.bindBuffer(GL.ARRAY_BUFFER, this._uvBuffer);
			GL.vertexAttribPointer(GL.getAttribLocation(programID, 'aTextureCoord'), 2, GL.FLOAT, false, 0, 0);	
		}

		if (this._colorBuffer && GL.getAttribLocation(programID, 'aVertexColor') >= 0){
			GL.bindBuffer(GL.ARRAY_BUFFER, this._colorBuffer);
			GL.vertexAttribPointer(GL.getAttribLocation(programID, 'aVertexColor'), 3, GL.FLOAT, false, 0, 0);
		}
		
		GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, this._indexBuffer);		
		GL.drawElements(GL.TRIANGLES, this._indexArray.length, GL.UNSIGNED_SHORT, 0);
	}


}

export default Mesh;