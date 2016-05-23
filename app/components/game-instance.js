import Ember from 'ember';
import Instance from '../game/instance';

export default Ember.Component.extend({
	init(){
		this._super();
	},

	didRender(){
		this._super();

		let canvas = this.$('canvas')[0];
		let instance = new Instance(canvas);
	}
});