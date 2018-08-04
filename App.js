import React from 'react';
import { DrawerNavigator } from 'react-navigation';

import Login from './src/components/Login';
import MainDrawer from './src/drawers/MainDrawer';
import InformeDiario from './src/components/InformeDiario';
import InformeSemanal from './src/components/InformeSemanal';
import InformeMensual from './src/components/InformeMensual';
import InformeTrimestral from './src/components/InformeTrimestral';
import InformeAnual from './src/components/InformeAnual';


// RootDrawer containing drawers for each components
const RootDrawer = DrawerNavigator(
	{
		'LOGIN': {
			screen: Login,
			navigationOptions:{   
				drawerLockMode:'locked-closed', 
		   }

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
		"INFORME TRIMESTRAL": {
			screen: InformeTrimestral,
		},
		"INFORME ANUAL": {
			screen: InformeAnual,
		},
	},
	{
		// Custom rendering component of drawer panel
		contentComponent: MainDrawer,
		drawerWidth: 220
	}
);

export default class App extends React.Component {
	render() {
		return <RootDrawer />;
	}
}
