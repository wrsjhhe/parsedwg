import * as THREE from "three";
import Polyline from "./GeoPolyline";
import Point3Array from "./GeoPoint3Array";

export default class CadJsonToGeometry {
	constructor(strJson) {
		this.json = strJson;
		this.geometries = [];
	}

	doParse() {
		let objs = JSON.parse(this.json);
		for (let item of objs) {
			switch (item.type) {
				case "LWPolyline": {
					let pts = item.points;
					let bulges = item.bulges;
					let points = new Point3Array();
					for (let pt of pts) {
						points.append(pt.x, pt.y, 0);
					}
					let polyline = new Polyline(points, bulges);
					polyline.setClosed(item.closed);
					let drawData = polyline.drawData();

					this.geometries.push(drawData);

					break;
				}
				case "Layer": {
					break;
				}
			}
		}
	}

	transformVertex(vertex) {
		return { x: vertex.x, y: vertex.z, z: -vertex.y };
	}

	getGeometries() {
		return this.geometries;
	}
}
