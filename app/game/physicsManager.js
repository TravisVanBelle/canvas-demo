let PM = null;

export default class PhysicsManager {
	constructor() {
		PM = this;

		// create a non-rotating circle
		Physics.body('non-rotating-circle', 'circle', function( parent ){
			return {
				init: function( opts ){
					parent.init.call( this, opts );

					Object.defineProperty(this.state.angular, 'pos', {
						get: function(){ return 0; },
						set: function(){}
					});
				}
			};
		});

		this.world = Physics({
			sleepDisabled: true,
			timeStep: 6
		}, this.registerWorld);
	}

	applyFriction() {
		let bodies = this.world.getBodies();

		bodies.forEach((body) => {
			body.state.vel.set(body.state.vel.x * 0.9, body.state.vel.y * 0.9);
		});
	}

	registerWorld(world) {
		let viewWidth = 2000;
		let viewHeight = 1000;

		let renderer = Physics.renderer('canvas', {
			el: 'viewport',
			width: viewWidth,
			height: viewHeight,
			meta: false, // don't display meta data
		});

		renderer.el.width = viewWidth;
		renderer.el.height = viewHeight;

		// add the renderer
		world.add( renderer );
		// render on each step
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
		//world.add( Physics.behavior('constant-acceleration'));
		world.add( Physics.behavior('body-collision-detection') );
		world.add( Physics.behavior('sweep-prune') );

		window.addEventListener('resize', function () {
		    renderer.el.width = 2000;
		    renderer.el.height = 1000;

		    // also resize the viewport edge detection bounds
		    viewportBounds = Physics.aabb(0, 0, viewWidth, viewHeight);
		}, true);
	}

	static getPM() {
		return PM;
	}
}