import {GL} from './GL'
import GLMATRIX from '../bower_components/gl-matrix/dist/gl-matrix';

class Camera {
	
	constructor(position, forward, up) {
		this._position = position
		this._forward = forward;
		this._up = up;

		this._mouseDownPosition = null;
		this._renderCanvas = null;
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
		this._mouseDownForward = GLMATRIX.vec3.clone(this._forward);
		this._mouseDownUp = GLMATRIX.vec3.clone(this._up);
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

			let rotationAroundUp = GLMATRIX.mat4.create();
			let rotationAngleForForward = nDeltaX * Math.PI / 2.0;
			GLMATRIX.mat4.fromRotation(rotationAroundUp, rotationAngleForForward, this._up);
			GLMATRIX.vec3.transformMat4(this._forward, this._mouseDownForward, rotationAroundUp);

			let rotationAroundRight = GLMATRIX.mat4.create();
			let rotationAngleForUp = nDeltaY * Math.PI / 2.0;
			let rightVec = this.calculateRight();
			GLMATRIX.mat4.fromRotation(rotationAroundRight, rotationAngleForUp, rightVec);
			GLMATRIX.vec3.transformMat4(this._up, this._mouseDownUp, rotationAroundRight);
			GLMATRIX.vec3.cross(this._forward, this._up, rightVec);
		}
	}

	onKeyDown(event){
		if (event.keyCode == '38'){ // up
			GLMATRIX.vec3.add(this._position, this._position, this._forward);
		} 
		else if (event.keyCode == '40'){ // down
			let backVec = GLMATRIX.vec3.create();
			GLMATRIX.vec3.negate(backVec, this._forward);
			GLMATRIX.vec3.add(this._position, this._position, backVec);
		}
	}

	calculateRight() {
		let rightVec = GLMATRIX.vec3.create();
		GLMATRIX.vec3.cross(rightVec, this._forward, this._up );
		GLMATRIX.vec3.normalize(rightVec, rightVec);
		return rightVec;
	}

	render(programID) {
		let viewMatrix = GLMATRIX.mat4.create();
		let target = GLMATRIX.vec3.create();
		GLMATRIX.vec3.add(target, this._position, this._forward);
		GLMATRIX.mat4.lookAt(viewMatrix, this._position, target, this._up);

		var viewMatUniform = GL.getUniformLocation(programID, "V");
		GL.uniformMatrix4fv(viewMatUniform, false, viewMatrix);

		let perspectiveMatrix = GLMATRIX.mat4.create();
		GLMATRIX.mat4.perspective(perspectiveMatrix, 45, 4 / 3.0, 0.1, 200.0);

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