import Block from './drawables/block'

export default class GMap {
	constructor(){
		let jsonExample = {
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

		let blockText = jsonExample.content;

		for (let i=0; i<jsonExample.mapHeight; i++) {
			this.blockMap.push(new Array(jsonExample.mapWidth));

			for (let j=0; j<jsonExample.mapWidth; j++){

				// We have a block
				if (blockText[i][j] === 'l'){
					this.blocks.push(new Block(i, j, jsonExample.blockWidth, jsonExample.blockHeight));

					this.blockMap[i][j] = true;
				}

			}
		}
	}

	drawMap(){		
		this.blocks.forEach(function (e) {
			e.draw();
		});
	}
}























