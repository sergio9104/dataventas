import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import Svg, { Circle, Path, Text as SvgText } from 'react-native-svg';

export default class Arc extends Component {
  constructor(props) {
    super();
    let endAngle = Math.PI / 2;
    if (props.startAngle > endAngle) {
      var s = props.startAngle;
      props.startAngle = endAngle;
      endAngle = s;
    }
    if (endAngle - props.startAngle > Math.PI * 2) {
      endAngle = Math.PI * 1.99999;
    }

    var largeArc = endAngle - props.startAngle <= Math.PI ? 0 : 1;

    this.state = {
      r: props.r,
      startAngle: props.startAngle,
      endAngle: endAngle,
      largeArc: largeArc,
      fill: props.fill,
      opacity: props.opacity,
      text: props.text,
      textCenter: props.textCenter,
      isPrincipal: props.isPrincipal,
    };
  }

  render() {
    return (
      <View>
        <Svg width={this.state.r * 2} height={this.state.r * 2}>
          <Circle
            cx={this.state.r}
            cy={this.state.r}
            r={this.state.r - 0.5}
            fill="#E5E5E5"
          />
          <Path
            d={`M ${this.state.r} ${this.state.r} 
              L ${this.state.r + Math.cos(this.state.startAngle) * this.state.r} ${this.state.r - Math.sin(this.state.startAngle) * this.state.r}
              A ${this.state.r} ${this.state.r} 0 ${this.state.largeArc} 0 ${this.state.r + Math.cos(this.state.endAngle) * this.state.r} ${this.state.r - Math.sin(this.state.endAngle) * this.state.r}
              L ${this.state.r} ${this.state.r}
              `}
            fill={this.state.fill}
            opacity={this.state.opacity}
          />

          <Circle
            cx={this.state.r}
            cy={this.state.r}
            r={this.state.r * 0.8}
            fill="white"
          />
          <SvgText
            x={this.state.r}
            y={
              this.state.r - (this.state.r / 5)
            }
            fill={"#989898"}
            textAnchor="middle"
            fontSize={
              this.state.r / 4
            }
            dy={
              this.state.r / 4
            }>
            {this.state.textCenter}
          </SvgText>
        </Svg>
        <Text
          style={{
            textAlign: 'center',
            color: "#989898",
            fontSize: 12,
          }}
          color={"#989898"}>
          {this.state.text}
        </Text>
      </View>
    );
  }
}