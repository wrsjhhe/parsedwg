import Arc from "./GeoArc";
import Line from "./GeoLine";

class Polyline {
	constructor(vertices, bulges) {
		this.vertices = vertices !== (undefined || null) ? vertices : [];
		this.bulges = bulges !== (undefined || null) ? bulges : [];
		this.close = false;
	}

	setClosed(close) {
		this.close = close;
	}

	drawData() {
		let numPoints = this.vertices.size();
		if (numPoints < 2) {
			return null;
		}

		let segs = [];
		for (let i = 0; i < numPoints - 1; ++i) {
			if (typeof this.bulges[i] === "number" && this.bulges[i] !== 0) {
				let arcSeg = new Arc();
				arcSeg.setFromBulge(this.vertices.at(i), this.vertices.at(i + 1), this.bulges[i]);
				segs.push(arcSeg.drawData());
			} else {
				let lineSeg = new Line(this.vertices.at(i), this.vertices.at(i + 1));
				segs.push(lineSeg.drawData());
			}
		}

		if (this.close) {
			if (this.bulges[numPoints - 1] === 0) {
				let lineSeg = new Line(this.vertices.at(this.vertices.size() - 1), this.vertices.at(0));
				segs.push(lineSeg.drawData());
			}
		}
		return segs;
	}
}

export default Polyline;
