import Program from './Program';
import PlaneMesh from './PlaneMesh';
import CubeMesh from './CubeMesh';
import GLMATRIX from '../bower_components/gl-matrix/dist/gl-matrix';

class EnvironmentRenderer extends Program {

	constructor() {
		super();
		this.initialize();
	}

	initialize() { 
		this.addShaderDuo("environmentShader");
		this.enableVertexPositionAttribute();
		this.enableVertexColorAttribute();

		this._somePlane = new PlaneMesh(GLMATRIX.vec3.fromValues(0, 0, 0),
										GLMATRIX.vec3.fromValues(1, 0, 0),
										GLMATRIX.vec3.fromValues(0, 1, 0),
										20);
		this._somePlane._mesh.setColor(GLMATRIX.vec3.fromValues(1, 0, 0));

		this._someCube = new CubeMesh(GLMATRIX.vec3.fromValues(0, 0, 0), 10);
		this._someCube._mesh.setColor(GLMATRIX.vec3.fromValues(0, 1, 0));
	}

	preRender(camera) {
		camera.render(this.id);
	}

	render() {
		this._somePlane.mesh.render(this.id);
		this._someCube.mesh.render(this.id);
	}
}

export default EnvironmentRenderer;