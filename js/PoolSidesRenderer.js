import GLMATRIX from '../bower_components/gl-matrix/dist/gl-matrix';
import PlaneMesh from './PlaneMesh';
import Program from './Program';
import Texture from './Texture';
import {GL} from './GL';

class PoolSidesRenderer extends Program {

	constructor() {
		
		super();
		
		const POOL_DEPTH = 30.0;
		this.addShaderDuo("poolSidesShader");
		this.enableVertexPositionAttribute();
		this.enableTextureCoordAttribute();

		this._poolSides = [];
		// BOTTOM
		this._poolSides.push(new PlaneMesh(GLMATRIX.vec3.fromValues(0,-30 -POOL_DEPTH,0), GLMATRIX.vec3.fromValues(1, 0, 0), GLMATRIX.vec3.fromValues(0,1,0), 30.0));
		// RIGHT
		this._poolSides.push(new PlaneMesh(GLMATRIX.vec3.fromValues(30,-POOL_DEPTH,0), GLMATRIX.vec3.fromValues(0, 1, 0), GLMATRIX.vec3.fromValues(-1,0,0), 30.0));
		// LEFT
		this._poolSides.push(new PlaneMesh(GLMATRIX.vec3.fromValues(-30,-POOL_DEPTH,0), GLMATRIX.vec3.fromValues(0, 1, 0), GLMATRIX.vec3.fromValues(1,0,0), 30.0));
		// FRONT
		this._poolSides.push(new PlaneMesh(GLMATRIX.vec3.fromValues(0,-POOL_DEPTH,30), GLMATRIX.vec3.fromValues(0, 1, 0), GLMATRIX.vec3.fromValues(0,0,-1), 30.0));
		// REAR
		this._poolSides.push(new PlaneMesh(GLMATRIX.vec3.fromValues(0,-POOL_DEPTH,-30), GLMATRIX.vec3.fromValues(0, 1, 0), GLMATRIX.vec3.fromValues(0,0,1), 30.0));
	
		this._mainTexture = new Texture("whiteTiles", 0);
	}

	preRender(camera){
		GL.useProgram(this.id);
		camera.render(this.id);
	}

	render(){
		const programID = this.id;
		this._mainTexture.render(this.id);
		this._poolSides.forEach(poolSide => {
			poolSide.render(programID);
		});
	}
}

export default PoolSidesRenderer;