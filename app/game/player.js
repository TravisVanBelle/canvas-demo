import Instance from './instance'

export default class Player {
	constructor() {
		this.color = '#eee';
		this.x = 100;
		this.y = 100;

		this.stage = Instance.getStage();

		this.element = new createjs.Shape();
	}

	draw() {
		this.element.graphics.beginFill(this.color).drawCircle(
			this.x, this.y, 15);

		this.stage.addChild(this.element);
	}

	move(x, y){
		this.element.x = x;
		this.element.y = y;
	}
}