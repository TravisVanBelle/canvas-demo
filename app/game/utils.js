import _ from 'lodash';

export default {

	guid: () => {
		function s4() {
			return Math.floor((1 + Math.random()) * 0x10000)
				.toString(16)
				.substring(1);
		}

		return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
		s4() + '-' + s4() + s4() + s4();
	},

	diff: (prev, curr) => {
		let differences = [];

		if (_.isEqual(prev, curr)) return differences;

		let prevKeys = Object.keys(prev);
		let newKeys = Object.keys(curr).filter((key) => {
			return !prev.hasOwnProperty(key);
		});

		prevKeys.forEach((key) => {
			if (!curr.hasOwnProperty(key)) {
				differences.push({
					type: 'removed',
					key: key,
					value: prev[key]
				});
			}
			if (curr.hasOwnProperty(key) && !_.isEqual(prev[key], curr[key])) {
				differences.push({
					type: 'diffed',
					key: key,
					value: curr[key]
				});
				return;
			}
		});

		newKeys.forEach((key) => {
			differences.push({
				type: 'added',
				key: key,
				value: curr[key]
			});
		});

		return differences;
	}

}