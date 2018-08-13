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
import { request, ambiente } from "./../utils.js";


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
			perc: 0,
			valueToday: 0,
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

	clearData = () => {
		AsyncStorage.clear();
		this.setState({
			showGraph: false,
			refreshing: false,
			perc: 0,
			valueToday: 0
		});
	}

	getData() {
		this.setState({ refreshing: true });
		request("consumos_" + ambiente + "/consultaventasgrupo-" + ambiente, { m: 4, periodo: "M" }, (res) => {
			res.then((res) => {
				console.log(res);
				if (res.datosPeriodos) {
					this.setState({
						data: res.datosPeriodos,
						perc: res.datosPeriodos[0].porcentajeVentas,
						valueToday: res.datosPeriodos[0].totalVentasDia,
						promedioVentas: res.totalVentasPeriodosAnteriores,
						nombreComercio: res.nombreGrupoComercio,
						refreshing: false,
						fechaReferencia: res.datosPeriodos[0].fechaReferencia,
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

	getDetalleVentaGrupo(fechaReferencia) {
		this.setState({ refreshing: true });
		request("consumos_" + ambiente + "/consultadetalleventasgrupo-" + ambiente, { fecha: fechaReferencia, periodo: "M" }, (res) => {
			res.then((res) => {
				console.log(res);
				if (res.datosComercios[0]) {
					this.setState({
						data: res.datosComercios,
						perc: res.datosComercios[0].porcentajeVentasPeriodo,
						valueToday: res.datosComercios[0].totalVentasPeriodo,
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

	getVentasComercio(idComercio) {
		this.setState({ refreshing: true });
		request("consumos_" + ambiente + "/consultaventascomercio-" + ambiente, { idComercio: idComercio, m: 4, periodo: "M" }, (res) => {
			res.then((res) => {
				console.log(res);
				if (res.datosPeriodos) {
					this.setState({
						data: res.datosPeriodos,
						perc: res.datosPeriodos[0].porcentajeVentas,
						valueToday: res.datosPeriodos[0].totalVentasDia,
						promedioVentas: res.totalVentasPeriodosAnteriores,
						nombreComercio: res.nombreGrupoComercio,
						refreshing: false,
						fechaReferencia: res.datosPeriodos[0].fechaReferencia,
						error: "",
						actualView: "consultaVentasComercio",
						nombreComercio: res.nombreGrupoComercio
					});
				} else {
					this.setState({ error: "Actualmente no se encuentran datos", refreshing: false })
				}
			})
		})
	}

	getColor(val) {
		if (val >= 100) {
			return "#74BA74"
		} else if (val >= 50) {
			return "#82D8F9"
		} else {
			return "#FE5655"
		}
	}

	consultasVentasGrupo() {
		return <ScrollView
			refreshControl={
				<RefreshControl
					refreshing={this.state.refreshing}
					onRefresh={this.getData.bind(this)}
				/>
			}>

			<Text style={{ color: "#76BA75", fontSize: 20, marginTop: 20, textAlign: "center", marginBottom: 10 }}>
				{this.state.data[0] ? this.state.data[0].fechaString : null}
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
					<TouchableOpacity style={styles.chartsSpace} onPress={() => { this.getDetalleVentaGrupo(this.state.fechaReferencia) }}>
						<Arc
							r={80}
							percentage={this.state.perc}
							fill={this.getColor(this.state.perc)}
							opacity={1}
							textCenter={
								'$' +
								Math.floor(this.state.valueToday + 0.5)
									.toFixed()
									.replace(/(\d)(?=(\d{3})+(,|$))/g, '$1,')
							}
						/>
					</TouchableOpacity >

					<Text style={{ color: "#FE5655", textAlign: "center", paddingHorizontal: 20 }}>
						{this.state.error}
					</Text>


				</View>
				<View style={{
					flexDirection: "row-reverse", flexWrap: "wrap", justifyContent: "space-between", paddingHorizontal: 10, maxWidth: 350
				}}>
					{this.state.data.map((val, index) => {
						return <TouchableOpacity key={index} style={styles.chartsSpace} onPress={() => { this.getDetalleVentaGrupo(val.fechaReferencia) }}>
							<Arc
								r={35}
								percentage={val.porcentajeVentas}
								fill={this.getColor(val.porcentajeVentas)}
								opacity={1}
								text={val.fechaCortaString}
								textCenter={Math.floor(val.porcentajeVentas + 0.5) + '%'}
							/>
						</TouchableOpacity >


					})}
				</View>
				<View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", marginBottom: 20, marginTop: 10, width: "100%" }}>
					<Text style={{ color: "white", backgroundColor: "#74BA74", paddingHorizontal: 20, paddingVertical: 5, marginLeft: 20, fontWeight: "bold" }}>TOTAL: {'$' + Math.floor(this.state.promedioVentas + 0.5).toFixed().replace(/(\d)(?=(\d{3})+(,|$))/g, '$1,')}</Text>
				</View>
				<View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 20, marginTop: 10, width: "100%", paddingHorizontal: 30 }}>
					<View style={{ justifyContent: "center", alignItems: "center" }}>
						<Image source={require("../icons/VENTAS.png")} />
						<Text style={{ color: "#959595", fontSize: 9, textAlign: "center" }}>Numero de ventas</Text>
						<Text style={{ color: "#959595", fontSize: 9, textAlign: "center" }}>{this.state.data[0] ? this.state.data[0].numeroVentas : null}</Text>
					</View>
					<View style={{ justifyContent: "center", alignItems: "center" }}>
						<Image source={require("../icons/CLIENTES.png")} />
						<Text style={{ color: "#959595", fontSize: 9, textAlign: "center" }}>Clientes fidelizados</Text>
						<Text style={{ color: "#959595", fontSize: 9, textAlign: "center" }}>{this.state.data[0] ? this.state.data[0].clientesFidelizados : null}</Text>
					</View>
					<View style={{ justifyContent: "center", alignItems: "center" }}>
						<Image source={require("../icons/TICKET.png")} />
						<Text style={{ color: "#959595", fontSize: 9, textAlign: "center" }}>Promedio ticket</Text>
						<Text style={{ color: "#959595", fontSize: 9, textAlign: "center" }}>{this.state.data[0] ? this.state.data[0].promedioTicket : null}</Text>
					</View>
				</View>
			</View>
		</ScrollView>
	}

	consultaDetalleVentasGrupo() {
		return <ScrollView
			refreshControl={
				<RefreshControl
					refreshing={this.state.refreshing}
					onRefresh={() => this.getDetalleVentaGrupo(this.state.fechaReferencia)}
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
					<TouchableOpacity style={styles.chartsSpace} onPress={() => { this.getVentasComercio(this.state.data[0] ? this.state.data[0].idComercio : null) }}>
						<Arc
							r={80}
							percentage={this.state.perc}
							fill={this.getColor(this.state.perc)}
							opacity={1}
							textCenter={
								'$' +
								Math.floor(this.state.valueToday + 0.5)
									.toFixed()
									.replace(/(\d)(?=(\d{3})+(,|$))/g, '$1,')
							}
						/>
					</TouchableOpacity >

					<Text style={{ color: "#FE5655", textAlign: "center", paddingHorizontal: 20 }}>
						{this.state.error}
					</Text>

				</View>
				<View style={{
					flexDirection: "row-reverse", flexWrap: "wrap", justifyContent: "space-between", paddingHorizontal: 10, maxWidth: 350
				}}>
					{this.state.data.map((val, index) => {

						return <TouchableOpacity key={index} style={styles.chartsSpace} onPress={() => { this.getVentasComercio(val.idComercio) }}>
							<Arc
								r={35}
								percentage={val.porcentajeVentasPeriodo}
								fill={this.getColor(val.porcentajeVentasPeriodo)}
								opacity={1}
								text={val.nombreComercio}
								textCenter={Math.floor(val.porcentajeVentasPeriodo + 0.5) + '%'}
							/>
						</TouchableOpacity >


					})}
				</View>
				<View style={{ alignItems: "center", justifyContent: "center", marginBottom: 20, marginTop: 10, width: "100%" }}>
					<Text style={{ color: "white", backgroundColor: "#74BA74", paddingHorizontal: 20, paddingVertical: 5, marginLeft: 20, fontWeight: "bold" }}>TOTAL: {'$' + Math.floor(this.state.promedioVentas + 0.5).toFixed().replace(/(\d)(?=(\d{3})+(,|$))/g, '$1,')}</Text>
				</View>

			</View>
		</ScrollView>
	}

	consultaVentasComercio() {
		return <ScrollView
			refreshControl={
				<RefreshControl
					refreshing={this.state.refreshing}
					onRefresh={this.getData.bind(this)}
				/>
			}>

			<Text style={{ color: "#76BA75", fontSize: 20, marginTop: 20, textAlign: "center", marginBottom: 10 }}>
				{this.state.data[0] ? this.state.data[0].fechaString : null}
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
					<View style={styles.chartsSpace}>
						<Arc
							r={80}
							percentage={this.state.perc}
							fill={this.getColor(this.state.perc)}
							opacity={1}
							textCenter={
								'$' +
								Math.floor(this.state.valueToday + 0.5)
									.toFixed()
									.replace(/(\d)(?=(\d{3})+(,|$))/g, '$1,')
							}
						/>
					</View >

					<Text style={{ color: "#FE5655", textAlign: "center", paddingHorizontal: 20 }}>
						{this.state.error}
					</Text>

				</View>
				<View style={{
					flexDirection: "row-reverse", flexWrap: "wrap", justifyContent: "space-between", paddingHorizontal: 10, maxWidth: 350
				}}>
					{this.state.data.map((val, index) => {

						return <View key={index} style={styles.chartsSpace}>
							<Arc
								r={35}
								percentage={val.porcentajeVentas}
								fill={this.getColor(val.porcentajeVentas)}
								opacity={1}
								text={val.fechaCortaString}
								textCenter={Math.floor(val.porcentajeVentas + 0.5) + '%'}
							/>
						</View >


					})}
				</View>
				<View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", marginBottom: 20, marginTop: 10, width: "100%" }}>
					<Text style={{ color: "white", backgroundColor: "#74BA74", paddingHorizontal: 20, paddingVertical: 5, marginLeft: 20, fontWeight: "bold" }}>TOTAL: {'$' + Math.floor(this.state.promedioVentas + 0.5).toFixed().replace(/(\d)(?=(\d{3})+(,|$))/g, '$1,')}</Text></View>
				<View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 20, marginTop: 10, width: "100%", paddingHorizontal: 30 }}>
					<View style={{ justifyContent: "center", alignItems: "center" }}>
						<Image source={require("../icons/VENTAS.png")} />
						<Text style={{ color: "#959595", fontSize: 9, textAlign: "center" }}>Numero de ventas</Text>
						<Text style={{ color: "#959595", fontSize: 9, textAlign: "center" }}>{this.state.data[0] ? this.state.data[0].numeroVentas : null}</Text>
					</View>
					<View style={{ justifyContent: "center", alignItems: "center" }}>
						<Image source={require("../icons/CLIENTES.png")} />
						<Text style={{ color: "#959595", fontSize: 9, textAlign: "center" }}>Clientes fidelizados</Text>
						<Text style={{ color: "#959595", fontSize: 9, textAlign: "center" }}>{this.state.data[0] ? this.state.data[0].clientesFidelizados : null}</Text>
					</View>
					<View style={{ justifyContent: "center", alignItems: "center" }}>
						<Image source={require("../icons/TICKET.png")} />
						<Text style={{ color: "#959595", fontSize: 9, textAlign: "center" }}>Promedio ticket</Text>
						<Text style={{ color: "#959595", fontSize: 9, textAlign: "center" }}>{this.state.data[0] ? this.state.data[0].promedioTicket : null}</Text>
					</View>
				</View>
			</View>
		</ScrollView>
	}


	getState(state) {
		if (state == "consultasVentasGrupo") {
			return this.consultasVentasGrupo()
		} else if (state == "consultaDetalleVentasGrupo") {
			return this.consultaDetalleVentasGrupo();
		} else if (state == "consultaVentasComercio") {
			return this.consultaVentasComercio();
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
					<Image source={require('../images/header.png')} style={{ width: 200, height: 40, marginLeft: 20 }}></Image>

				</View>

				<View style={styles.title}>
					<Image source={require('../icons/ICONO-INFORME-DIARIO.png')} /><Text style={styles.texttitle}>INFORME DIARIO</Text>
				</View>
				<ImageBackground source={require('../images/fondopag.png')} style={styles.backgroundImage}>
					{this.getState(this.state.actualView)}
				</ImageBackground>
			</View>
		);
	}
}
