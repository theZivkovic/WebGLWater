import Program from './Program';
import Mesh from './Mesh';
import GLMATRIX from '../bower_components/gl-matrix/dist/gl-matrix';
import {GL, initializeWebGL} from './GL';
import Texture from './Texture';

class Application {

	constructor(renderCanvas){
		console.log("Application started!");
		this._renderCanvas = renderCanvas;
		this._program = null;
		this._waterMesh = null;
		this._dudvMapTexture = null;
		this.initialize();
	}

	initialize() {
		initializeWebGL(this._renderCanvas);
		this.initializeRenderingBits();
		this.initializeProgram();
		this.initializeMeshes();
		this.initializeTextures();
		this.fireRenderLoop();
	}

	initializeRenderingBits() {
		GL.clearColor(0.0, 0.0, 0.0, 1.0);
		GL.enable(GL.DEPTH_TEST);
		GL.depthFunc(GL.LEQUAL);
		GL.clear(GL.COLOR_BUFFER_BIT | GL.DEPTH_BUFFER_BIT);
	}

	initializeProgram() {
		this._program = new Program();
		this._program.addShaderDuo('default');
	}

	initializeMeshes() {
		this._waterMesh = new Mesh(this._program.id);
		this._waterMesh.setVertexBuffer([
		    -20.0, 0.0, -20.0,
		    20.0, 0.0, -20.0,
		    20.0, 0.0, 20.0,
		    -20.0, 0.0, 20.0
		]);

		this._waterMesh.setIndexBuffer([
			0, 1, 3, 1, 2, 3
		]);

		this._waterMesh.setUVBuffer([
			0.0, 0.0,
			1.0, 0.0,
			1.0, 1.0,
			0.0, 1.0
		]);
	}

	initializeTextures(){
		this._dudvMapTexture = new Texture("waterDUDVMap", this._program.id);
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
		  this._dudvMapTexture.render();
		  this._waterMesh.render();
		 
		  requestAnimationFrame(render);
		}
		requestAnimationFrame(render);
	}

}

export default Application;