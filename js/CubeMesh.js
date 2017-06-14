import Mesh from './Mesh';
import GLMATRIX from '../bower_components/gl-matrix/dist/gl-matrix';

class CubeMesh {

	constructor(position, cubeHalfWidth){
		
		this._mesh = new Mesh();
		this._mesh.setVertexBuffer([
		     // front
		    -cubeHalfWidth, -cubeHalfWidth,  cubeHalfWidth,
		     cubeHalfWidth, -cubeHalfWidth,  cubeHalfWidth,
		     cubeHalfWidth,  cubeHalfWidth,  cubeHalfWidth,
		    -cubeHalfWidth,  cubeHalfWidth,  cubeHalfWidth,
		    // back
		    -cubeHalfWidth, -cubeHalfWidth, -cubeHalfWidth,
		     cubeHalfWidth, -cubeHalfWidth, -cubeHalfWidth,
		     cubeHalfWidth,  cubeHalfWidth, -cubeHalfWidth,
		    -cubeHalfWidth,  cubeHalfWidth, -cubeHalfWidth
		]);

		this._mesh.setIndexBuffer([
			// front
			0, 1, 2,
			2, 3, 0,
			// top
			1, 5, 6,
			6, 2, 1,
			// back
			7, 6, 5,
			5, 4, 7,
			// bottom
			4, 0, 3,
			3, 7, 4,
			// left
			4, 5, 1,
			1, 0, 4,
			// right
			3, 2, 6,
			6, 7, 3
		]);

		this._mesh.setModelTransform(GLMATRIX.mat4.create());
	}

	get mesh() {
		return this._mesh;
	}
}

export default CubeMesh;