import Block from './block';
import Instance from './instance';
import map from './maps/map1';

/**
 * The game map object.
 */
export default class GMap {
	constructor(){
		this.mapJson = map;

		// Map of blocks for quickly checking collisions
		this.blockMap = [];

		// List of actual blocks for displaying
		this.blocks = [];

		this.spawns = [];

		let blockText = this.mapJson.content;

		for (let i=0; i<this.mapJson.mapHeight; i++) {
			this.blockMap.push(new Array(this.mapJson.mapWidth));

			for (let j=0; j<this.mapJson.mapWidth; j++){

				// We have a block
				if (blockText[i][j] === 'l'){
					this.blocks.push(new Block(i, j, this.mapJson.blockWidth, this.mapJson.blockHeight));

					this.blockMap[i][j] = this.blocks[this.blocks.length-1];
				}

				if (blockText[i][j] === 's'){
					this.spawns.push([i, j]);
				}

			}
		}
	}

	/**
	 * Draws the blocks on the canvas.
	 */
	drawMap(){
		this.blocks.forEach(function (e) {
			e.draw();
		});
	}

	/**
	 * Returns the spawn points on the map.
	 */
	getSpawns() {
		return this.spawns;
	}
}
