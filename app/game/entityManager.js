import Player from './player';
import Bullet from './bullet';
import Instance from './instance';
import Other from './other';

export default class EntityManager {
	constructor() {
		this.player = null;
		this.others = [];
		this.bullets = [];
	}

	createPlayer() {
		this.player = new Player();
		this.player.draw(100, 100);
	}

	createBullet(x, y) {
		let b = new Bullet(this.player.element.state.pos.x, this.player.element.state.pos.y, x, y);

		this.bullets[b.element.uid] = b;
		b.draw();
	}

	isBullet(uid) {
		return !!this.bullets[uid];
	}

	removeBullet(uid) {
		this.bullets[uid].undraw();
	}

	getPlayer() {
		return this.player;
	}

	getPlayerPosition() {
		return {
			x: this.player.element.state.pos.x,
			y: this.player.element.state.pos.y
		};
	}

	move(x, y) {
		this.player.element.accelerate(
			new Physics.vector({x: x/200, y: y/200}));
	}

	setOtherLocation(uuid, x, y){
		this.others.forEach((other) => {
			if (other.uuid === uuid){
				other.setLocation(x, y);
			}
		});
	}

	removeOther(uuid) {
		this.others = this.others.filter((other) => {
			if (other.uuid === uuid) {
				other.undraw();
				return false;
			}

			return true;
		});
	}

	createOther(uuid, x, y) {
		let newOther = new Other(uuid, x, y);
		newOther.draw();
		newOther.setLocation(x, y);

		this.others.push(newOther);
	}
}
