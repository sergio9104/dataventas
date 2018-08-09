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
	Image,
	AsyncStorage
} from 'react-native';
import { loginRequest } from "./../utils.js";

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
	loginconten: {
		alignItems: 'center',
		marginTop: 60
	},

	inputContainer: {
		margin: 5,
		padding: 5,
		paddingHorizontal: 20,
		backgroundColor: 'rgba(255,255,255,0.8)',
		flexDirection: 'row',
		alignItems: 'center',
		width: 300,
		marginHorizontal: 'auto',
	},
	input: {
		fontSize: 16,
		width: 200,
		marginLeft: 10,
		height: 40,
		padding: 10,
		backgroundColor: 'transparent',
		color: '#525152'
	},
	buttonContaines: {
		margin: 20,
		backgroundColor: '#575757',
		height: 40,
		width: 100,
		justifyContent: 'center',
		borderWidth: 1,
		borderColor: '#575757',
		borderTopWidth: 0,
		shadowColor: '#fff',
		shadowOffset: { width: 0, height: 0 },
		shadowOpacity: 0.8,
		shadowRadius: 8,
		elevation: 1,
	},
	buttonText: {
		fontSize: 16,
		textAlign: 'center',
		color: '#FFF',
		textAlignVertical: 'center'
	},
	logintext: {
		width: 100,
		color: '#797675'
	},
	buttonsecond: {
		backgroundColor: 'transparent',
		width: 75,
		justifyContent: 'center',
		alignItems: 'center'

	},
	buttonsecond2: {
		backgroundColor: 'transparent',
		width: 150,
		justifyContent: 'center',
		alignItems: 'center',
	},
	buttonText1: {
		fontSize: 14,
		textAlign: 'center',
		color: '#6F7372',
		textAlignVertical: "center"
	},
	buttonPipe: {
		borderRightWidth: 1,
		borderRightColor: '#6F7372',
		height: 16,
		marginHorizontal: 10

	},
	buttonText2: {
		fontSize: 24,
		textAlign: 'center',
		color: '#6F7372',
		textAlignVertical: "center"
	},
	buttonText3: {
		fontSize: 13,
		textAlign: 'center',
		color: '#6F7372',
		textAlignVertical: 'center',
		paddingHorizontal: 10
	},
	buttonText4:{
		color:'red',
		paddingHorizontal:20,
		textAlign:'center',
		fontWeight:'bold'
	
	}
});

export default class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			user: null,
			password: null,
			msgError:null
		}
		
	}

	c

	login(){
		loginRequest("login", {user:this.state.user, pass:this.state.password, cdAplicacion:"APP_WEB"}).then((val)=>{
			if(val.valid){
				AsyncStorage.setItem("userInfo", JSON.stringify(val));
				this.props.navigation.navigate('ESTADO ACTUAL DE LOS COMERCIOS');
			}else{
				this.setState({msgError:val.msn})
			}	
		})
		
	}
	render() {
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
					<Image source={require('../images/header.png')} style={{ width: 200, height: 40, marginLeft: 20 }}></Image>
				</View>
				<ImageBackground source={require('../images/fondo.png')} style={styles.backgroundImage}>
					<ScrollView style={styles.login}>
						<View style={styles.loginconten}>

							<View style={styles.inputContainer}>
								<Text style={styles.logintext}>USUARIO:</Text>
								<TextInput
									value={this.state.user}
									underlineColorAndroid='transparent'
									onChangeText={(value) => {this.setState({user:value})}}
									style={styles.input}
									placeholder='Username' />
							</View>
							<View style={styles.inputContainer}>
								<Text style={styles.logintext}>CONTRASEÑA:</Text>
								<TextInput value={this.state.password}
									secureTextEntry={true} 
									underlineColorAndroid='transparent'
									style={styles.input} 
									placeholder='Password'
									onChangeText={(value) => {this.setState({password:value})}} />

							</View>
							<View style={{ alignContent: 'center', flexDirection: 'row', }}>
								<Text style={styles.buttonText4}>{this.state.msgError}</Text>
							</View>
							<View style={{ alignContent: 'center', justifyContent: 'center' }}>
								<TouchableOpacity onPress={() => this.login() } style={styles.buttonContaines}>
									<Text style={styles.buttonText}>INGRESAR</Text>
								</TouchableOpacity>
							</View>
							<View style={{ alignContent: 'center', flexDirection: 'row', alignItems: "center", marginBottom: 20, display:"none" }}>
								<TouchableOpacity onPress={this.login} style={styles.buttonsecond} >
									<Text style={styles.buttonText1}>Registrarse</Text>
								</TouchableOpacity>
								<View style={styles.buttonPipe}></View>
								<TouchableOpacity onPress={this.login} style={styles.buttonsecond2} >
									<Text style={styles.buttonText1}>Olvidó su contraseña</Text>
								</TouchableOpacity>
							</View>
							<View style={{ alignContent: 'center', flexDirection: 'row', }}>
								<Text style={styles.buttonText2}>Business Intelligence </Text>
							</View>
							<View style={{ alignContent: 'center', flexDirection: 'row', }}>
								<Text style={styles.buttonText3}>DataVentas es una herramienta tecnológica inteligente enfocada en conocer a profundidad tus clientes para lograr crecimiento en ventas </Text>
							</View>

						</View>
					</ScrollView>
				</ImageBackground>
			</View>
		);
	}
}
