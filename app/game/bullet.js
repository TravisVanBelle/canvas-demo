import PhysicsManager from './physicsManager';

export default class Bullet {
	constructor(posX, posY, dirX, dirY) {
		let diffX = dirX - posX;
		let diffY = dirY - posY;

		let percentX = diffX / (Math.abs(diffX) + Math.abs(diffY));
		let percentY = diffY / (Math.abs(diffX) + Math.abs(diffY));

		this.element = Physics.body('non-rotating-circle', {
			x: posX,
			y: posY,
			radius: 2,
			restitution: 0,
			cof: 0,
			mass: 0.2,
			styles: {
				fillStyle: '#000000',
			},
		});

		this.element.accelerate(
			new Physics.vector({x: percentX, y: percentY}));
	}

	draw() {
		PhysicsManager.getPM().world.add(this.element);
	}

	undraw() {
		PhysicsManager.getPM().world.remove(this.element);
	}
}