import Instance from './instance';

export default class Events {

	constructor(){
		this.events = {
			tickHandler: () => {
				let instance = Instance.getInstance();
			}
		};

		this.ticker = createjs.Ticker;

		this.ticker.setFPS(1);
		this.ticker.addEventListener('tick', this.events.tickHandler);

	}


}