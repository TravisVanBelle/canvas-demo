import Instance from './instance';
import Consts from './consts';

export default class Other {
	constructor(uuid, x, y) {
		this.color = '#eee';
		this.x = 0;
		this.y = 0;

		this.uuid = uuid;

		this.stage = Instance.getStage();

		this.element = new createjs.Shape();
	}

	draw() {
		this.element.graphics.beginFill(this.color).drawCircle(
			0, 0, Consts.playerRadius);

		this.element.x += this.x;
		this.element.y += this.y;

		this.stage.addChild(this.element);

		this.stage.update();
	}

	setLocation(x, y){
		this.element.x = x;
		this.element.y = y;

		this.x = x;
		this.y = y;

		this.stage.update();
	}

}