import Program from './Program';
import Skybox from './Skybox';
import CubeMesh from './CubeMesh';
import Camera from './Camera';
import GLMATRIX from '../bower_components/gl-matrix/dist/gl-matrix';
import {GL} from './GL'

class SkyboxRenderer extends Program {

	constructor() {
		super();
		this.initialize();
	}

	initialize() {

		this.addShaderDuo("skyboxShader");
		this.enableVertexPositionAttribute();

		this._skybox = new Skybox("fadeaway");
		this._cubeMesh = new CubeMesh(GLMATRIX.vec3.fromValues(0,0,0), 100);
	}

	preRender(camera) {
		GL.useProgram(this.id);
		camera.render(this.id);
	}

	render() {
		this._skybox.render(this.id);
		this._cubeMesh.render(this.id);
	}

}

export default SkyboxRenderer;