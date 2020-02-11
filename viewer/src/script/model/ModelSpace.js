class ModelSpace {
	constructor() {
		this.db = [];
	}

	setRenderer(renderer) {
		this.renderer = renderer;
	}

	append(model) {
		this.db.push(model);

		this.renderer.addEntity(model.geometry.drawData());
	}
}

export default new ModelSpace();
