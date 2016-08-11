import Instance from './instance';
import PhysicsManager from './physicsManager';
import Consts from './consts';

/**
 * The main player object.
 */
export default class Player {
	/**
	 * Creates a player object.
	 *
	 * x: The x position of the player.
	 * y: The y position of the player.
	 */
	constructor(x, y) {
		this.element = Physics.body('non-rotating-circle', {
			x: x,
			y: y,
			radius: Consts.playerRadius,
			restitution: Consts.playerRestitution,
			cof: 0,
			mass: 1.0,
			styles: {
				fillStyle: '#555555',
			},
		});
	}

	/**
	 * Adds the player to the game.
	 */
	draw() {
		PhysicsManager.getPM().world.add(this.element);
	}

	/**
	 * Removes the player from the game.
	 */
	undraw() {
		PhysicsManager.getPM().world.remove(this.element);
	}
}