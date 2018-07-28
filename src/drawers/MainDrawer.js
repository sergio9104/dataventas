import React, { Component } from 'react';
import {
	View,
	Text,
	ScrollView

} from 'react-native';

import { DrawerItems } from 'react-navigation';



class MainDrawer extends Component {
	constructor(props) {
		super(props);
		
	}

	
	render(){
		return <View style={{backgroundColor:"#000000", paddingTop: 35, flex:1 }}>
						<ScrollView>
						
                <DrawerItems
                  {...this.props}
                  getLabel = {(scene) => (
                    <View style={{borderBottomWidth:1, borderBottomColor:'#fff', width:'100%'}}>
                      <Text style={{color:"#FFF",margin:10}} >{this.props.getLabel(scene)} </Text>
                    </View>
                  )}
                />
              </ScrollView>
		</View>
	}
}

export default MainDrawer;
