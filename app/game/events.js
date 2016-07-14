import Instance from './instance';
import Utils from './utils';
import _ from 'lodash';

export default class Events {

	constructor(){
		this.events = {
			tickHandler: () => {
				if (this.instance.keys.d) this.instance.move(1, 0);
				if (this.instance.keys.w) this.instance.move(0, -1);
				if (this.instance.keys.a) this.instance.move(-1, 0);
				if (this.instance.keys.s) this.instance.move(0, 1);

				let newSocketData = {
					uuid: this.socketData.uuid,
					position: {
						x: this.instance.player.x,
						y: this.instance.player.y
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
				this.instance.getPlayer().resetXVelocity();
			},

			wDown: () => {
				if (this.instance.keys.w === true) return;

				this.instance.keys.w = true;
			},

			wUp: () => {
				this.instance.keys.w = false;
				this.instance.getPlayer().resetYVelocity();
			},

			aDown: () => {
				if (this.instance.keys.a === true) return;

				this.instance.keys.a = true;
			},

			aUp: () => {
				this.instance.keys.a = false;
				this.instance.getPlayer().resetXVelocity();
			},

			sDown: () => {
				if (this.instance.keys.s === true) return;

				this.instance.keys.s = true;
			},

			sUp: () => {
				this.instance.keys.s = false;
				this.instance.getPlayer().resetYVelocity();
			},

			updateNetwork: () => {
				this.socket.emit('serverUpdate', this.socketData);
			},

			getUpdate: (data) => {
				console.log(data);
			}
		};

		this.instance = Instance.getInstance();
		this.socket = this.instance.socket;

		// Create event ticker via easeljs
		this.ticker = createjs.Ticker;
		this.ticker.setFPS(15);
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

		// Create networking events via socket.io object
		this.socketData = {
			uuid: Utils.guid(),
			position: {
				x: this.instance.player.x,
				y: this.instance.player.y
			}
		};

		this.gameData = {};

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
