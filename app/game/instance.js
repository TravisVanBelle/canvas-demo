import GMap from './gmap';
import Player from './player';
import Events from './events';
import Other from './other';
import _ from 'lodash/lodash';

let instance = null;

export default class Instance {
	constructor(canvas){
		if (!createjs) {
			console.log('Createjs not defined');
			return;
		}

		instance = this;

		// Member variables
		this.canvas = null;
		this.stage = null;
		this.player = null;
		this.map = null;
		this.keys = {
			w: false,
			a: false,
			d: false,
			s: false
		};
		this.socket = null;
		this.others = [];

		this.canvas = canvas;
		this.stage = new createjs.Stage(this.canvas);

		this.canvas.setAttribute('width', '2000px');
		this.canvas.setAttribute('height', '1000px');

		// Draw background
		let bg = new createjs.Shape();
		bg.graphics.beginFill("#E0AB50").drawRect(0,0,2000,1000);
		this.stage.addChild(bg);

		// Draw map
		this.map = new GMap();
		this.map.drawMap();
		this.stage.update();

		// Create player
		this.player = new Player();
		this.player.draw(100, 100);
		this.stage.update();

		// Create socket
		this.socket = io('http://localhost:3000');

		// Register events
		this.events = new Events();



		/*this.socket.emit('join', {
			id: 'roomid'
		});

		this.d = _.throttle(function(msg){
			console.log('emitting');
			this.socket.emit('move', {
				id: 'roomid'
			});
		}, 30);

		this.socket.on('stcmove', function(msg){
			console.log(msg);
		});*/
	}

	move(x, y) {
		this.player.move(x, y);
		this.stage.update();
	}

	getPlayer() {
		return instance.player;
	}

	setOtherLocation(uuid, x, y){
		this.others.forEach((other) => {
			if (other.uuid === uuid){
				other.setLocation(x, y);
			}
		});
	}

	createOther(uuid, x, y) {
		let newOther = new Other(uuid, x, y);
		newOther.draw();
		newOther.setLocation(x, y);

		this.others.push(newOther);
	}

	static getInstance(){
		if (!instance){
			console.log('Instance not defined');
		}

		return instance;
	}

	// Returns the stage for drawing
	static getStage(){
		if (!instance) {
			console.log('Instance not defined');
		}

		return instance.stage;
	}
}