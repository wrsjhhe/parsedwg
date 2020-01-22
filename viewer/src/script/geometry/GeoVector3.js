class Vector3 {
	constructor(x, y, z) {
		this.x = typeof x === "number" ? x : 0;
		this.y = typeof y === "number" ? y : 0;
		this.z = typeof z === "number" ? z : 0;
	}

	static createByDoublePts(pt1, pt2) {
		let vector = new Vector3();
		vector.setFromPts(pt1, pt2);
		return vector;
	}

	setFromPts(pt1, pt2) {
		this.x = pt2.x - pt1.x;
		this.y = pt2.y - pt1.y;
		this.z = pt2.z - pt1.z;

		return this;
	}

	length() {
		return Math.sqrt(this.dot(this));
	}

	normal() {
		let length = this.length();
		let x = this.x / length;
		let y = this.y / length;
		let z = this.z / length;
		return new Vector3(x, y, z);
	}

	normalize() {
		let length = this.length();
		this.x = this.x / length;
		this.y = this.y / length;
		this.z = this.z / length;

		return this;
	}

	//最小角度
	angleTo(vector3) {
		let cos = (this.x * vector3.x + this.y * vector3.y + this.z * vector3.z) / (this.length() * vector3.length());
		return Math.acos(cos);
	}

	//到vector3的顺时针角度
	clockwiseAngleTo(vector3) {
		let triple_product = Vector3.zAxis.dot(this.cross(vector3));
		let angle = this.angleTo(vector3);

		if (triple_product > 0) {
			angle = 2 * Math.PI - angle;
		}

		return angle;
	}

	//到vector3的逆时针角度
	counterclockwiseAngleTo(vector3) {
		let clockwiseAngle = this.clockwiseAngleTo(vector3);
		return 2 * Math.PI - clockwiseAngle;
	}

	dot(vector3) {
		return this.x * vector3.x + this.y * vector3.y + this.z * vector3.z;
	}

	cross(vector3) {
		return new Vector3(
			this.y * vector3.z - this.z * vector3.y,
			this.z * vector3.x - this.x * vector3.z,
			this.x * vector3.y - this.y * vector3.x
		);
	}
}

Vector3.xAxis = new Vector3(1, 0, 0);
Vector3.yAxis = new Vector3(0, 1, 0);
Vector3.zAxis = new Vector3(0, 0, 1);

export default Vector3;
