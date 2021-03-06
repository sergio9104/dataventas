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
} from 'react-native';
import { Ionicons as Icon } from '@expo/vector-icons';
import Arc from '../Arc.js';
import { request, ambiente } from "../../utils.js";


const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: StatusBar.currentHeight,


	},
	innerContainer: { flex: 1, alignItems: 'center', justifyContent: 'center' },
	header: { backgroundColor: '#F7F7F7', padding: 10, paddingHorizontal: 15, paddingTop: Platform.OS === 'ios' ? 13 : 7, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
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
		justifyContent: 'space-between',
		alignItems: "center",
		paddingHorizontal: 20


	},
	texttitle: {
		color: '#FFF',
		fontSize: 16,
		textAlign: 'center',
		textAlignVertical: 'center',
		marginLeft: 10

	},
	chartsSpace: {
		marginHorizontal: 5,
		marginVertical: 5
	}



});

export default class InformeDiarioDetalle extends React.Component {
	constructor() {
		super();
		this.state = {
			showGraph: false,
			data: [],
			dataReverse: [],
			dataSelected: { porcentajeVentasPeriodo: 0, totalVentasPeriodo: 0 },
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
			promedioVentas: 0,
			refreshing: false,
			error: '',
			nombreComercio: "",
			fechaReferencia: "",
			actualView: "consultasVentasGrupo",
			nombreComercio: ""
		};
	}

	_handleButtonPress = () => {
		this.getData();
	};

	componentDidMount = () => {
		this.getData();
	}

	getData() {
		this.setState({ refreshing: true });
		request("consumos_" + ambiente + "/consultadetalleventasgrupo-" + ambiente, { fecha: this.props.navigation.getParam('date'), periodo: "D", m: 8 }, (res) => {
			res.then((res) => {
				if (res.datosComercios[0]) {
					let dataReverse = res.datosComercios.slice().reverse();
					let dataTwoDimesions = [];
					for (let x = 0; x < dataReverse.length / 4; x++) {
						dataTwoDimesions.push(dataReverse.slice(((4 * x)), ((4 * x) + 4)));
					}

					this.setState({
						data: res.datosComercios,
						dataReverse: dataTwoDimesions,
						dataSelected: res.datosComercios[0],
						promedioVentas: res.totalVentasPeriodo,
						nombreComercio: res.nombreGrupoComercio,
						refreshing: false,
						fechaReferencia: res.fechaString,
						error: "",
						actualView: "consultaDetalleVentasGrupo",
						nombreComercio: res.nombreGrupoComercio
					});
				} else {
					this.setState({ error: "Actualmente no se encuentran datos", refreshing: false })
				}

			})
		})
	}




	getColor(val) {
		if (val >= 500) {
			return "#3BA1DA"
		} else if (val >= 400) {
			return "#36ACE2"
		} else if (val >= 300) {
			return "#3AB9EC"
		} else if (val >= 200) {
			return "#3DBFEF"
		} else if (val >= 100) {
			return "#49C2ED"
		} else {
			return "#56C3E8"
		}
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
					<TouchableOpacity onPress={() => {
						this.props.navigation.navigate('MENU');
					}}>
						<Image source={require('../../images/header.jpeg')} style={{ width: 200, height: 40, marginLeft: 20 }}></Image>
					</TouchableOpacity>

				</View>
				<View style={styles.title}>
					<TouchableOpacity onPress={() => this.props.navigation.navigate("INFORME DIARIO")}><Text> <Icon name="ios-arrow-back" size={26} color='#FFF' /></Text></TouchableOpacity><View style={{ flexDirection: "row" }}><Image source={require('../../icons/ICONO-INFORME-DIARIO.png')} /><Text style={styles.texttitle}>INFORME DIARIO</Text></View><View></View>
				</View>
				<ImageBackground source={require('../../images/fondopag.png')} style={styles.backgroundImage}>
					<ScrollView
						refreshControl={
							<RefreshControl
								refreshing={this.state.refreshing}
								onRefresh={() => this.getData()}
							/>
						}>

						<Text style={{ color: "#76BA75", fontSize: 20, marginTop: 20, textAlign: "center", marginBottom: 10 }}>
							{this.state.fechaReferencia}
						</Text>

						<Text style={{ color: "#959595", marginBottom: 20, textAlign: "center", paddingHorizontal: 20 }}>
							Información en tiempo real de ventas totales de {this.state.nombreComercio}
						</Text>
						<View style={{
							flexDirection: "row",
							flexWrap: "wrap",
							justifyContent: "center",
							alignItems: "center"
						}}>
							<View style={{
								alignItems: 'center',
								paddingHorizontal: 10,
								width: 250
							}}>
								<TouchableOpacity style={styles.chartsSpace} onPress={() => { this.props.navigation.navigate('VENTAS COMERCIO', { IdComercio: this.state.data[0] ? this.state.dataSelected.idComercio : null, date: this.props.navigation.getParam('date') }) }}>
									<Arc
										r={80}
										percentage={100}
										fill={this.getColor(100)}
										opacity={1}
										textCenter={
											'$' +
											Math.floor(this.state.promedioVentas + 0.5)
												.toFixed()
												.replace(/(\d)(?=(\d{3})+(,|$))/g, '$1,')
										}
										isNumeric
										textBold
									/>
								</TouchableOpacity >
								<Text style={{ color: "#FE5655", textAlign: "center", paddingHorizontal: 20 }}>
									{this.state.error}
								</Text>
							</View>
							<View style={{ width: 350, height: 380, paddingHorizontal: 10 }}>
								<ScrollView horizontal>
									<View style={{ display: "flex", flexDirection: "column", flexWrap: "wrap" }}>
										{this.state.dataReverse.map((val, index) => {
											return <View key={index} style={{ display: "flex", flexDirection: "row", height: 120 }}>
												{val.map((val2, index2) => {
													return <TouchableOpacity key={index2} style={styles.chartsSpace} onPress={() => { this.props.navigation.navigate('VENTAS COMERCIO', { IdComercio: val2.idComercio, date: this.props.navigation.getParam('date') }) }}>
														<Arc
															r={35}
															percentage={val2.porcentajeVentasPeriodo}
															fill={this.getColor(val2.porcentajeVentasPeriodo)}
															opacity={1}
															text={val2.nombreComercio}
															textCenter={Math.floor(val2.porcentajeVentasPeriodo + 0.5) + '%'}
														/>
													</TouchableOpacity >
												})}
											</View>
										})}
									</View>

								</ScrollView>
							</View>

							<View style={{ alignItems: "center", justifyContent: "center", marginBottom: 20, marginTop: 10, width: "100%" }}>
								<Text style={{ color: "white", backgroundColor: "#74BA74", paddingHorizontal: 20, paddingVertical: 5, fontWeight: "bold" }}>TOTAL: {'$' + Math.floor(this.state.promedioVentas + 0.5).toFixed().replace(/(\d)(?=(\d{3})+(,|$))/g, '$1,')}</Text>
							</View>

						</View>
					</ScrollView>
				</ImageBackground>
			</View>
		);
	}
}
