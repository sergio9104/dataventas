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
	AppRegistry,
	ImageBackground,
	AsyncStorage,
	Image
} from 'react-native';
import { Ionicons as Icon } from '@expo/vector-icons';
import { Button } from 'native-base';


const LOGO_URL = 'https://i.imgur.com/BbYaucd.png';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: StatusBar.currentHeight,
		
	},
	innerContainer: { flex: 1, alignItems: 'center', justifyContent: 'center' },
	header: {backgroundColor: '#fff', padding: 10,paddingHorizontal:15, paddingTop: Platform.OS === 'ios' ? 13 : 7, flexDirection:'row',alignItems:'center', justifyContent:'space-between' },
	login:{
		flex: 1,
	},
	backgroundImage:{
		flex:1,
		alignSelf:'stretch',
		width: null,
		justifyContent: 'center',
	},
	loginconten:{
		alignItems:'center',
		marginTop:60
	},

	inputContainer:{
		margin:5,
		padding:5,
		paddingHorizontal:20,
		backgroundColor:'rgba(255,255,255,0.8)',
		flexDirection:'row',
		alignItems:'center',
		width:300,
		marginHorizontal:'auto',
	},
	input:{
		fontSize: 16,
		width:200,
		marginLeft:10,
		height: 40,
		padding:10,
		backgroundColor:'transparent',
		color:'#525152'
	},
	buttonContaines:{
		margin:20,
		backgroundColor:'#575757',
		height:40,
		width:100,
		justifyContent:'center',
		borderWidth: 1,
		borderColor: '#575757',
		borderTopWidth: 0,
		shadowColor: '#fff',
		shadowOffset: { width: 0, height: 0 },
		shadowOpacity: 0.8,
		shadowRadius: 8,
		elevation: 1,
	},
	buttonText:{
		fontSize: 16,
		textAlign: 'center',
		color: '#FFF',
		textAlignVertical:'center'
	},
	logintext:{
		width:100,
		color:'#797675'
	},
	buttonsecond:{
		margin:20,
		backgroundColor:'transparent',
		height:40,
		width:100,
		justifyContent:'center',

	},
	buttonText1:{
		fontSize: 14,
		textAlign: 'center',
		color: '#6F7372',
		textAlignVertical:'center'
	},
	buttonPipe:{
		fontSize: 36,
		textAlign: 'center',
		color: '#6F7372',
		textAlignVertical:'center',
		
	},
	buttonText2:{
		fontSize: 24,
		textAlign: 'center',
		color: '#6F7372',
		textAlignVertical:'center'
	},
	buttonText3:{
		fontSize: 13,
		textAlign: 'center',
		color: '#6F7372',
		textAlignVertical:'center'
	},
});

export default class Login extends React.Component {
	
	render() {
		const menu  = this.props.navigation;
		console.log(menu)
		return (
			<View style={styles.container}>
				<StatusBar barStyle="dark-content" />
				<View style={styles.header}>
					<TouchableOpacity
						onPress={() => {
							this.props.navigation.navigate('DrawerToggle');
						}}
					>	
					</TouchableOpacity>
					<Image source={require('../images/header.png')} style={{width:200, height:40, marginLeft:20}}></Image>

				</View>

				
				<ImageBackground source={require('../images/fondo.png')} style={styles.backgroundImage}>
					<ScrollView style={styles.login}>
						<View style={styles.loginconten}>
							
							<View style={styles.inputContainer}>
								<Text style={styles.logintext}>USUARIO:</Text><TextInput underlineColorAndroid='transparent' style={styles.input} placeholder='Username'>
								</TextInput>
							</View>
							<View style={styles.inputContainer}>
								<Text style={styles.logintext}>CONTRASEÑA:</Text><TextInput secureTextEntry={true} underlineColorAndroid='transparent' style={styles.input} placeholder='Password'>
								</TextInput>

							</View>
							<View style={{ alignContent: 'center', justifyContent: 'center' }}>
							<TouchableOpacity onPress={() => menu.navigate('INFORME DIARIO')}  style={styles.buttonContaines}> 
								<Text style={styles.buttonText}>INGRESAR</Text>
							</TouchableOpacity>
							</View>
							<View style={{ alignContent: 'center',  flexDirection:'row', }}>
							<TouchableOpacity onPress={this.login} style={styles.buttonsecond} >
								<Text style={styles.buttonText1}>Registrase</Text>
							</TouchableOpacity>
							<Text style={styles.buttonPipe}>|</Text>
							<TouchableOpacity onPress={this.login} style={styles.buttonsecond} >
								<Text style={styles.buttonText1}>Olvidó su contraseña</Text>
							</TouchableOpacity>
							</View>	
							<View style={{ alignContent: 'center',  flexDirection:'row', }}>
								<Text style={styles.buttonText2}>Business Intelligence </Text>
							</View>					
							<View style={{ alignContent: 'center',  flexDirection:'row', }}>
								<Text style={styles.buttonText3}>DataVentas es una herramienta tecnológica inteligente enfocada en conocer a profundidad tus clientes para lograr crecimiento en ventas </Text>
							</View>	
						</View>
					
					</ScrollView>
				</ImageBackground>


				
		
				
			</View>
		);
	}
}
