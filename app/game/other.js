import Instance from './instance';
import PhysicsManager from './physicsManager';
import Consts from './consts';

/**
 * The Other player object.
 */
export default class Other {
	/**
	 * Creates a new Other player and adds it to the game.
	 *
	 * uuid: The unique identifier for the new Other.
	 * x: The x position of the Other.
	 * y: The y position of the Other.
	 */
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

	/**
	 * Adds the Other to the game.
	 */
	draw() {
		PhysicsManager.getPM().world.add(this.element);
	}

	/**
	 * Removes the Other from the game.
	 */
	undraw() {
		PhysicsManager.getPM().world.remove(this.element);
	}

	/**
	 * Sets the location of the Other.
	 *
	 * x: The new x position of the Other.
	 * y: The new y position of the OTher.
	 */
	setLocation(x, y){
		this.element.state.pos.set(x, y);
	}
}
