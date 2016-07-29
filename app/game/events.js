import Instance from './instance';
import Utils from './utils';
import EntityManager from './entityManager';
import PhysicsManager from './physicsManager';
import Consts from './consts';
import _ from 'lodash';

export default class Events {

	constructor(){
		this.events = {
			tickHandler: (time, dt) => {
				this.entityManager.applyFriction(); 
				this.physicsManager.world.step(time);

				if (this.instance.keys.d) this.entityManager.move(1, 0);
				if (this.instance.keys.w) this.entityManager.move(0, -1);
				if (this.instance.keys.a) this.entityManager.move(-1, 0);
				if (this.instance.keys.s) this.entityManager.move(0, 1);

				let newSocketData = {
					uuid: this.socketData.uuid,
					position: this.entityManager.getPlayerPosition(),
				};

				if (!_.isEqual(newSocketData, this.socketData)){
					this.socketData = newSocketData;
					this.events.updateNetwork();
				}

				if (!this.socket) return;
				this.socket.emit('requestUpdate', {});
			},

			dDown: () => {
				if (this.instance.keys.d === true) return;
				this.instance.keys.d = true;
			},

			dUp: () => {
				this.instance.keys.d = false;
			},

			wDown: () => {
				if (this.instance.keys.w === true) return;
				this.instance.keys.w = true;
			},

			wUp: () => {
				this.instance.keys.w = false;
			},

			aDown: () => {
				if (this.instance.keys.a === true) return;
				this.instance.keys.a = true;
			},

			aUp: () => {
				this.instance.keys.a = false;
			},

			sDown: () => {
				if (this.instance.keys.s === true) return;
				this.instance.keys.s = true;
			},

			sUp: () => {
				this.instance.keys.s = false;
			},

			pUp: () => {
				if (Physics.util.ticker.isActive()){
					Physics.util.ticker.stop();
				} else {
					Physics.util.ticker.start();
				}
			},

			updateNetwork: () => {
				if (!this.socket) return;
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
			},

			mouseClick: (data) => {
				this.entityManager.createBullet(data.x, data.y);

				this.socket.emit('sendInstant', {
					playerPosition: this.entityManager.getPlayerPosition(),
					bulletDirection: {
						x: data.x,
						y: data.y
					}
				});
			},

			collision: (data) => {
				if (this.entityManager.isBullet(data.bodyA.uid)) {
					this.entityManager.removeBullet(data.bodyA.uid);
				}
				if (this.entityManager.isBullet(data.bodyB.uid)) {
					this.entityManager.removeBullet(data.bodyB.uid);
				}


			}
		};

		this.physicsManager = PhysicsManager.getPM();
		this.instance = Instance.getInstance();
		this.entityManager = Instance.getEntityManager();
		this.socket = this.instance.socket;

		// Subscribe to the tick handler
		Physics.util.ticker.on(this.events.tickHandler);

		// Start the ticker
		Physics.util.ticker.start();

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

		document.getElementById('viewport').onclick = (e) => {
			let canvasSize = document.getElementById('viewport').getBoundingClientRect();

			this.events.mouseClick({
				x: (e.clientX / canvasSize.width) * 2000,
				y: (e.clientY / canvasSize.height) * 1000
			});
		}

		this.physicsManager.world.on('collisions:detected', (data) => {
			var c;
			for (var i = 0, l = data.collisions.length; i < l; i++){
				c = data.collisions[ i ];

				this.events.collision({
					topic: 'collision-pair',
					bodyA: c.bodyA,
					bodyB: c.bodyB
				});
			}
		});

		// Create networking events via socket.io object
		this.socketData = {
			uuid: Utils.guid(),
			position: this.entityManager.getPlayerPosition()
		};

		this.bulletsToSend = [];

		this.gameData = {
			userData: {}
		};

		if (!Consts.networking) return;

		this.socket.on('timeout', () => {
			console.log('connection error');
		});

		this.socket.on('connect', () => {
			this.socket.emit('join', this.socketData);
		});

		this.socket.on('clientUpdate', (data) => {
			this.events.getUpdate(data);
		});

		this.socket.on('sendInstant', (data) => {
			this.entityManager.createOtherBullet(
				data.playerPosition.x,
				data.playerPosition.y,
				data.bulletDirection.x,
				data.bulletDirection.y
			);
		});






	}
}
