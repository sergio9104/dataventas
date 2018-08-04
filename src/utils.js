import { AsyncStorage } from "react-native"

export const evaluateOuterDrawerListItems = items => {
	const drawerItems = {};
	items.forEach((item, index) => {
		let { key } = item;
		// Delimiter _
		// key => DataSearch_Basic to DataSearch
		key = key.substr(0, key.indexOf('_'));
		if (key.length) {
			if (drawerItems.hasOwnProperty(key)) {
				drawerItems[key].end = index + 1;
			} else {
				drawerItems[key] = {
					start: index,
					end: 0,
				};
			}
		}
	});
	return drawerItems;
};

export const evaluateChildDrawerTitle = ({ navigation }) => ({
	title: navigation.state.key.substr(navigation.state.key.indexOf('_') + 1),
});

const url = "http://seguridad-pru.us-east-2.elasticbeanstalk.com/";

export const request = (dir, data, fn) => {
	AsyncStorage.getItem("session", (val) => {
		if (val) {
			fn(
				fetch(url + dir, {
					method: 'post',
					headers: {
						'Content-Type': 'application/json',
						'autorization': val
					},
					body: JSON.stringify({ ...data })
				}).then(function (val) {
					return val.json();
				})
			)
		} else {
			fn(() => {
				return false;
			})
		}
	});

}

export const loginRequest = (dir, data) => {
	return fetch(url + dir, {
			method: 'post',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ ...data })
		}).then(function (val) {
			return val.json();
		})
	
}
