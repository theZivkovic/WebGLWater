let GL = null;

let initializeWebGL = (renderCanvas) => {
	GL = renderCanvas.getContext('webgl') ||
	     renderCanvas.getContext('experimental-webgl');

	if (!GL)
		throw "Unable to initialize webGL. Your browser may not support it";
}

export { GL as GL, initializeWebGL as initializeWebGL }