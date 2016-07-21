import Instance from './instance';
import PhysicsManager from './physicsManager';
import Consts from './consts';

export default class Other {
	constructor(uuid, x, y) {
		this.uuid = uuid;

		this.element = Physics.body('non-rotating-circle', {
			x: 100,
			y: 100,
			radius: Consts.playerRadius,
			mass: 1.0,
			restitution: Consts.playerRestitution,
			styles: {
				fillStyle: '#555555',
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
		console.log(x, y);
		//console.log(this.element.state.pos);
		this.element.state.pos.set(x, y);
	}

}