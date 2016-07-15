import Instance from './instance';
import Utils from './utils';
import EntityManager from './entityManager';
import _ from 'lodash';

export default class Events {

	constructor(){
		this.events = {
			tickHandler: () => {
				if (this.ticker.paused) return;

				if (this.instance.keys.d) this.entityManager.move(1, 0);
				if (this.instance.keys.w) this.entityManager.move(0, -1);
				if (this.instance.keys.a) this.entityManager.move(-1, 0);
				if (this.instance.keys.s) this.entityManager.move(0, 1);

				let newSocketData = {
					uuid: this.socketData.uuid,
					position: {
						x: this.entityManager.player.x,
						y: this.entityManager.player.y
					}
				};

				if (!_.isEqual(newSocketData, this.socketData)){
					this.socketData = newSocketData;

					this.events.updateNetwork();
				}

				this.socket.emit('requestUpdate', {});
			},

			dDown: () => {
				if (this.instance.keys.d === true) return;

				this.instance.keys.d = true;
			},

			dUp: () => {
				this.instance.keys.d = false;
				this.entityManager.getPlayer().resetXVelocity();
			},

			wDown: () => {
				if (this.instance.keys.w === true) return;

				this.instance.keys.w = true;
			},

			wUp: () => {
				this.instance.keys.w = false;
				this.entityManager.getPlayer().resetYVelocity();
			},

			aDown: () => {
				if (this.instance.keys.a === true) return;

				this.instance.keys.a = true;
			},

			aUp: () => {
				this.instance.keys.a = false;
				this.entityManager.getPlayer().resetXVelocity();
			},

			sDown: () => {
				if (this.instance.keys.s === true) return;

				this.instance.keys.s = true;
			},

			sUp: () => {
				this.instance.keys.s = false;
				this.entityManager.getPlayer().resetYVelocity();
			},

			pUp: () => {
				this.ticker.paused = !this.ticker.paused;
			},

			updateNetwork: () => {
				this.socket.emit('serverUpdate', this.socketData);
			},

			getUpdate: (data) => {
				let diffs = Utils.diff(this.gameData.userData, data.userData);
				
				diffs.forEach((diff) => {
					if (diff.value.uuid === this.socketData.uuid) return;

					if (diff.type === 'added') {
						this.entityManager.createOther(diff.value.uuid, diff.value.position.x, diff.value.position.y);
					}

					if (diff.type === 'removed') {
						this.entityManager.removeOther(diff.value.uuid);
					}

					if (diff.type === 'diffed') {
						this.entityManager.setOtherLocation(diff.value.uuid, diff.value.position.x, diff.value.position.y);
					}
				});

				this.gameData.userData = data.userData;
			}
		};

		this.instance = Instance.getInstance();
		this.entityManager = Instance.getEntityManager();
		this.socket = this.instance.socket;

		// Create event ticker via easeljs
		this.ticker = createjs.Ticker;
		this.ticker.setFPS(30);
		this.ticker.addEventListener('tick', this.events.tickHandler);

		// Create events for keypress via keypress.js
		this.keypressListener = new window.keypress.Listener();
		this.keypressListener.register_combo({
			'keys': 'd',
			'on_keydown': this.events.dDown,
			'on_keyup': this.events.dUp,
		});

		this.keypressListener.register_combo({
			'keys': 'w',
			'on_keydown': this.events.wDown,
			'on_keyup': this.events.wUp,
		});

		this.keypressListener.register_combo({
			'keys': 'a',
			'on_keydown': this.events.aDown,
			'on_keyup': this.events.aUp
		});

		this.keypressListener.register_combo({
			'keys': 's',
			'on_keydown': this.events.sDown,
			'on_keyup': this.events.sUp
		});

		this.keypressListener.register_combo({
			'keys': 'p',
			'on_keyup': this.events.pUp
		});

		// Create networking events via socket.io object
		this.socketData = {
			uuid: Utils.guid(),
			position: {
				x: this.entityManager.player.x,
				y: this.entityManager.player.y
			}
		};

		this.gameData = {
			userData: {}
		};

		this.socket.on('timeout', () => {
			console.log('connection error');
		});

		this.socket.on('connect', () => {
			this.socket.emit('join', this.socketData);
		});

		this.socket.on('clientUpdate', (data) => {
			this.events.getUpdate(data);
		});








	}
}
