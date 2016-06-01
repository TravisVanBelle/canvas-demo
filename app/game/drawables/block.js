import Instance from '../instance';
import Consts from '../consts';

export default class Block {
	// i: Position from the top
	// j: Position from the left
	// width: The width of the block
	// height: The height of the block
	constructor(i, j, width, height){
		this.stage = Instance.getStage();

		this.size = {
			width: width,
			height: height
		};

		this.bounds = {
			top: i*this.size.height,
			bottom: (i+1)*this.size.height,

			left: j*this.size.width,
			right: (j+1)*this.size.width
		};

		this.element = new createjs.Shape();
	}

	draw(){
		let leftOffset = 0;
		let topOffset = 0;

		this.element.graphics.beginFill("#0E1A23").drawRect(
			this.bounds.left*1 - leftOffset,
			this.bounds.top*1 - topOffset,
			this.size.width*1,
			this.size.height*1);

		this.stage.addChild(this.element);
	}

	checkCollision(x, y){
		let r = Consts.playerRadius;

		// Center of circle
		if (this.arePointsInside(x, y)) return true;

		// Left, top, right, bottom
		if (this.arePointsInside(x-r, y)) return true;
		if (this.arePointsInside(x, y-r)) return true;
		if (this.arePointsInside(x+r, y)) return true;
		if (this.arePointsInside(x, y+r)) return true;

		// TL, TR, BR, BL
		if (this.arePointsInside(x-r, y-r)) return true;
		if (this.arePointsInside(x+r, y-r)) return true;
		if (this.arePointsInside(x+r, y+r)) return true;
		if (this.arePointsInside(x-r, y+r)) return true;

		return false;
	}

	arePointsInside(x, y){

		return (x >= this.bounds.left && x <= this.bounds.right &&
			y >= this.bounds.top && y <= this.bounds.bottom);
	}
}