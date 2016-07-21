import Instance from './instance';
import PhysicsManager from './physicsManager';
import Consts from './consts';

export default class Other {
	constructor(uuid, x, y) {
		this.color = '#eee';
		this.x = 0;
		this.y = 0;

		this.uuid = uuid;

		this.element = Physics.body('circle', {
			x: 100,
			y: 100,
			radius: 15,
			styles: {
				fillStyle: '#555555'
			},
		});
	}

	draw() {
		PhysicsManager.getPM().world.add(this.element);
	}

	undraw() {
		PhysicsManager.getPM().world.remove(this.element);
	}

	setLocation(x, y){
		this.element.x = x;
		this.element.y = y;

		this.x = x;
		this.y = y;
	}

}