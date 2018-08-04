import React from 'react';
import { DrawerNavigator } from 'react-navigation';

import Login from './src/components/Login';
import MainDrawer from './src/drawers/MainDrawer';
import InformeDiario from './src/components/InformeDiario';
import InformeSemanal from './src/components/InformeSemanal';
import InformeMensual from './src/components/InformeMensual';
import InformeTrimestral from './src/components/InformeTrimestral';
import InformeAnual from './src/components/InformeAnual';
import Menu from './src/components/Menu';


// RootDrawer containing drawers for each components
const RootDrawer = DrawerNavigator(
	{

		'ESTADO ACTUAL DE LOS COMERCIOS': {
			screen: Menu,

		},
		"INFORME DIARIO": {
			screen: InformeDiario,
		},
		"INFORME SEMANAL": {
			screen: InformeSemanal,
		},
		"INFORME MENSUAL": {
			screen: InformeMensual,
		},
		/*"INFORME TRIMESTRAL": {
			screen: InformeTrimestral,
		},
		"INFORME ANUAL": {
			screen: InformeAnual,
		},*/
		'SALIR': {
			screen: Login,
			navigationOptions:{
				drawerLockMode:'locked-closed'
			}

		},
	},
	{
		// Custom rendering component of drawer panel
		contentComponent: MainDrawer,
		drawerWidth: 250,
		initialRouteName:'SALIR'
	}
);

export default class App extends React.Component {
	render() {
		return <RootDrawer />;
	}
}
