import PhysicsManager from './physicsManager';

/**
 * A bullet object.
 */
export default class Bullet {
	/**
	 * Creates a bullet, adds it to the game, and accelerates it in
	 * the calculated direction.
	 *
	 * posX: The x position to create the bullet.
	 * posY: The y position to create the bullet.
	 * dirX: The x component of the direction.
	 * dirY: The y component of the direction.
	 */
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

	/**
	 * Adds the bullet to the game.
	 */
	draw() {
		PhysicsManager.getPM().world.add(this.element);
	}

	/**
	 * Removes the bullet from the game.
	 */
	undraw() {
		PhysicsManager.getPM().world.remove(this.element);
	}
}
