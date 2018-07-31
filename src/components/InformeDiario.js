import React from 'react';
import {
	TextInput,
	ScrollView,
	StatusBar,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
	Platform,
	ImageBackground,
	Image
} from 'react-native';
import { Ionicons as Icon } from '@expo/vector-icons';


const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: StatusBar.currentHeight,


	},
	innerContainer: { flex: 1, alignItems: 'center', justifyContent: 'center' },
	header: { backgroundColor: '#fff', padding: 10, paddingHorizontal: 15, paddingTop: Platform.OS === 'ios' ? 13 : 7, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
	login: {
		flex: 1,
	},
	backgroundImage: {
		flex: 1,
		alignSelf: 'stretch',
		width: null,
		justifyContent: 'center',
	},

	title: {
		height: 40,
		backgroundColor: '#000',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: "center"


	},
	texttitle: {
		color: '#FFF',
		fontSize: 16,
		textAlign: 'center',
		textAlignVertical: 'center',
		marginLeft: 10

	}

});

export default class InformeDiario extends React.Component {

	render() {
		return (
			<View style={styles.container}>

				<View style={styles.header}>
					<TouchableOpacity
						onPress={() => {
							this.props.navigation.navigate('DrawerToggle');
						}}
					>
						<Icon name="md-menu" size={30} color='#000' />
					</TouchableOpacity>
					<Image source={require('../images/header.png')} style={{ width: 200, height: 40, marginLeft: 20 }}></Image>

				</View>

				<View style={styles.title}>
					<Image source={require('../icons/ICONO-INFORME-DIARIO.png')} /><Text style={styles.texttitle}>INFORME DIARIO</Text>
				</View>
				<ImageBackground source={require('../images/fondopag.png')} style={styles.backgroundImage}>
				</ImageBackground>
			</View>
		);
	}
}
