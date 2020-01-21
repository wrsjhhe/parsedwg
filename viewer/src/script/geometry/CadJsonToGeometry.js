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
					let drawData = polyline.drawData();

					this.geometries.push(drawData);
					/* let points = item.points;
					let closed = item.closed;
					let length = points.length;

					let vertices = [];
					for (let pt of points) {
						let tranPt = this.transformVertex({ x: pt.x, y: pt.y, z: 0 });
						vertices.push(tranPt.x, tranPt.y, tranPt.z);
					}

					if (closed) {
						let tranPt = this.transformVertex({ x: points[0].x, y: points[0].y, z: 0 });
						vertices.push(tranPt.x, tranPt.y, tranPt.z);
					}

					let lineGeometry = new THREE.BufferGeometry();
					lineGeometry.addAttribute("position", new THREE.Float32BufferAttribute(vertices, 3));

					let material = new THREE.LineBasicMaterial({ color: 0xffffff });
					let line = new THREE.Line(lineGeometry, material);
					this.geometries.push(line); */

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
