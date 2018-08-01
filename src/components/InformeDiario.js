import React from 'react';
import {
	ScrollView,
	StatusBar,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
	Platform,
	ImageBackground,
	Image,
	RefreshControl,
	AsyncStorage
} from 'react-native';
import { Ionicons as Icon } from '@expo/vector-icons';
import Arc from './Arc.js';


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

	},
	chartsSpace:{
		marginHorizontal:5,
		marginVertical:5
	}



});

export default class InformeDiario extends React.Component {
	constructor() {
		super();
		this.state = {
			showGraph: false,
			inputValue: '',
			perc: 100,
			valueToday: 1250870,
			data: [],
			day: ['Dom.', 'Lun.', 'Mar.', 'Mie.', 'Jue.', 'Vie.', 'Sab.'],
			dayComplete: ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'],
			monthNames: [
				'enero',
				'febrero',
				'marzo',
				'abril',
				'mayo',
				'junio',
				'julio',
				'agosto',
				'septiembre',
				'octubre',
				'noviembre',
				'diciembre',
			],
			today: new Date(),
			showValue: new Date(),
			promedioVentas: 0,
			refreshing: false,
			error: '',
		};
	}

	_handleTextChange = inputValue => {
		this.setState({ inputValue });
	};

	_handleButtonPress = () => {
		this.getData();
	};

	componentDidMount = () => {
		AsyncStorage.getItem('DATA', (err, result) => {
			if (result) {
				this.setState({ inputValue: result }, () => {
					this.setState({
						promedioVentas: this.promedioVentas()
					}, () => {
						this.getData();
					});
				});
			}
		});
	}

	clearData = () => {
		AsyncStorage.clear();
		this.setState({
			showGraph: false,
			refreshing: false,
			perc: 0,
			valueToday: 0,
			data: []
		});
	}

	getData() {

	}

	porcentaje = val => {
		if (val > 99.99) {
			val = 100;
		}
		let x = 1.9999 * val / 100;
		return -Math.PI * (x - 0.49999);
	};

	promedioVentas = () => {
		let total = 0;
		for (let value of this.state.data) {
			total = total + value.totalVentasDia;
		}

		return total / this.state.data.length;
	};

	ventasHoy = () => {
		this.state.data.map((value, index) => {
			if (
				new Date(value.fechaReferencia).getFullYear() ===
				this.state.today.getFullYear() &&
				new Date(value.fechaReferencia).getMonth() ===
				this.state.today.getMonth() &&
				new Date(value.fechaReferencia).getDate() == this.state.today.getDate()
			) {

				let newItem = this.state.data.slice();
				newItem[index].color = "#2fcc37";
				this.setState({ perc: value.porcentajeVentas, valueToday: value.totalVentasDia, data: newItem, showValue: new Date(value.fechaReferencia), showGraph: false }, () => {
					this.setState({ showGraph: true });
				});
			}
		})

	};

	valueResetColor = (index, value) => {
		let newItem = this.state.data.slice();
		newItem.map((value) => {
			value.color = "white";
			return value;
		});
		newItem[index].color = "#2fcc37";

		this.setState({ perc: value.porcentajeVentas, valueToday: value.totalVentasDia, data: newItem, showGraph: false, showValue: new Date(value.fechaReferencia) }, () => {
			this.setState({ showGraph: true });
		});
	}

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
					<ScrollView
						refreshControl={
							<RefreshControl
								refreshing={this.state.refreshing}
								onRefresh={this.getData.bind(this)}
							/>
						}>
						
						<Text style={{ color: "#76BA75", fontSize: 20, marginTop: 10, textAlign:"center" }}>
									{(
										this.state.showValue.getFullYear() ===
										this.state.today.getFullYear() &&
										this.state.showValue.getMonth() ===
										this.state.today.getMonth() &&
										this.state.showValue.getDate() == this.state.today.getDate()
									) ? "hoy" : this.state.dayComplete[this.state.showValue.getDay()]},
                {' '}
									{this.state.showValue.getDate()}
									{' '}
									de
				{' '}
									{this.state.monthNames[this.state.showValue.getMonth()]}
									{' '}
								</Text>
									
							<Text style={{ color: "#959595", marginBottom: 20, textAlign:"center" }}>
								Información en tiempo real de ventas totales del grupo de comercio
							</Text>
								<View style={{
							flexDirection:"row",
							flexWrap:"wrap",
							justifyContent:"center",
							alignItems:"center"
						}}>
							<View style={{alignItems: 'center',
							paddingHorizontal: 10,
						width:300}}>

							
						

							<Arc
								r={100}
								startAngle={this.porcentaje(this.state.perc)}
								fill="#74BA74"
								opacity={1}
								textCenter={
									'$' +
									Math.floor(this.state.valueToday + 0.5)
										.toFixed()
										.replace(/(\d)(?=(\d{3})+(,|$))/g, '$1,')
								}
							/>

							<View style={{flexDirection:"row", alignItems:"center", marginBottom:5}}><Text>TOTAL VENTA MES</Text><Text style={{color:"white", backgroundColor:"#74BA74", paddingHorizontal:20, paddingVertical:5, marginLeft:20, fontWeight:"bold"}}>$1.000.000</Text></View>
							<View><Text>TOTAL DE LAS VENTAS SEMANA 4-10 JUNIO</Text></View>
							</View>
							<View style={{flexDirection:"row", flexWrap:"wrap", justifyContent:"center",
						width:300}}>
								<TouchableOpacity style={styles.chartsSpace} onPress={() => { }}>
									<Arc
										r={40}
										startAngle={this.porcentaje(100)}
										fill={"#74BA74"}
										opacity={1}
										text={"COMERCIO1"}
										textCenter={Math.floor(100 + 0.5) + '%'}
										onPress={() => { }}
									/>
								</TouchableOpacity >
								<TouchableOpacity style={styles.chartsSpace} onPress={() => { }}>
									<Arc
										r={40}
										startAngle={this.porcentaje(50)}
										fill={"#82D8F9"}
										opacity={1}
										text={"COMERCIO2"}
										textCenter={Math.floor(50 + 0.5) + '%'}
										onPress={() => { }}
									/>
								</TouchableOpacity >
								<TouchableOpacity style={styles.chartsSpace} onPress={() => { }}>
									<Arc
										r={40}
										startAngle={this.porcentaje(80)}
										fill={"#82D8F9"}
										opacity={1}
										text={"COMERCIO3"}
										textCenter={Math.floor(80 + 0.5) + '%'}
										onPress={() => { }}
									/>
								</TouchableOpacity >
								<TouchableOpacity style={styles.chartsSpace} onPress={() => { }}>
									<Arc
										r={40}
										startAngle={this.porcentaje(80)}
										fill={"#82D8F9"}
										opacity={1}
										text={"COMERCIO4"}
										textCenter={Math.floor(80 + 0.5) + '%'}
										onPress={() => { }}
									/>
								</TouchableOpacity >
								<TouchableOpacity style={styles.chartsSpace} onPress={() => { }}>
									<Arc
										r={40}
										startAngle={this.porcentaje(5)}
										fill={"#FE5655"}
										opacity={1}
										text={"COMERCIO5"}
										textCenter={Math.floor(5 + 0.5) + '%'}
										onPress={() => { }}
									/>
								</TouchableOpacity >
								<TouchableOpacity style={styles.chartsSpace} onPress={() => { }}>
									<Arc
										r={40}
										startAngle={this.porcentaje(80)}
										fill={"#82D8F9"}
										opacity={1}
										text={"COMERCIO6"}
										textCenter={Math.floor(80 + 0.5) + '%'}
										onPress={() => { }}
									/>
								</TouchableOpacity >
							</View>
						</View>
					</ScrollView>
				</ImageBackground>
			</View>
		);
	}
}
