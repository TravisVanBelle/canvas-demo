import GMap from './gmap';
import EntityManager from './entityManager';
import Events from './events';
import PhysicsManager from './physicsManager';
import Consts from './consts';
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
		this.world = null;
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

		this.canvas.setAttribute('width', '2000px');
		this.canvas.setAttribute('height', '1000px');

		this.physicsManager = new PhysicsManager();

		// Draw map
		this.map = new GMap();
		this.map.drawMap();

		// Create Entity Manager
		this.entityManager = new EntityManager();
		this.entityManager.createPlayer();

		// Create socket
		if (Consts.networking) {
			this.socket = io('http://localhost:3005');
		}

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

}