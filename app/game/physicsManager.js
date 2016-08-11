let PM = null;

/**
 * The manager for the Physics library.
 */
export default class PhysicsManager {
	/**
	 * Creates the object and adds the necessary settings.
	 */
	constructor() {
		PM = this;

		Physics.body('non-rotating-circle', 'circle', function(parent){
			return {
				init: function(opts){
					parent.init.call(this, opts);

					Object.defineProperty(this.state.angular, 'pos', {
						get: function() { return 0; },
						set: function() {}
					});
				}
			};
		});

		this.world = Physics({
			sleepDisabled: true,
			timeStep: 6
		}, this.registerWorld);
	}

	/**
	 * The callback for the Physics engine.
	 *
	 * world: The new world for the game.
	 */
	registerWorld(world) {
		let viewWidth = 2000;
		let viewHeight = 1000;

		let renderer = Physics.renderer('canvas', {
			el: 'viewport',
			width: viewWidth,
			height: viewHeight,
			meta: false,
		});

		renderer.el.width = viewWidth;
		renderer.el.height = viewHeight;

		world.add(renderer);

		world.on('step', function(){
			world.render();
		});

		// bounds of the window
		let viewportBounds = Physics.aabb(0, 0, viewWidth, viewHeight);

		// constrain objects to these bounds
		world.add(Physics.behavior('edge-collision-detection', {
			aabb: viewportBounds,
			restitution: 0.99,
			cof: 0.99
		}));

		world.add( Physics.behavior('body-impulse-response') );
		world.add( Physics.behavior('body-collision-detection') );
		world.add( Physics.behavior('sweep-prune') );

		window.addEventListener('resize', function () {
		    renderer.el.width = 2000;
		    renderer.el.height = 1000;

		    viewportBounds = Physics.aabb(0, 0, viewWidth, viewHeight);
		}, true);
	}

	/**
	 * Returns the physics manager object (singleton).
	 */
	static getPM() {
		return PM;
	}
}