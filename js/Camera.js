import {GL} from './GL'
import GLMATRIX from '../bower_components/gl-matrix/dist/gl-matrix';

class Camera {
	
	constructor(phi, theta, radius){
		this._phi = phi;
		this._theta = theta;
		this._radius = radius;

		this._mouseDownPhi = null;
		this._mouseDownTheta = null;
		this._mouseDownPosition = null;
	}

	setSourceOfInteraction(renderCanvas){
		this._renderCanvas = renderCanvas;
		renderCanvas.addEventListener('mousedown', event => this.onMouseDown(event)); 
		renderCanvas.addEventListener('mouseup', event => this.onMouseUp(event)); 
		renderCanvas.addEventListener('mousemove', event => this.onMouseMove(event));
		document.addEventListener('keydown', event => this.onKeyDown(event));
	}

	onMouseDown(event){
		this._mouseDownPosition = {x: event.clientX, y: event.clientY };
		this._mouseDownPhi = this._phi;
		this._mouseDownTheta = this._theta;
	}	

	onMouseUp(event){
		this._mouseDownPosition = null;
	}

	onMouseMove(event) {
		if (this._mouseDownPosition){
			let mouseMovePosition = {x: event.clientX, y: event.clientY };
			let deltaX = mouseMovePosition.x - this._mouseDownPosition.x;
			let deltaY = mouseMovePosition.y - this._mouseDownPosition.y;
			let nDeltaX = deltaX / this._renderCanvas.clientWidth;
			let nDeltaY = deltaY / this._renderCanvas.clientHeight;

			this._phi = this._mouseDownPhi + nDeltaX;
			this._theta = this._mouseDownTheta + nDeltaY;
			this.clampTheta();
		}
	}

	invertTheta(){
		this._theta = -this._theta;
	}

	clampTheta(){
		if (this._theta > Math.PI / 2.0 - Math.PI / 12.0)
			this._theta = Math.PI / 2.0 - Math.PI / 12.0;
		if (this._theta < -Math.PI / 2.0 + Math.PI / 12.0)
			this._theta = -Math.PI / 2.0 + Math.PI / 12.0;
	}

	clampRadius(){
		if (this._radius < 0) this._radius = 0;
	}

	onKeyDown(event){
		if (event.keyCode == '38'){ // up
			this._radius -= 1.0;
			this.clampRadius();
		} 
		else if (event.keyCode == '40'){ // down
			this._radius += 1.0;
		}
	}

	calculatePosition() {
		let position = GLMATRIX.vec3.fromValues(
			this._radius * Math.cos(this._phi) * Math.cos(this._theta),
			this._radius * Math.sin(this._theta),
			this._radius * Math.sin(this._phi) * Math.cos(this._theta)
		);
		return position;
	}

	render(programID) {
		let viewMatrix = GLMATRIX.mat4.create();

		GLMATRIX.mat4.lookAt(viewMatrix, this.calculatePosition(), GLMATRIX.vec3.create(), GLMATRIX.vec3.fromValues(0,1,0));

		var viewMatUniform = GL.getUniformLocation(programID, "V");
		GL.uniformMatrix4fv(viewMatUniform, false, viewMatrix);

		let perspectiveMatrix = GLMATRIX.mat4.create();
		GLMATRIX.mat4.perspective(perspectiveMatrix, 45, 4 / 3.0, 0.1, 1000.0);

		var perspectiveMatUniform = GL.getUniformLocation(programID, "P");
	  	GL.uniformMatrix4fv(perspectiveMatUniform, false, perspectiveMatrix);
	}

	setPosition(somePosition){
		this._position = GLMATRIX.vec3.clone(somePosition);
	}

	setForward(someVector){
		let right = this.calculateRight();
		this._forward = GLMATRIX.vec3.clone(someVector);
		GLMATRIX.vec3.cross(this._up, right, this._forward);
		console.log(this._forward, this._up);
	}


}

export default Camera;