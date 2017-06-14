import Mesh from './Mesh';
import GLMATRIX from '../bower_components/gl-matrix/dist/gl-matrix';

class CubeMesh extends Mesh {

	constructor(position, cubeHalfWidth){
		
		super();
		this.setVertexBuffer([
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

		this.setIndexBuffer([
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

		let translationMatrix = GLMATRIX.mat4.create();
		GLMATRIX.mat4.translate(translationMatrix, translationMatrix, position);
		this.setModelTransform(translationMatrix);
	}
}

export default CubeMesh;