import GMap from './gmap';
import EntityManager from './entityManager';
import Events from './events';
import PhysicsManager from './physicsManager';
import Consts from './consts';
import _ from 'lodash/lodash';

let instance = null;

/**
 * The game instance and entry point of the game.
 */
export default class Instance {
	constructor(){
		instance = this;

		this.world = null;
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

		// Registers the physics manager.
		this.physicsManager = new PhysicsManager();

		// Creates and draws the map.
		this.map = new GMap();
		this.map.drawMap();

		// Creates the entity manager and player object.
		this.entityManager = new EntityManager();
		this.entityManager.createPlayer();

		// Create socket object for networking.
		if (Consts.networking) {
			this.socket = io('http://localhost:3005');
		}

		// Register events.
		this.events = new Events();
	}

	/**
	 * Returns the instance object (singleton).
	 */
	static getInstance(){
		if (!instance){
			console.log('Instance not defined');
		}

		return instance;
	}

	/**
	 * Returns the entity manager.
	 */
	static getEntityManager(){
		if (!instance){
			console.log('Instance not defined');
		}

		return instance.entityManager;
	}

}