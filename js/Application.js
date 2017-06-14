import Program from './Program';
import Mesh from './Mesh';
import GLMATRIX from '../bower_components/gl-matrix/dist/gl-matrix';
import {GL, initializeWebGL} from './GL';
import Texture from './Texture';
import PlaneMesh from './PlaneMesh';
import Camera from './Camera';
import EnvironmentRenderer from './EnvironmentRenderer';

class Application {

	constructor(renderCanvas){
		console.log("Application started!");
		this._renderCanvas = renderCanvas;
		this._camera = null;
		this._firstPassProgram = null;
		this._secondPassProgram = null;
		this._poolSides = [];
		this._dudvMapTexture = null;
		this._mainTexture = null;
		this._moveFactor = 0;
		this._firstPassFramebuffer = null;
		this._secondPassRenderPlane = null;
		this._firstPassRenderTexture = null;
		this._cameraGroundAngle = 0.0;
		this.initialize();
	}

	initialize() {
		initializeWebGL(this._renderCanvas);
		this.initializeRenderingBits();
		//this.initializePrograms();
		//this.initializeMeshes();
		//this.initializeTextureFramebuffer();
		//this.initializeTextures();
		this.initializeCamera();
		this.envrend = new EnvironmentRenderer();
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

	initializePrograms() {
		this._firstPassProgram = new Program();
		this._firstPassProgram.addShaderDuo('default');

		this._secondPassProgram = new Program();
		this._secondPassProgram.addShaderDuo('secondPass');
	}

	initializeMeshes() {
		// DOWN
		this._poolSides.push(new PlaneMesh(GLMATRIX.vec3.fromValues(0,-30,0), GLMATRIX.vec3.fromValues(1, 0, 0), GLMATRIX.vec3.fromValues(0,1,0), 30.0).mesh);
		// RIGHT
		this._poolSides.push(new PlaneMesh(GLMATRIX.vec3.fromValues(30,0,0), GLMATRIX.vec3.fromValues(0, 1, 0), GLMATRIX.vec3.fromValues(-1,0,0), 30.0).mesh);
		// LEFT
		this._poolSides.push(new PlaneMesh(GLMATRIX.vec3.fromValues(-30,0,0), GLMATRIX.vec3.fromValues(0, 1, 0), GLMATRIX.vec3.fromValues(1,0,0), 30.0).mesh);
		// FRONT
		this._poolSides.push(new PlaneMesh(GLMATRIX.vec3.fromValues(0,0,30), GLMATRIX.vec3.fromValues(0, 1, 0), GLMATRIX.vec3.fromValues(0,0,-1), 30.0).mesh);
		// REAR
		this._poolSides.push(new PlaneMesh(GLMATRIX.vec3.fromValues(0,0,-30), GLMATRIX.vec3.fromValues(0, 1, 0), GLMATRIX.vec3.fromValues(0,0,1), 30.0).mesh);

		this._secondPassRenderPlane = new PlaneMesh(GLMATRIX.vec3.fromValues(0,0,0), GLMATRIX.vec3.fromValues(1, 0, 0), GLMATRIX.vec3.fromValues(0,1,0), 30.0).mesh;

	}

	initializeTextures(){
		this._dudvMapTexture = new Texture("waterDUDVMap", 0);
		this._mainTexture = new Texture("whiteTiles", 1);
	}

	initializeTextureFramebuffer() {

		this._firstPassFramebuffer = GL.createFramebuffer();
		GL.bindFramebuffer(GL.FRAMEBUFFER, this._firstPassFramebuffer);
		this._firstPassFramebuffer.width = 512;
		this._firstPassFramebuffer.height = 512;

		this._firstPassRenderTexture = GL.createTexture();
		GL.bindTexture(GL.TEXTURE_2D, this._firstPassRenderTexture);
		GL.texImage2D(GL.TEXTURE_2D, 0, GL.RGBA, this._firstPassFramebuffer.width, this._firstPassFramebuffer.height, 0, GL.RGBA, GL.UNSIGNED_BYTE, null);
		GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_MAG_FILTER, GL.LINEAR);
    	GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_MIN_FILTER, GL.LINEAR);
    	GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_WRAP_S, GL.CLAMP_TO_EDGE);
    	GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_WRAP_T, GL.CLAMP_TO_EDGE);

		let depthBuffer = GL.createRenderbuffer();
		GL.bindRenderbuffer(GL.RENDERBUFFER, depthBuffer);
		GL.renderbufferStorage(GL.RENDERBUFFER, GL.DEPTH_COMPONENT16, this._firstPassFramebuffer.width, this._firstPassFramebuffer.height);

		GL.framebufferTexture2D(GL.FRAMEBUFFER, GL.COLOR_ATTACHMENT0, GL.TEXTURE_2D, this._firstPassRenderTexture, 0);
		GL.framebufferRenderbuffer(GL.FRAMEBUFFER, GL.DEPTH_ATTACHMENT, GL.RENDERBUFFER, depthBuffer);

		GL.bindTexture(GL.TEXTURE_2D, null);
    	GL.bindRenderbuffer(GL.RENDERBUFFER, null);
    	GL.bindFramebuffer(GL.FRAMEBUFFER, null);
	}

	initializeCamera() {
		this._camera = new Camera(0, 0, 100);
		this._camera.setSourceOfInteraction(this._renderCanvas);
	}

	renderFirstPass(programID) {

		  GL.clear(GL.COLOR_BUFFER_BIT | GL.DEPTH_BUFFER_BIT);
		  
		  this._camera.invertTheta();
		  this._camera.render(programID);

		  this._moveFactor += 0.0005;
		  this._moveFactor %= 1.0;
		  var moveFactorUniform = GL.getUniformLocation(programID, "moveFactor");
		  GL.uniform1f(moveFactorUniform, this._moveFactor)

		  this._dudvMapTexture.render(programID);
		  this._mainTexture.render(programID);
		  this._poolSides.forEach(poolSide => poolSide.render(programID));
	}

	fireRenderLoop(){

		let render = () => {

			 GL.clear(GL.COLOR_BUFFER_BIT | GL.DEPTH_BUFFER_BIT);
			 this.envrend.preRender(this._camera);
			 this.envrend.render();
			// this._cameraGroundAngle += 0.01;
			
			// GL.useProgram(this._firstPassProgram.id);
			// GL.bindFramebuffer(GL.FRAMEBUFFER, this._firstPassFramebuffer);
			// this.renderFirstPass(this._firstPassProgram.id);
			// GL.bindFramebuffer(GL.FRAMEBUFFER, null);

			// GL.useProgram(this._secondPassProgram.id);
			// GL.clear(GL.COLOR_BUFFER_BIT | GL.DEPTH_BUFFER_BIT);
			// GL.activeTexture(GL.TEXTURE0);
			// GL.bindTexture(GL.TEXTURE_2D, this._firstPassRenderTexture);
			// GL.uniform1i(GL.getUniformLocation(this._secondPassProgram.id, "firstPassTexture"), 0);

			// this._camera.invertTheta();
			// this._camera.render(this._secondPassProgram.id);
			// this._secondPassRenderPlane.render(this._secondPassProgram.id);
		  	
		  	requestAnimationFrame(render);
		}
		requestAnimationFrame(render);
	}

}

export default Application;