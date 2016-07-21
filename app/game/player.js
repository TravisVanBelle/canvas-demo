import Instance from './instance';
import PhysicsManager from './physicsManager';
import Consts from './consts';

export default class Player {
	constructor() {
		this.element = Physics.body('non-rotating-circle', {
			x: 100,
			y: 100,
			radius: 15,
			styles: {
				fillStyle: '#555555',
			},
		});
	}

	draw() {
		PhysicsManager.getPM().world.add(this.element);
	}



}