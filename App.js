import React from 'react';
import { DrawerNavigator } from 'react-navigation';

import Login from './src/components/Login';
import MainDrawer from './src/drawers/MainDrawer';
import InformeDiario from './src/components/informeDiario/VentasGrupo';
import DetalleVentasGrupo from './src/components/informeDiario/DetalleVentasGrupo';
import VentasComercio from './src/components/informeDiario/VentasComercio';
import InformeSemanal from './src/components/informeSemanal/VentasGrupo';
import DetalleVentasGrupoSemanal from './src/components/informeSemanal/DetalleVentasGrupo';
import VentasComercioSemanal from './src/components/informeSemanal/VentasComercio';
import InformeMensual from './src/components/informeMensual/VentasGrupo';
import DetalleVentasGrupoMensual from './src/components/informeMensual/DetalleVentasGrupo';
import VentasComercioMensual from './src/components/informeMensual/VentasComercio';
import InformeTrimestral from './src/components/InformeTrimestral';
import InformeAnual from './src/components/InformeAnual';
import Menu from './src/components/Menu';


// RootDrawer containing drawers for each components
const RootDrawer = DrawerNavigator(
	{

		'MENU': {
			screen: Menu,
		},
		"INFORME DIARIO": {
			screen: InformeDiario,
		},
		"INFORME DIARIO DETALLE": {
			screen: DetalleVentasGrupo,
		},
		"VENTAS COMERCIO": {
			screen: VentasComercio,
		},
		"INFORME SEMANAL": {
			screen: InformeSemanal,
		},
		"INFORME DETALLE SEMANAL": {
			screen: DetalleVentasGrupoSemanal,
		},
		"VENTAS COMERCIO SEMANAL": {
			screen: VentasComercioSemanal,
		},
		"INFORME MENSUAL": {
			screen: InformeMensual,
		},
		"INFORME DETALLE MENSUAL": {
			screen: DetalleVentasGrupoMensual,
		},
		"VENTAS COMERCIO MENSUAL": {
			screen: VentasComercioMensual,
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
