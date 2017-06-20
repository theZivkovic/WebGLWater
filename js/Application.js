import Program from './Program';
import Mesh from './Mesh';
import GLMATRIX from '../bower_components/gl-matrix/dist/gl-matrix';
import {GL, initializeWebGL} from './GL';
import Texture from './Texture';
import PlaneMesh from './PlaneMesh';
import Camera from './Camera';
import ColoredCubesRenderer from './ColoredCubesRenderer';
import SkyboxRenderer from './SkyboxRenderer';
import PoolSidesRenderer from './PoolSidesRenderer';
import ReflectionRenderer from './ReflectionRenderer';

class Application {

	constructor(renderCanvas){
		console.log("Application started!");
		this._renderCanvas = renderCanvas;
		this._camera = null;
		this.initialize();
	}

	initialize() {
		initializeWebGL(this._renderCanvas);
		this.initializeRenderingBits();
		this.initializeCamera();
		this._coloredCubesRenderer = new ColoredCubesRenderer();
		this._skyboxRenderer = new SkyboxRenderer();
		this._poolSidesRenderer = new PoolSidesRenderer();
		this._reflectionRenderer = new ReflectionRenderer();

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

	// initializeTextureFramebuffer() {

	// 	this._firstPassFramebuffer = GL.createFramebuffer();
	// 	GL.bindFramebuffer(GL.FRAMEBUFFER, this._firstPassFramebuffer);
	// 	this._firstPassFramebuffer.width = 512;
	// 	this._firstPassFramebuffer.height = 512;

	// 	this._firstPassRenderTexture = GL.createTexture();
	// 	GL.bindTexture(GL.TEXTURE_2D, this._firstPassRenderTexture);
	// 	GL.texImage2D(GL.TEXTURE_2D, 0, GL.RGBA, this._firstPassFramebuffer.width, this._firstPassFramebuffer.height, 0, GL.RGBA, GL.UNSIGNED_BYTE, null);
	// 	GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_MAG_FILTER, GL.LINEAR);
 //    	GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_MIN_FILTER, GL.LINEAR);
 //    	GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_WRAP_S, GL.CLAMP_TO_EDGE);
 //    	GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_WRAP_T, GL.CLAMP_TO_EDGE);

	// 	let depthBuffer = GL.createRenderbuffer();
	// 	GL.bindRenderbuffer(GL.RENDERBUFFER, depthBuffer);
	// 	GL.renderbufferStorage(GL.RENDERBUFFER, GL.DEPTH_COMPONENT16, this._firstPassFramebuffer.width, this._firstPassFramebuffer.height);

	// 	GL.framebufferTexture2D(GL.FRAMEBUFFER, GL.COLOR_ATTACHMENT0, GL.TEXTURE_2D, this._firstPassRenderTexture, 0);
	// 	GL.framebufferRenderbuffer(GL.FRAMEBUFFER, GL.DEPTH_ATTACHMENT, GL.RENDERBUFFER, depthBuffer);

	// 	GL.bindTexture(GL.TEXTURE_2D, null);
 //    	GL.bindRenderbuffer(GL.RENDERBUFFER, null);
 //    	GL.bindFramebuffer(GL.FRAMEBUFFER, null);
	// }

	initializeCamera() {
		this._camera = new Camera(0, 0, 100);
		this._camera.setSourceOfInteraction(this._renderCanvas);
	}

	fireRenderLoop(){

		let render = () => {

			 GL.clear(GL.COLOR_BUFFER_BIT | GL.DEPTH_BUFFER_BIT);
			 this._coloredCubesRenderer.preRender(this._camera);
			 this._coloredCubesRenderer.render();
			 this._skyboxRenderer.preRender(this._camera);
			 this._skyboxRenderer.render();
			 this._poolSidesRenderer.preRender(this._camera);
			 this._poolSidesRenderer.render();
			 this._reflectionRenderer.render(this._camera);
		  	 requestAnimationFrame(render);
		}

		requestAnimationFrame(render);
	}

}

export default Application;