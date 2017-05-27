import Program from './Program';
import Mesh from './Mesh';
import GLMATRIX from '../bower_components/gl-matrix/dist/gl-matrix';
import {GL, initializeWebGL} from './GL';
import Texture from './Texture';
import PlaneMesh from './PlaneMesh';

class Application {

	constructor(renderCanvas){
		console.log("Application started!");
		this._renderCanvas = renderCanvas;
		this._program = null;
		this._poolSides = [];
		this._dudvMapTexture = null;
		this._mainTexture = null;
		this._moveFactor = 0;
		this.initialize();
	}

	initialize() {
		initializeWebGL(this._renderCanvas);
		this.initializeRenderingBits();
		this.initializeProgram();
		this.initializeMeshes();
		this.initializeTextureFramebuffer();
		this.initializeTextures();
		this.fireRenderLoop();
	}

	initializeRenderingBits() {
		GL.clearColor(0.0, 0.0, 0.0, 1.0);
		GL.enable(GL.DEPTH_TEST);
		GL.depthFunc(GL.LEQUAL);
		GL.clear(GL.COLOR_BUFFER_BIT | GL.DEPTH_BUFFER_BIT);
		GL.enable(GL.CULL_FACE);
		GL.cullFace(GL.FRONT);
	}

	initializeProgram() {
		this._program = new Program();
		this._program.addShaderDuo('default');
	}

	initializeMeshes() {
		
		// UP
		//this._poolSides.push(new PlaneMesh(GLMATRIX.vec3.fromValues(0,30,0), GLMATRIX.vec3.fromValues(1, 0, 0), GLMATRIX.vec3.fromValues(0,-1,0), 30.0, this._program.id).mesh);
		// DOWN
		this._poolSides.push(new PlaneMesh(GLMATRIX.vec3.fromValues(0,-30,0), GLMATRIX.vec3.fromValues(1, 0, 0), GLMATRIX.vec3.fromValues(0,1,0), 30.0, this._program.id).mesh);
		// RIGHT
		this._poolSides.push(new PlaneMesh(GLMATRIX.vec3.fromValues(30,0,0), GLMATRIX.vec3.fromValues(0, 1, 0), GLMATRIX.vec3.fromValues(-1,0,0), 30.0, this._program.id).mesh);
		// LEFT
		this._poolSides.push(new PlaneMesh(GLMATRIX.vec3.fromValues(-30,0,0), GLMATRIX.vec3.fromValues(0, 1, 0), GLMATRIX.vec3.fromValues(1,0,0), 30.0, this._program.id).mesh);
		// FRONT
		this._poolSides.push(new PlaneMesh(GLMATRIX.vec3.fromValues(0,0,30), GLMATRIX.vec3.fromValues(0, 1, 0), GLMATRIX.vec3.fromValues(0,0,-1), 30.0, this._program.id).mesh);
		// REAR
		this._poolSides.push(new PlaneMesh(GLMATRIX.vec3.fromValues(0,0,-30), GLMATRIX.vec3.fromValues(0, 1, 0), GLMATRIX.vec3.fromValues(0,0,1), 30.0, this._program.id).mesh);

	}

	initializeTextures(){
		this._dudvMapTexture = new Texture("waterDUDVMap", this._program.id, 0);
		this._mainTexture = new Texture("whiteTiles", this._program.id, 1);
	}

	initializeTextureFramebuffer(){
		
	}

	fireRenderLoop(){

		let render = () => {

		  GL.clear(GL.COLOR_BUFFER_BIT | GL.DEPTH_BUFFER_BIT);
		  
		  let perspectiveMatrix = GLMATRIX.mat4.create();
		  GLMATRIX.mat4.perspective(perspectiveMatrix, 45, 4 / 3.0, 0.1, 200.0);
		 
		  var pUniform = GL.getUniformLocation(this._program.id, "uPMatrix");
		  GL.uniformMatrix4fv(pUniform, false, perspectiveMatrix);

		  let mvMatrix = GLMATRIX.mat4.create();
		  let eye = GLMATRIX.vec3.fromValues(50,50,50);
		  let target = GLMATRIX.vec3.fromValues(0,0,0);
		  let up = GLMATRIX.vec3.fromValues(0,1,0);
		  GLMATRIX.mat4.lookAt(mvMatrix, eye, target, up);

		  var mvUniform = GL.getUniformLocation(this._program.id, "uMVMatrix");
		  GL.uniformMatrix4fv(mvUniform, false, mvMatrix);

		  this._moveFactor += 0.0005;
		  this._moveFactor %= 1.0;
		  var moveFactorUniform = GL.getUniformLocation(this._program.id, "moveFactor");
		  GL.uniform1f(moveFactorUniform, this._moveFactor)

		  this._dudvMapTexture.render();
		  this._mainTexture.render();
		  this._poolSides.forEach(poolSide => poolSide.render());
		 
		  requestAnimationFrame(render);
		}
		requestAnimationFrame(render);
	}

}

export default Application;