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

		this.canvas = canvas;
		this.stage = new createjs.Stage(this.canvas);

		this.canvas.setAttribute('width', '2000px');
		this.canvas.setAttribute('height', '1000px');


		// Draw background
		let bg = new createjs.Shape();
		bg.graphics.beginFill("#E0AB50").drawRect(0,0,2000,1000);
		this.stage.addChild(bg);

		let m = new GMap();
		m.drawMap();
		this.stage.update();

		let p = new Player();
		p.draw(100, 100);
		this.stage.update();

		this.events = new Events();

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