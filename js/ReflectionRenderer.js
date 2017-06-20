import {GL} from './GL';
import ColoredCubesRenderer from './ColoredCubesRenderer';
import SkyboxRenderer from './SkyboxRenderer';
import PoolSidesRenderer from './PoolSidesRenderer';
import Program from './Program';
import PlaneMesh from './PlaneMesh';
import GLMATRIX from '../bower_components/gl-matrix/dist/gl-matrix';

class ReflectionRenderer extends Program {

	constructor() {
		super();
		this.initialize();
		this.setupFramebuffer();
	}

	initialize() {
		this.addShaderDuo("waterShader");
		this.enableVertexPositionAttribute();

		this._coloredCubesRenderer = new ColoredCubesRenderer();
		this._skyboxRenderer = new SkyboxRenderer();
		this._poolSidesRenderer = new PoolSidesRenderer();
		this.initializeRenderingBits();
		this._waterPlane = new PlaneMesh(GLMATRIX.vec3.fromValues(0,-5,0), GLMATRIX.vec3.fromValues(1, 0, 0), GLMATRIX.vec3.fromValues(0,1,0), 30.0);
	}

	initializeRenderingBits() {
		GL.clearColor(0.0, 0.0, 0.0, 1.0);
		GL.enable(GL.DEPTH_TEST);
		GL.depthFunc(GL.LEQUAL);
		GL.clear(GL.COLOR_BUFFER_BIT | GL.DEPTH_BUFFER_BIT);
		GL.enable(GL.CULL_FACE);
		GL.cullFace(GL.FRONT);
	}

	setupFramebuffer(){

		this._framebuffer = GL.createFramebuffer();
		GL.bindFramebuffer(GL.FRAMEBUFFER, this._framebuffer);
		this._framebuffer.width = 512;
		this._framebuffer.height = 512;

		this._renderTexture = GL.createTexture();
		GL.bindTexture(GL.TEXTURE_2D, this._renderTexture);
		GL.texImage2D(GL.TEXTURE_2D, 0, GL.RGBA, this._framebuffer.width, this._framebuffer.height, 0, GL.RGBA, GL.UNSIGNED_BYTE, null);
		GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_MAG_FILTER, GL.LINEAR);
    	GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_MIN_FILTER, GL.LINEAR);
    	GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_WRAP_S, GL.CLAMP_TO_EDGE);
    	GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_WRAP_T, GL.CLAMP_TO_EDGE);

		let depthBuffer = GL.createRenderbuffer();
		GL.bindRenderbuffer(GL.RENDERBUFFER, depthBuffer);
		GL.renderbufferStorage(GL.RENDERBUFFER, GL.DEPTH_COMPONENT16, this._framebuffer.width, this._framebuffer.height);

		GL.framebufferTexture2D(GL.FRAMEBUFFER, GL.COLOR_ATTACHMENT0, GL.TEXTURE_2D, this._renderTexture, 0);
		GL.framebufferRenderbuffer(GL.FRAMEBUFFER, GL.DEPTH_ATTACHMENT, GL.RENDERBUFFER, depthBuffer);

		GL.bindTexture(GL.TEXTURE_2D, null);
    	GL.bindRenderbuffer(GL.RENDERBUFFER, null);
    	GL.bindFramebuffer(GL.FRAMEBUFFER, null);
	}

	render(camera) {
		
		GL.bindFramebuffer(GL.FRAMEBUFFER, this._framebuffer);
		GL.clear(GL.COLOR_BUFFER_BIT | GL.DEPTH_BUFFER_BIT);
		camera.invertTheta();
		this._coloredCubesRenderer.preRender(camera);
		this._coloredCubesRenderer.render();
		this._skyboxRenderer.preRender(camera);
		this._skyboxRenderer.render();
		this._poolSidesRenderer.preRender(camera);
		this._poolSidesRenderer.render();
		GL.bindFramebuffer(GL.FRAMEBUFFER, null);

		GL.useProgram(this.id);
		camera.invertTheta();
		camera.render(this.id);
		GL.activeTexture(GL.TEXTURE0);
		GL.bindTexture(GL.TEXTURE_2D, this._renderTexture);
		GL.uniform1i(GL.getUniformLocation(this.id, "reflectionTexture"), 0);
		this._waterPlane.render(this.id);
	}



}

export default ReflectionRenderer;