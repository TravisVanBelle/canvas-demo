import GMap from './gmap';
import EntityManager from './entityManager';
import Events from './events';
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
		this.entityManager = null;
		this.map = null;
		this.keys = {
			w: false,
			a: false,
			d: false,
			s: false
		};
		this.socket = null;

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

		// Create Entity Manager
		this.entityManager = new EntityManager();
		this.entityManager.createPlayer();

		// Create socket
		this.socket = io('http://localhost:3000');

		// Register events
		this.events = new Events();
	}


	static getInstance(){
		if (!instance){
			console.log('Instance not defined');
		}

		return instance;
	}

	static getEntityManager(){
		if (!instance){
			console.log('Instance not defined');
		}

		return instance.entityManager;
	}

	// Returns the stage for drawing
	static getStage(){
		if (!instance) {
			console.log('Instance not defined');
		}

		return instance.stage;
	}
}