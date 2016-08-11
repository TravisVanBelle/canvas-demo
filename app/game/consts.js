export default {
	// Movement speed when you start moving.
	movementSpeedStart: 1,

	// Movement speed when you're fully accelerated.
	movementSpeedEnd: 10,

	// The amount of friction between players and the ground. [0, 1]
	// (0 = no movement, 1 = no friction)
	friction: 0.9,

	// The radius of the player's circle.
	playerRadius: 15,

	// The bounciness of players against walls and each other.
	playerRestitution: 0.2,

	// The player's acceleration. (Default of 1).
	acceleration: 1.0,

	// Whether or not to connect multiple instances over the network.
	networking: true
};