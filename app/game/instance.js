import GMap from './gmap';
import Player from './player';
import Events from './events';

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

		this.canvas = canvas;
		this.stage = new createjs.Stage(this.canvas);

		this.canvas.setAttribute('width', '2000px');
		this.canvas.setAttribute('height', '1000px');

		// Draw background
		let bg = new createjs.Shape();
		bg.graphics.beginFill("#E0AB50").drawRect(0,0,2000,1000);
		this.stage.addChild(bg);

		this.map = new GMap();
		this.map.drawMap();
		this.stage.update();

		this.player = new Player();
		this.player.draw(100, 100);
		this.stage.update();

		this.events = new Events();

	}

	move(x, y) {
		this.player.move(x, y);
		this.stage.update();
	}

	getPlayer() {
		return instance.player;
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