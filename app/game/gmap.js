import Block from './drawables/block';

export default class GMap {
	constructor(){
		this.mapJson = {
			"name": "First",
			"id": 1,
			"blockWidth": 50,
			"blockHeight": 50,
			"mapWidth": 40,
			"mapHeight": 20,
			"content": [
				"llllllllllllllllllllllllllllllllllllllll",
				"l~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~l",
				"l~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~l~~~~~l",
				"l~~~~~llll~~~~~~~~~~~~~~~~~~~~~~~l~~~~~l",
				"l~~~~~l~~~~~~~~~~~~~l~~~~~~~~~~~~l~~~~~l",
				"l~~~~~l~~~~~~~~~~~~lll~~~~~~~~~~~l~~~~~l",
				"l~~~~~l~~~~~~~~~~~~lll~~~~~~~~~~~lllll~l",
				"l~~~~~~~~~~~~~~~~~~lll~~~~~~~~~~~~~~~~~l",
				"l~~~~~~~~~~~~~lllllllllllll~~~~~~~~~~~~l",
				"l~~~~~~~~~~~~~lllllllllllll~~~~~~~~~~~~l",
				"l~~~~~~~~~~~~~lllllllllllll~~~~~~~~~~~~l",
				"l~~~~~~~~~~~~~lllllllllllll~~~~~~~~~~~~l",
				"l~~~~~~~~~~~~~lllllllllllll~~~~~~~~~~~~l",
				"l~lllll~~~~~~~~~~~~lll~~~~~~~~~~~l~~~~~l",
				"l~~~~~l~~~~~~~~~~~~lll~~~~~~~~~~~l~~~~~l",
				"l~~~~~l~~~~~~~~~~~~lll~~~~~~~~~~~l~~~~~l",
				"l~~~~~l~~~~~~~~~~~~~l~~~~~~~~~llll~~~~~l",
				"l~~~~~l~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~l",
				"l~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~l",
				"llllllllllllllllllllllllllllllllllllllll",
			]
		};

		// Map of blocks for quickly checking collisions
		this.blockMap = [];

		// List of actual blocks for displaying
		this.blocks = [];

		let blockText = this.mapJson.content;

		for (let i=0; i<this.mapJson.mapHeight; i++) {
			this.blockMap.push(new Array(this.mapJson.mapWidth));

			for (let j=0; j<this.mapJson.mapWidth; j++){

				// We have a block
				if (blockText[i][j] === 'l'){
					this.blocks.push(new Block(i, j, this.mapJson.blockWidth, this.mapJson.blockHeight));

					this.blockMap[i][j] = this.blocks[this.blocks.length-1];
				}

			}
		}
	}

	drawMap(){
		this.blocks.forEach(function (e) {
			e.draw();
		});

		/*
		for (let i=0; i<20; i++){
			for (let j=0; j<40; j++){
				let text = new createjs.Text(i + 'x' + j, "20px Arial", "#ff7700");
				text.x = j*50+10;
				text.y = i*50+30;
				text.textBaseline = "alphabetic";
				this.blocks[0].stage.addChild(text);
			}
		}*/
	}

	checkMovementCollision(x, y){
		let collision = false;

		// We need to get the 4 blocks that the player may collide with
		let xBlock = [];
		let yBlock = [];

		xBlock[0] = Math.ceil(x / this.mapJson.blockWidth);
		xBlock[1] = xBlock[0] - 1;
		xBlock[2] = xBlock[0] - 2;

		yBlock[0] = Math.ceil(y / this.mapJson.blockHeight);
		yBlock[1] = yBlock[0] - 1;
		yBlock[2] = yBlock[0] - 2;

		for (let i=0; i<3; i++){
			for (let j=0; j<3; j++){

				// If no block, continue
				if (!this.blockMap[yBlock[j]] || !this.blockMap[yBlock[j]][xBlock[i]]) {
					continue;
				}

				// Otherwise, check for block collision
				collision = collision || this.blockMap[yBlock[j]][xBlock[i]].checkCollision(x, y);
			}
		}

		return collision;
	}
}























