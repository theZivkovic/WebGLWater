import Program from './Program';
import PlaneMesh from './PlaneMesh';
import CubeMesh from './CubeMesh';
import GLMATRIX from '../bower_components/gl-matrix/dist/gl-matrix';
import {GL} from './GL'

class ColoredCubesRenderer extends Program {

	constructor() {
		super();
		this.initialize();
	}

	initialize() { 
		this.addShaderDuo("coloredCubesShader");
		this.enableVertexPositionAttribute();
		this.enableVertexColorAttribute();

		this._cube1 = new CubeMesh(GLMATRIX.vec3.fromValues(-30, 10, -30), 2);
		this._cube1.setColor(GLMATRIX.vec3.fromValues(1, 0, 0));

		this._cube2 = new CubeMesh(GLMATRIX.vec3.fromValues(-30, 10, 30), 2);
		this._cube2.setColor(GLMATRIX.vec3.fromValues(1, 1, 0));

		this._cube3 = new CubeMesh(GLMATRIX.vec3.fromValues(30, 10, -30), 2);
		this._cube3.setColor(GLMATRIX.vec3.fromValues(0, 1, 1));

		this._cube4 = new CubeMesh(GLMATRIX.vec3.fromValues(30, 10, 30), 2);
		this._cube4.setColor(GLMATRIX.vec3.fromValues(1, 0, 1));

		this._cube5 = new CubeMesh(GLMATRIX.vec3.fromValues(0, 10, 0), 2);
		this._cube5.setColor(GLMATRIX.vec3.fromValues(0, 1, 0));
	}

	preRender(camera) {
		GL.useProgram(this.id);
		camera.render(this.id);
	}

	render() {
		this._cube1.render(this.id);
		this._cube2.render(this.id);
		this._cube3.render(this.id);
		this._cube4.render(this.id);
		this._cube5.render(this.id);
	}
}

export default ColoredCubesRenderer;