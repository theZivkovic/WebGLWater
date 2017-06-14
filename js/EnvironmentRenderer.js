import Program from './Program';
import PlaneMesh from './PlaneMesh';
import CubeMesh from './CubeMesh';
import GLMATRIX from '../bower_components/gl-matrix/dist/gl-matrix';
import {GL} from './GL'

class EnvironmentRenderer extends Program {

	constructor() {
		super();
		this.initialize();
	}

	initialize() { 
		this.addShaderDuo("environmentShader");
		this.enableVertexPositionAttribute();
		this.enableVertexColorAttribute();

		this._cube1 = new CubeMesh(GLMATRIX.vec3.fromValues(-20, 0, -20), 2);
		this._cube1.setColor(GLMATRIX.vec3.fromValues(1, 0, 0));

		this._cube2 = new CubeMesh(GLMATRIX.vec3.fromValues(-20, 0, 20), 2);
		this._cube2.setColor(GLMATRIX.vec3.fromValues(1, 1, 0));

		this._cube3 = new CubeMesh(GLMATRIX.vec3.fromValues(20, 0, -20), 2);
		this._cube3.setColor(GLMATRIX.vec3.fromValues(0, 1, 1));

		this._cube4 = new CubeMesh(GLMATRIX.vec3.fromValues(20, 0, 20), 2);
		this._cube4.setColor(GLMATRIX.vec3.fromValues(1, 0, 1));
	}

	preRender(camera) {
		camera.render(this.id);
	}

	render() {
		this._cube1.render(this.id);
		this._cube2.render(this.id);
		this._cube3.render(this.id);
		this._cube4.render(this.id);
	}
}

export default EnvironmentRenderer;