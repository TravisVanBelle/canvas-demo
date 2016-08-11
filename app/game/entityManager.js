import Player from './player';
import Bullet from './bullet';
import Instance from './instance';
import Other from './other';
import GMap from './gmap';
import Consts from './consts';

/**
 * Manages the entities in the game (Player, Others, Bullets, etc.).
 */
export default class EntityManager {
	constructor() {
		this.player = null;
		this.others = [];
		this.bullets = [];
	}

	/**
	 * Applies friction to relevant entities.
	 */
	applyFriction() {
		this.player.element.state.vel.set(this.player.element.state.vel.x * Consts.friction,
				this.player.element.state.vel.y * Consts.friction);

		this.others.forEach((other) => {
			other.element.state.vel.set(other.element.state.vel.x * Consts.friction,
					other.element.state.vel.y * Consts.friction);
		});
	}

	/**
	 * Adds a player character to the game at a random spawn location.
	 */
	createPlayer() {
		let spawns = Instance.getInstance().map.getSpawns();
		let spawnNum = Math.floor(Math.random() * spawns.length);

		this.player = new Player(spawns[spawnNum][1]*50 + 25, spawns[spawnNum][0]*50 + 25);
		this.player.draw();
	}

	/**
	 * Creates a bullet with the given data.
	 *
	 * px: The x position of the bullet.
	 * py: The y position of the bullet.
	 * x: The x direction of the bullet.
	 * y: The y direction of the bullet.
	 */
	createBullet(px, py, x, y) {
		let b = new Bullet(px, py, x, y);

		this.bullets[b.element.uid] = b;
		b.draw();

		return b;
	}

	/**
	 * Checks whether or not the given uid corresponds to a bullet.
	 *
	 * uid: The unique element identifier to check.
	 */
	isBullet(uid) {
		return !!this.bullets[uid];
	}

	/**
	 * Removes a bullet from the game.
	 *
	 * uid: The unique element identifier to remove.
	 */
	removeBullet(uid) {
		this.bullets[uid].undraw();
		delete this.bullets[uid];
	}

	/**
	 * Returns the player object.
	 */
	getPlayer() {
		return this.player;
	}

	/**
	 * Returns the player position.
	 */
	getPlayerPosition() {
		return {
			x: this.player.element.state.pos.x,
			y: this.player.element.state.pos.y
		};
	}

	/**
	 * Accelerates the player in the given direction.
	 *
	 * x: The x direction to accelerate the player. (One of -1, 0, 1).
	 * y: The y direction to accelerate the player. (One of -1, 0, 1).
	 */
	move(x, y) {
		this.player.element.accelerate(
				new Physics.vector({x: (x/200)*Consts.acceleration,
				y: (y/200)*Consts.acceleration}));
	}

	/**
	 * Sets an Other to the given location.
	 *
	 * uuid: The unique identifier of the Other to move.
	 * x: The x position to move the Other.
	 * y: The y position to move the Other.
	 */
	setOtherLocation(uuid, x, y){
		this.others.forEach((other) => {
			if (other.uuid === uuid){
				other.setLocation(x, y);
			}
		});
	}

	/**
	 * Removes an Other from the game.
	 *
	 * uuid: the unique identifier of the Other to remove.
	 */
	removeOther(uuid) {
		this.others = this.others.filter((other) => {
			if (other.uuid === uuid) {
				other.undraw();
				return false;
			}

			return true;
		});
	}

	/**
	 * Creates a new Other for the game.
	 *
	 * uuid: The unique identifier of the Other to create.
	 * x: The x position of the other.
	 * y: The y position of the other.
	 */
	createOther(uuid, x, y) {
		let newOther = new Other(uuid, x, y);
		newOther.draw();
		newOther.setLocation(x, y);

		this.others.push(newOther);
	}
}
