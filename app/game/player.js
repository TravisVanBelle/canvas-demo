import Instance from './instance';
import Consts from './consts';

export default class Player {
	constructor() {
		this.color = '#eee';
		this.x = 100;
		this.y = 100;

		this.xVelocity = Consts.movementSpeedStart;
		this.yVelocity = Consts.movementSpeedStart;

		this.stage = Instance.getStage();

		this.element = new createjs.Shape();
	}

	draw() {
		this.element.graphics.beginFill(this.color).drawCircle(
			0, 0, Consts.playerRadius);

		this.element.x += this.x;
		this.element.y += this.y;

		this.stage.addChild(this.element);
	}

	// x: -1 for move left, 1 for move right
	// y: -1 for move up, 1 for move down
	move(x, y){
		let xTo = this.element.x + x * this.xVelocity;
		let yTo = this.element.y + y * this.yVelocity;

		let collision = Instance.getInstance().map.checkMovementCollision(xTo, yTo);

		if (collision) {
			if (x === 1){
				for (let i=x*this.xVelocity-1; i>-1; i--){
					xTo = this.element.x + i;

					collision = Instance.getInstance().map.checkMovementCollision(xTo, yTo);

					if (!collision) break;

					if (i === 1) return;
				}
			}
			if (x === -1){

				for (let i=x*this.xVelocity+1; i<1; i++){
					xTo = this.element.x + i;

					collision = Instance.getInstance().map.checkMovementCollision(xTo, yTo);

					if (!collision) break;

					if (i === -1) return;
				}
			}
			if (y === 1){
				for (let i=y*this.yVelocity-1; i>-1; i--){
					yTo = this.element.y + i;

					collision = Instance.getInstance().map.checkMovementCollision(xTo, yTo);

					if (!collision) break;

					if (i === 1) return;
				}
			}
			if (y === -1){
				for (let i=y*this.yVelocity+1; i<1; i++){
					yTo = this.element.y + i;

					collision = Instance.getInstance().map.checkMovementCollision(xTo, yTo);

					if (!collision) break;

					if (i === -1) return;
				}
			}
		}

		this.element.x = xTo;
		this.element.y = yTo;

		this.x = this.element.x;
		this.y = this.element.y;

		if (x !== 0) this.xVelocity = Math.min(this.xVelocity + Consts.acceleration,
			Consts.movementSpeedEnd);

		if (y !== 0) this.yVelocity = Math.min(this.yVelocity + Consts.acceleration,
			Consts.movementSpeedEnd);

	}

	resetXVelocity() {
		this.xVelocity = Consts.movementSpeedStart;
	}

	resetYVelocity() {
		this.yVelocity = Consts.movementSpeedStart;
	}

}