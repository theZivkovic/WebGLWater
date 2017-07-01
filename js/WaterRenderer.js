import {GL} from './GL';
import ColoredCubesRenderer from './ColoredCubesRenderer';
import SkyboxRenderer from './SkyboxRenderer';
import PoolSidesRenderer from './PoolSidesRenderer';
import Program from './Program';
import PlaneMesh from './PlaneMesh';
import GLMATRIX from '../bower_components/gl-matrix/dist/gl-matrix';
import Texture from './Texture';

class WaterRenderer extends Program {

	constructor(canvasWidth, canvasHeight) {
		super();
		this.initialize();
		this._canvasWidth = canvasWidth;
		this._canvasHeight = canvasHeight;
		let reflectionFrameBufferResult = this.setupFramebuffer();
		this._reflectionFramebuffer = reflectionFrameBufferResult.framebuffer;
		this._reflectionTexture = reflectionFrameBufferResult.renderTexture;
		let refractionFrameBufferResult = this.setupFramebuffer();
		this._refractionFramebuffer = refractionFrameBufferResult.framebuffer;
		this._refractionTexture = refractionFrameBufferResult.renderTexture;
		this._dudvMap = new Texture("waterDUDVMap", 2);
		this._waterNormalMap = new Texture("waterNormalMap", 3);	
		this._waterMoveFactor = 0.0;
	}

	initialize() {
		this.addShaderDuo("waterShader");
		this.enableVertexPositionAttribute();

		this._coloredCubesRenderer = new ColoredCubesRenderer();
		this._skyboxRenderer = new SkyboxRenderer();
		this._poolSidesRenderer = new PoolSidesRenderer();
		this.initializeRenderingBits();
		this._waterPlane = new PlaneMesh(GLMATRIX.vec3.fromValues(0,0,0), GLMATRIX.vec3.fromValues(1, 0, 0), GLMATRIX.vec3.fromValues(0,1,0), 30.0);
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

		let framebuffer = GL.createFramebuffer();
		GL.bindFramebuffer(GL.FRAMEBUFFER, framebuffer);
		framebuffer.width = this._canvasWidth;
		framebuffer.height = this._canvasHeight;

		let renderTexture = GL.createTexture();
		GL.bindTexture(GL.TEXTURE_2D, renderTexture);
		GL.texImage2D(GL.TEXTURE_2D, 0, GL.RGBA, framebuffer.width, framebuffer.height, 0, GL.RGBA, GL.UNSIGNED_BYTE, null);
		GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_MAG_FILTER, GL.LINEAR);
    	GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_MIN_FILTER, GL.LINEAR);
    	GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_WRAP_S, GL.CLAMP_TO_EDGE);
    	GL.texParameteri(GL.TEXTURE_2D, GL.TEXTURE_WRAP_T, GL.CLAMP_TO_EDGE);

		let depthBuffer = GL.createRenderbuffer();
		GL.bindRenderbuffer(GL.RENDERBUFFER, depthBuffer);
		GL.renderbufferStorage(GL.RENDERBUFFER, GL.DEPTH_COMPONENT16, framebuffer.width, framebuffer.height);

		GL.framebufferTexture2D(GL.FRAMEBUFFER, GL.COLOR_ATTACHMENT0, GL.TEXTURE_2D, renderTexture, 0);
		GL.framebufferRenderbuffer(GL.FRAMEBUFFER, GL.DEPTH_ATTACHMENT, GL.RENDERBUFFER, depthBuffer);

		GL.bindTexture(GL.TEXTURE_2D, null);
    	GL.bindRenderbuffer(GL.RENDERBUFFER, null);
    	GL.bindFramebuffer(GL.FRAMEBUFFER, null);

    	return {
    		framebuffer, renderTexture
    	};
	}

	render(camera) {
		
		this._waterMoveFactor += 0.0005;
		this._waterMoveFactor %= 1;

		GL.bindFramebuffer(GL.FRAMEBUFFER, this._reflectionFramebuffer);
			GL.clear(GL.COLOR_BUFFER_BIT | GL.DEPTH_BUFFER_BIT);
			camera.invertTheta();
			this._coloredCubesRenderer.preRender(camera);
			this._coloredCubesRenderer.render();
			this._skyboxRenderer.preRender(camera);
			this._skyboxRenderer.render();
			//this._poolSidesRenderer.preRender(camera);
			//this._poolSidesRenderer.render();
		GL.bindFramebuffer(GL.FRAMEBUFFER, null);

		GL.bindFramebuffer(GL.FRAMEBUFFER, this._refractionFramebuffer);
			GL.clear(GL.COLOR_BUFFER_BIT | GL.DEPTH_BUFFER_BIT);
			camera.invertTheta();
			this._coloredCubesRenderer.preRender(camera);
			this._coloredCubesRenderer.render();
			//this._skyboxRenderer.preRender(camera);
			//this._skyboxRenderer.render();
			this._poolSidesRenderer.preRender(camera);
			this._poolSidesRenderer.render();
		GL.bindFramebuffer(GL.FRAMEBUFFER, null);

		GL.useProgram(this.id);
		camera.render(this.id);
		GL.activeTexture(GL.TEXTURE0);
		GL.bindTexture(GL.TEXTURE_2D, this._reflectionTexture);
		GL.uniform1i(GL.getUniformLocation(this.id, "reflectionTexture"), 0);
		
		GL.activeTexture(GL.TEXTURE1);
		GL.bindTexture(GL.TEXTURE_2D, this._refractionTexture);
		GL.uniform1i(GL.getUniformLocation(this.id, "refractionTexture"), 1);

		GL.uniform1f(GL.getUniformLocation(this.id, "waterMoveFactor"), this._waterMoveFactor);

		let normalizedCameraVector = GLMATRIX.vec3.fromValues(0,0,0);
		GLMATRIX.vec3.normalize(normalizedCameraVector, camera.calculatePosition())
		let cameraToWaterAngle = GLMATRIX.vec3.dot(GLMATRIX.vec3.fromValues(0, 1, 0), normalizedCameraVector);
		let absCameraToWaterAngle = Math.abs(cameraToWaterAngle);
		let relectionRefractionFactor = absCameraToWaterAngle;

		GL.uniform3fv(GL.getUniformLocation(this.id, "cameraPosition"), camera.calculatePosition());
		GL.uniform3fv(GL.getUniformLocation(this.id, "lightPosition"), GLMATRIX.vec3.fromValues(0, 50, 50));

		GL.uniform1f(GL.getUniformLocation(this.id, "relectionRefractionFactor"), relectionRefractionFactor);
		this._dudvMap.render(this.id);
		this._waterPlane.render(this.id);
		this._waterNormalMap.render(this.id);
	}
}

export default WaterRenderer;