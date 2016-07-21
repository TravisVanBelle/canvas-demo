import Player from './player';
import Instance from './instance';
import Other from './other';

export default class EntityManager {
	constructor() {
		this.player = null;
		this.others = [];
	}

	createPlayer() {
		this.player = new Player();
		this.player.draw(100, 100);
	}

	getPlayer() {
		return this.player;
	}

	move(x, y) {
		this.player.move(x, y);
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
