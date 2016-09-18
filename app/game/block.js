import Instance from './instance';
import PhysicsManager from './physicsManager';
import Consts from './consts';

/**
 * A block on the map.
 */
export default class Block {
	// i: Position from the top.
	// j: Position from the left.
	// width: The width of the block.
	// height: The height of the block.
	constructor(i, j, width, height){
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

		this.element = Physics.body('rectangle', {
			x: this.bounds.left + this.size.width/2,
			y: this.bounds.top + this.size.height/2,
			width: this.size.width+1,
			height: this.size.height,
			styles: {
				fillStyle: '#4E728F'
			},
			treatment: 'kinematic'
		});
	}

	draw(){
		PhysicsManager.getPM().world.add(this.element);
	}
}
