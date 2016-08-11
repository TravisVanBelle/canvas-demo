import Instance from './instance';
import Utils from './utils';
import EntityManager from './entityManager';
import PhysicsManager from './physicsManager';
import Consts from './consts';
import _ from 'lodash';

/**
 * Registers and handles events.
 */
export default class Events {
	constructor(){
		this.physicsManager = PhysicsManager.getPM();
		this.instance = Instance.getInstance();
		this.entityManager = Instance.getEntityManager();
		this.socket = this.instance.socket;

		// Subscribe to the tick handler.
		Physics.util.ticker.on(this.tickHandler.bind(this));

		// Start the ticker.
		Physics.util.ticker.start();

		// Register keypress events.
		this.registerKeypressEvents();		

		// Register click events on canvas.
		document.getElementById('viewport').onclick = (e) => {
			let canvasSize = document.getElementById('viewport').getBoundingClientRect();

			this.mouseClick({
				x: (e.clientX / canvasSize.width) * 2000,
				y: (e.clientY / canvasSize.height) * 1000
			});
		}

		// Register collision event.
		this.physicsManager.world.on('collisions:detected', (data) => {
			var c;
			for (var i = 0, l = data.collisions.length; i < l; i++){
				c = data.collisions[ i ];

				this.collision({
					topic: 'collision-pair',
					bodyA: c.bodyA,
					bodyB: c.bodyB
				});
			}
		});

		// Stores data to send to other players in the game.
		this.socketData = {
			uuid: Utils.guid(),
			position: this.entityManager.getPlayerPosition()
		};

		// Stores data of other players in the game.
		this.gameData = {
			userData: {}
		};

		if (Consts.networking) {
			registerNetworkEvents();
		}
	}

	/**
	 * Register network events.
	 */
	registerNetworkEvents() {
		this.socket.on('timeout', () => {
			console.log('connection error');
		});

		this.socket.on('connect', () => {
			this.socket.emit('join', this.socketData);
		});

		this.socket.on('clientUpdate', (data) => {
			this.getUpdate(data);
		});

		this.socket.on('sendInstant', (data) => {
			this.entityManager.createBullet(
				data.playerPosition.x,
				data.playerPosition.y,
				data.bulletDirection.x,
				data.bulletDirection.y
			);
		});
	}

	/**
	 * Register keypress events.
	 */
	registerKeypressEvents() {
		this.keypressListener = new window.keypress.Listener();
		this.keypressListener.register_combo({
			'keys': 'd',
			'on_keydown': this.dDown.bind(this),
			'on_keyup': this.dUp.bind(this),
		});

		this.keypressListener.register_combo({
			'keys': 'w',
			'on_keydown': this.wDown.bind(this),
			'on_keyup': this.wUp.bind(this),
		});

		this.keypressListener.register_combo({
			'keys': 'a',
			'on_keydown': this.aDown.bind(this),
			'on_keyup': this.aUp.bind(this)
		});

		this.keypressListener.register_combo({
			'keys': 's',
			'on_keydown': this.sDown.bind(this),
			'on_keyup': this.sUp.bind(this)
		});

		this.keypressListener.register_combo({
			'keys': 'p',
			'on_keyup': this.pUp.bind(this)
		});
	}

	/**
	 * Handler for responding to mouse clicks.
	 *
	 * data: The mouse click event data.
	 */
	mouseClick (data) {
		let playerPosition = this.entityManager.getPlayerPosition();
		this.entityManager.createBullet(playerPosition.x,
				playerPosition.y, data.x, data.y);

		this.socket.emit('sendInstant', {
			playerPosition: playerPosition,
			bulletDirection: {
				x: data.x,
				y: data.y
			}
		});
	}

	/**
	 * Handler for generic collisions.
	 *
	 * data: Collision data sent by physics library.
	 */
	collision (data) {
		if (this.entityManager.isBullet(data.bodyA.uid)) {
			this.entityManager.removeBullet(data.bodyA.uid);
		}
		if (this.entityManager.isBullet(data.bodyB.uid)) {
			this.entityManager.removeBullet(data.bodyB.uid);
		}
	}

	/**
	 * The handler called on each timer tick.
	 *
	 * time: The time the handler was called.
	 * dt: The delta time since last the tick.
	 */
	tickHandler (time, dt) {
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
			this.updateNetwork();
		}

		if (!this.socket) return;
		this.socket.emit('requestUpdate', {});
	}

	/**
	 * Updates the network with the current socket data.
	 */
	updateNetwork () {
		if (!this.socket) return;
		this.socket.emit('serverUpdate', this.socketData);
	}

	/**
	 * Retrives new data from the server.
	 *
	 * data: Game object sent from the server.
	 */
	getUpdate (data) {
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

	/**
	 * Keypress event handlers.
	 */
	dDown () {
		if (this.instance.keys.d === true) return;
		this.instance.keys.d = true;
	}

	dUp () {
		this.instance.keys.d = false;
	}

	wDown () {
		if (this.instance.keys.w === true) return;
		this.instance.keys.w = true;
	}

	wUp () {
		this.instance.keys.w = false;
	}

	aDown () {
		if (this.instance.keys.a === true) return;
		this.instance.keys.a = true;
	}

	aUp () {
		this.instance.keys.a = false;
	}

	sDown () {
		if (this.instance.keys.s === true) return;
		this.instance.keys.s = true;
	}

	sUp () {
		this.instance.keys.s = false;
	}

	pUp () {
		if (Physics.util.ticker.isActive()){
			Physics.util.ticker.stop();
		} else {
			Physics.util.ticker.start();
		}
	}

}
