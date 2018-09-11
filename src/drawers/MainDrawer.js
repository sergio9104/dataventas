import React, { Component } from 'react';
import {
	View,
	Text,
	ScrollView,
	Image,
} from 'react-native';

import { DrawerItems } from 'react-navigation';
import { Ionicons as Icon } from '@expo/vector-icons';


class MainDrawer extends Component {
	constructor(props) {
		super(props);

	}

	sceneFilter(value){
		scenes = ["INFORME DIARIO", "INFORME SEMANAL", "INFORME MENSUAL", "INFORME TRIMESTRAL", "INFORME ANUAL", "SALIR", "MENU"];
		return scenes.includes(value)
	}

	drawerIcon(value) {
		switch (value) {
			case "INFORME DIARIO":
				return (<Image source={require("../icons/ICONO-INFORME-DIARIO.png") }/>)
			case "INFORME SEMANAL":
				return (<Image source={require("../icons/ICONO-INFORME-SEMANAL.png")}/>)
			case "INFORME MENSUAL":
				return (<Image source={require("../icons/ICONO-INFORME-MENSUAL.png")}/>)
			case "INFORME TRIMESTRAL":
				return (<Image source={require("../icons/ICONO-TRIMESTRAL.png")}/>)
			case "INFORME ANUAL":
				return (<Image source={require("../icons/ICONO-ANUAL.png")}/>)
			case "SALIR":
			return (<Icon  name="ios-exit-outline" size={26} color='#FFF' />)
			default:
				return(<Image source={require("../icons/ICONO-ANUAL.png")}/>)
		}
	}


	render() {
		return <View style={{ backgroundColor: "#000000", paddingTop: 35, flex: 1 }}>
			<ScrollView>

				<DrawerItems
					{...this.props}
					getLabel={(scene) => (
						this.sceneFilter(this.props.getLabel(scene)) ? <View style={{ borderBottomWidth: 1, borderBottomColor: 'gray', width: '100%', flexDirection: "row", alignItems: "center", paddingVertical: 10 }}>
						<View style={{ width: 50, alignItems: "center" }}>{this.drawerIcon(this.props.getLabel(scene))}</View><Text style={{ color: "#FFF", margin: 10 }} >{this.props.getLabel(scene)}</Text>
					</View>: null
					)}
				/>
			</ScrollView>
		</View>
	}
}

export default MainDrawer;
