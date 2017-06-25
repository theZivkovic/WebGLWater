import ModelRenderingInfo from './ModelRenderingInfo';
import {GL} from './GL';

class Renderer {

	constructor(){

	}

	render(modelRenderingInfo) {
		GL.bindVertexArray(modelRenderingInfo.getVAOID());
		GL.enableVertexAttribArray(0);
		GL.drawElements(GL.TRIANGLES, modelRenderingInfo.getIndicesCount(), GL.UNSIGNED_INT, 0);
		GL.disableVertexAttribArray(0);
		GL.bindVertexArray(null);
	}
}

export default Renderer;