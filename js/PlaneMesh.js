import Mesh from './Mesh';
import GLMATRIX from '../bower_components/gl-matrix/dist/gl-matrix';

class PlaneMesh extends Mesh {

	constructor(position, planeVector, planeNormal, planeSize){
		
		super();
		this.setVertexBuffer([
		    -planeSize, 0.0, -planeSize,
		    +planeSize, 0.0, -planeSize,
		    +planeSize, 0.0, +planeSize,
		    -planeSize, 0.0, +planeSize
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

		
		let anotherPlaneVector = GLMATRIX.vec3.create();
		GLMATRIX.vec3.cross(anotherPlaneVector, planeVector, planeNormal);
		let transform = GLMATRIX.mat4.fromValues(
			planeVector[0], planeNormal[0], anotherPlaneVector[0], position[0],
			planeVector[1], planeNormal[1], anotherPlaneVector[1], position[1],
			planeVector[2], planeNormal[2], anotherPlaneVector[2], position[2],
						 0,				 0,						0, 1);
		GLMATRIX.mat4.transpose(transform, transform);
		this.setModelTransform(transform);
	}
}

export default PlaneMesh;