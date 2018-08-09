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
const url2 = "https://j864ogth2l.execute-api.us-east-2.amazonaws.com/";

export const ambiente = "qa";

export const request = (dir, data, fn) => {
	AsyncStorage.getItem("userInfo", (err,val) => {
		if (val) {
			fn(
				fetch(url2 + dir, {
					method: 'post',
					headers: {
						'content-type': 'application/json',
						'authorization': JSON.parse(val).token 
					},
					body: JSON.stringify({ idComercio:JSON.parse(val).data.atributosUsuario[0].dsValor, ...data})
				}).then(function (val) {
					return val.json();
				})
			)
		} else {
			fn(() => {
				return new Promise(false);
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
