import React from 'react';
import { DrawerNavigator } from 'react-navigation';

import Login from './src/components/Login';
import MainDrawer from './src/drawers/MainDrawer';
import InformeDiario from './src/components/InformeDiario';
// RootDrawer containing drawers for each components
const RootDrawer = DrawerNavigator(
	{
		'Login': {
			screen: Login,
		},
		"INFORME DIARIO":{
			screen: InformeDiario,
		}
	},
	{
		// Custom rendering component of drawer panel
		contentComponent: MainDrawer,
	}
);

export default class App extends React.Component {
	render() {
		return <RootDrawer />;
	}
}
