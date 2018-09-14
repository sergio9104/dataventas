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
	chartsSpace: {
		marginHorizontal: 5,
		marginVertical: 5
	}
});

export default class InformeMensual extends React.Component {
	constructor() {
		super();
		this.state = {
			showGraph: false,
			data: [],
			dataReverse: [],
			dataSelected: { porcentajeVentas: 0, totalVentasDia: 0 },
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
		request("consumos_" + ambiente + "/consultaventasgrupo-" + ambiente, { m: 4, periodo: "M" }, (res) => {
			res.then((res) => {

				if (res.datosPeriodos) {
					this.setState({
						data: res.datosPeriodos,
						dataReverse: res.datosPeriodos.slice().reverse(),
						dataSelected: res.datosPeriodos[0],
						promedioVentas: res.totalVentasPeriodosAnteriores,
						nombreComercio: res.nombreGrupoComercio,
						refreshing: false,
						error: "",
						actualView: "consultasVentasGrupo",
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
				<Image source={require('../../icons/ICONO-INFORME-MENSUAL.png')} /><Text style={styles.texttitle}>INFORME MENSUAL</Text>
				</View>
				<ImageBackground source={require('../../images/fondopag.png')} style={styles.backgroundImage}>
					<ScrollView
						refreshControl={
							<RefreshControl
								refreshing={this.state.refreshing}
								onRefresh={this.getData.bind(this)}
							/>
						}>

						<Text style={{ color: "#76BA75", fontSize: 20, marginTop: 20, textAlign: "center", marginBottom: 10 }}>
							{this.state.data[0] ? this.state.dataSelected.fechaString : null}
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
								paddingHorizontal: 20,
								width: 250
							}}>
								<TouchableOpacity style={styles.chartsSpace} onPress={() => { this.props.navigation.navigate('INFORME DETALLE MENSUAL', { date: this.state.dataSelected.fechaReferencia}) }}>
									<Arc
										r={80}
										percentage={this.state.dataSelected.porcentajeVentas}
										fill={this.getColor(this.state.dataSelected.porcentajeVentas)}
										opacity={1}
										textCenter={
											'$' +
											Math.floor(this.state.dataSelected.totalVentasDia + 0.5)
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
							<View style={{
								flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", paddingHorizontal: 10, width: 350
							}}>
								{this.state.dataReverse.map((val, index) => {
									return <TouchableOpacity key={index} style={styles.chartsSpace} onPress={() => { this.setState({ dataSelected: val }) }}>
										<Arc
											r={35}
											percentage={val.porcentajeVentas}
											fill={this.getColor(val.porcentajeVentas)}
											opacity={1}
											text={val.fechaCortaString}
											textCenter={Math.floor(val.porcentajeVentas + 0.5) + '%'}
											textBold={this.state.dataSelected.fechaCortaString == val.fechaCortaString}
										/>
									</TouchableOpacity >


								})}
							</View>
							<View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", marginBottom: 20, marginTop: 10, width: "100%" }}>
								<Text style={{ color: "white", backgroundColor: "#74BA74", paddingHorizontal: 20, paddingVertical: 5, fontWeight: "bold" }}>TOTAL: {'$' + Math.floor(this.state.promedioVentas + 0.5).toFixed().replace(/(\d)(?=(\d{3})+(,|$))/g, '$1,')}</Text>
							</View>
							<View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 20, marginTop: 10, width: "100%", paddingHorizontal: 30 }}>
								<View style={{ justifyContent: "center", alignItems: "center" }}>
									<Image source={require("../../icons/VENTAS.png")} />
									<Text style={{ color: "#959595", fontSize: 9, textAlign: "center", fontWeight: "bold" }}>NÚMERO DE VENTAS</Text>
									<Text style={{ color: "#959595", fontSize: 9, textAlign: "center" }}>{this.state.data[0] ? this.state.dataSelected.numeroVentas : null}</Text>
								</View>
								<View style={{ justifyContent: "center", alignItems: "center" }}>
									<Image source={require("../../icons/CLIENTES.png")} />
									<Text style={{ color: "#959595", fontSize: 9, textAlign: "center", fontWeight: "bold" }}>CLIENTES FIDELIZADOS</Text>
									<Text style={{ color: "#959595", fontSize: 9, textAlign: "center" }}>{this.state.data[0] ? this.state.dataSelected.clientesFidelizados : null}</Text>
								</View>
								<View style={{ justifyContent: "center", alignItems: "center" }}>
									<Image source={require("../../icons/TICKET.png")} />
									<Text style={{ color: "#959595", fontSize: 9, textAlign: "center", fontWeight: "bold" }}>PROMEDIO TICKETS</Text>
									<Text style={{ color: "#959595", fontSize: 9, textAlign: "center" }}>{this.state.data[0] ? '$' + Math.floor(this.state.dataSelected.promedioTicket + 0.5).toFixed().replace(/(\d)(?=(\d{3})+(,|$))/g, '$1,') : null}</Text>
								</View>
							</View>
						</View>
					</ScrollView>
				</ImageBackground>
			</View>
		);
	}
}
