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
import WaterRenderer from './WaterRenderer';

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
		this._waterRenderer = new WaterRenderer();

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
			 this._waterRenderer.render(this._camera);
		  	 requestAnimationFrame(render);
		}

		requestAnimationFrame(render);
	}

}

export default Application;