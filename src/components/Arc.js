import React, { Component } from 'react';
import {
  Text,
  View
} from 'react-native';
import Svg, { Circle, Path, Text as SvgText } from 'react-native-svg';

export default class Arc extends Component {
  constructor(props) {
    super(props);

    this.state = {
      endAngle: 0,
      largeArc: 0,
      percentage:0
    };
  }

  componentDidMount() {
    this.graphArc(this.rad(this.props.percentage));
  }

  graphArc(angle) {
    let endAngle = Math.PI / 2;
    if (angle > endAngle) {
      var s = angle;
      angle = endAngle;
      endAngle = s;
    }
    if (endAngle - angle > Math.PI * 2) {
      endAngle = Math.PI * 1.99999;
    }

    var largeArc = endAngle - angle <= Math.PI ? 0 : 1;
    this.setState({ largeArc, endAngle,  percentage:angle})
  }

  rad(val) {
    if (val > 99.99) {
      val = 100;
    }
    let x = 1.9999 * val / 100;
    return -Math.PI * (x - 0.49999);
  };


  componentWillReceiveProps(nextProps) {
    if (this.props.percentage != nextProps.percentage) {
      this.graphArc(this.rad(nextProps.percentage));
    }
  }

  render() {
    return (
      <View>
        <Svg width={this.props.r * 2} height={this.props.r * 2}>
          <Circle
            cx={this.props.r}
            cy={this.props.r}
            r={this.props.r - 0.5}
            fill="#E5E5E5"
          />
          <Path
            d={`M ${this.props.r} ${this.props.r} 
              L ${this.props.r + Math.cos(this.state.percentage) * this.props.r} ${this.props.r - Math.sin(this.state.percentage) * this.props.r}
              A ${this.props.r} ${this.props.r} 0 ${this.state.largeArc} 0 ${this.props.r + Math.cos(this.state.endAngle) * this.props.r} ${this.props.r - Math.sin(this.state.endAngle) * this.props.r}
              L ${this.props.r} ${this.props.r}
              `}
            fill={this.props.fill}
            opacity={this.props.opacity}
          />

          <Circle
            cx={this.props.r}
            cy={this.props.r}
            r={this.props.r * 0.8}
            fill="white"
          />
          <SvgText
            x={this.props.r}
            y={
              this.props.r - (this.props.r / 5)
            }
            fill={"#989898"}
            textAnchor="middle"
            fontSize={
              this.props.r / 4
            }
            dy={
              this.props.r / 4
            }>
            {this.props.textCenter}
          </SvgText>
        </Svg>
        <Text
          style={{
            textAlign: 'center',
            color: "#989898",
            fontSize: 12,
          }}
          color={"#989898"}>
          {this.props.text}
        </Text>
      </View>
    );
  }
}