class Quadtree {
	constructor(bounds, max_objects, max_levels, level) {
		this.max_objects = max_objects || 10;
		this.max_levels = max_levels || 4;

		this.level = level || 0;
		this.bounds = bounds;

		this.objects = [];
		this.nodes = [];
	}

	//将整体分割为四个象限
	split() {
		let nextLevel = this.level + 1,
			subWidth = Math.round(this.bounds.width / 2),
			subHeight = Math.round(this.bounds.height / 2),
			x = Math.round(this.bounds.x),
			y = Math.round(this.bounds.y);

		//右下
		this.nodes[0] = new Quadtree(
			{
				x: x + subWidth,
				y: y,
				width: subWidth,
				height: subHeight
			},
			this.max_objects,
			this.max_levels,
			nextLevel
		);

		//左下
		this.nodes[1] = new Quadtree(
			{
				x: x,
				y: y,
				width: subWidth,
				height: subHeight
			},
			this.max_objects,
			this.max_levels,
			nextLevel
		);

		//左上
		this.nodes[2] = new Quadtree(
			{
				x: x,
				y: y + subHeight,
				width: subWidth,
				height: subHeight
			},
			this.max_objects,
			this.max_levels,
			nextLevel
		);

		//右上
		this.nodes[3] = new Quadtree(
			{
				x: x + subWidth,
				y: y + subHeight,
				width: subWidth,
				height: subHeight
			},
			this.max_objects,
			this.max_levels,
			nextLevel
		);
	}

	//获取物体在哪个象限
	getIndex(model) {
		let extent = model.extent;

		let minPt = extent.minPoint;
		let maxPt = extent.maxPoint;

		let verticalMidpoint = this.bounds.x + this.bounds.width / 2;
		let horizontalMidpoint = this.bounds.y + this.bounds.height / 2;

		//model可以完全适合顶部象限
		let topQuadrant = minPt.y < horizontalMidpoint && maxPt.y < horizontalMidpoint;
		//model可以完全适合底部象限
		let bottomQuadrant = minPt.y > horizontalMidpoint;

		//model可以完全适合左边象限
		if (minPt.x < verticalMidpoint && maxPt.x < verticalMidpoint) {
			if (topQuadrant) {
				index = 1;
			} else if (bottomQuadrant) {
				index = 2;
			}

			//model可以完全适合右边象限
		} else if (minPt.x > verticalMidpoint) {
			if (topQuadrant) {
				index = 0;
			} else if (bottomQuadrant) {
				index = 3;
			}
		}

		return index;
	}

	retrieve(model) {
		let index = this.getIndex(model),
			returnObjects = this.objects;

		//if we have subnodes ...
		if (typeof this.nodes[0] !== "undefined") {
			//if pRect fits into a subnode ..
			if (index !== -1) {
				returnObjects = returnObjects.concat(this.nodes[index].retrieve(model));

				//if pRect does not fit into a subnode, check it against all subnodes
			} else {
				for (let i = 0; i < this.nodes.length; i = i + 1) {
					returnObjects = returnObjects.concat(this.nodes[i].retrieve(model));
				}
			}
		}

		return returnObjects;
	}

	clear() {
		this.objects = [];

		for (let i = 0; i < this.nodes.length; i = i + 1) {
			if (typeof this.nodes[i] !== "undefined") {
				this.nodes[i].clear();
			}
		}

		this.nodes = [];
	}
}

class EntityStore {
	constructor() {}
}
