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
		paddingTop:20
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
    backgroundMenu:{
        height: 150,
        width:140,
        display:"flex",
        alignItems:"center",
        justifyContent:"flex-end",
       
    },
    textMenu:{
        height:40
    },
    textinfo:{
        fontSize:10
    },
            
    ScrollMenu:{
        display:"flex",
        flexDirection:"row",
        justifyContent:"space-between",
        flexWrap:"wrap",
        paddingHorizontal:20
    },
    ocultar:{
        display:"none"
    }


});

export default class menu extends React.Component {

	render() {
        const menu = this.props.navigation;
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
				<ImageBackground source={require('../images/fondopag.png')} style={styles.backgroundImage}>
					<ScrollView>
                        <View style={styles.ScrollMenu}>
                        <TouchableOpacity onPress={() => menu.navigate('INFORME DIARIO')}>
                            <ImageBackground source={require('../menu/ICONOD.png')} style={styles.backgroundMenu}>
                               <View style={styles.textMenu}><Text style={styles.textinfo}  >INFORME DIARIO</Text></View>
                            </ImageBackground>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => menu.navigate('INFORME SEMANAL')}>
                            <ImageBackground source={require('../menu/ICONOS.png')} style={styles.backgroundMenu}>
                               <View style={styles.textMenu}><Text style={styles.textinfo} >INFORME SEMANAL</Text></View>
                            </ImageBackground>
                        </TouchableOpacity>  
                        <TouchableOpacity onPress={() => menu.navigate('INFORME MENSUAL')}>
                            <ImageBackground source={require('../menu/ICONOM.png')} style={styles.backgroundMenu}>
                               <View style={styles.textMenu}><Text style={styles.textinfo} >INFORME MENSUAL</Text></View>
                            </ImageBackground>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => menu.navigate('INFORME TRIMESTRAL')} style={styles.ocultar}>
                            <ImageBackground source={require('../menu/ICONOT.png')} style={styles.backgroundMenu}>
                               <View style={styles.textMenu}><Text style={styles.textinfo}>INFORME TRIMESTRAL</Text></View>
                            </ImageBackground>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => menu.navigate('INFORME ANUAL')} style={styles.ocultar}>
                            <ImageBackground source={require('../menu/ICONOA.png')} style={styles.backgroundMenu}>
                               <View style={styles.textMenu}><Text style={styles.textinfo} >INFORME ANUAL</Text></View>
                            </ImageBackground>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => menu.navigate('INFORME DIARIO')} style={styles.ocultar}>
                            <ImageBackground source={require('../menu/BUSQUEDA.png')} style={styles.backgroundMenu}>
                               <View style={styles.textMenu}><Text style={styles.textinfo} > DETALLE INFORME DIARIO</Text></View>
                            </ImageBackground>
                        </TouchableOpacity>
                       </View>
					</ScrollView>
				</ImageBackground>
			</View>
		);
	}
}