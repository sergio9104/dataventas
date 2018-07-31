import React, { Component } from 'react';
import {
	View,
	Text,
	ScrollView,
	Image

} from 'react-native';

import { DrawerItems } from 'react-navigation';



class MainDrawer extends Component {
	constructor(props) {
		super(props);

	}

	drawerIcon(value) {
		switch (value) {
			case "INFORME DIARIO":
				return require("../icons/ICONO-INFORME-DIARIO.png")
			case "INFORME SEMANAL":
				return require("../icons/ICONO-INFORME-SEMANAL.png")
			case "INFORME MENSUAL":
				return require("../icons/ICONO-INFORME-MENSUAL.png")
			case "INFORME TRIMESTRAL":
				return require("../icons/ICONO-TRIMESTRAL.png")
			case "INFORME ANUAL":
				return require("../icons/ICONO-ANUAL.png")
			default:
				return require("../icons/ICONO-INFORME-DIARIO.png")
		}
	}


	render() {
		return <View style={{ backgroundColor: "#000000", paddingTop: 35, flex: 1 }}>
			<ScrollView>

				<DrawerItems
					{...this.props}
					getLabel={(scene) => (
						<View style={{ borderBottomWidth: 1, borderBottomColor: 'gray', width: '100%', flexDirection: "row", alignItems: "center", paddingVertical: 10 }}>
							<View style={{ width: 50, alignItems: "center" }} ><Image source={this.drawerIcon(this.props.getLabel(scene))} /></View><Text style={{ color: "#FFF", margin: 10 }} >{this.props.getLabel(scene)}</Text>
						</View>
					)}
				/>
			</ScrollView>
		</View>
	}
}

export default MainDrawer;
