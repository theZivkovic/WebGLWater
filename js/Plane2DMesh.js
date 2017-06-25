import Mesh from './Mesh';
import GLMATRIX from '../bower_components/gl-matrix/dist/gl-matrix';
import {GL} from './GL'

class Plane2DMesh extends Mesh {

	constructor(center, width, height){
		super();
		this._center = center;
		this._width = width;
		this._height = height;
		this.initialize();
	}

	initialize() {

		this.setVertexBuffer([
		    this._center.x - this._width / 2.0, this._center.x - this._height / 2.0, -1.0,
		    this._center.x + this._width / 2.0, this._center.x - this._height / 2.0, -1.0,
		    this._center.x + this._width / 2.0, this._center.x + this._height / 2.0, -1.0,
		    this._center.x - this._width / 2.0, this._center.x + this._height / 2.0, -1.0
		]);

		this.setIndexBuffer([
			0, 1, 3, 1, 2, 3
		]);

		this.setUVBuffer([
			0.0, 0.0,
			1.0, 0.0,
			1.0, 1.0,
			0.0, 1.0
		]);

		this.setModelTransform(GLMATRIX.mat4.create());
	}

	preRender(programID) {
		GL.uniformMatrix4fv(GL.getUniformLocation(programID, "V"), false, new Float32Array(GLMATRIX.mat4.create()));
		GL.uniformMatrix4fv(GL.getUniformLocation(programID, "P"), false, new Float32Array(GLMATRIX.mat4.create()));
	}
}

export default Plane2DMesh;