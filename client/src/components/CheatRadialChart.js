import React, { Component } from 'react';
import '../../node_modules/react-vis/dist/style.css';
import {RadialChart, Hint, DiscreteColorLegend} from "react-vis";


export default class CheatRadialChart extends Component {
  state = {
    value: {},
    data: []
  }

  render() {

    const {value} = this.state;


    return (
      <div>
      <RadialChart
        className={'donut-chart-example'}
        innerRadius={100}
        radius={200}
        getAngle={d => d.theta}
        data={this.props.chartData}
        showLabels={false}
        colorType="literal"
        width={1000}
        height={500}
        >
        
        <Hint value={value}>
          <div className="col-12 d-flex text-center">
            <h5>{value.label} {value.theta}</h5>
          </div>
        </Hint>

      </RadialChart>
      <DiscreteColorLegend
          orientation="horizontal"
          width={1000}
          items={this.props.legendData}
          className="d-none d-md-block"
      />
      <DiscreteColorLegend
          orientation="vertical"
          width={1000}
          items={this.props.legendData}
          className="d-md-none"
      />

    </div>
    );
  }
}

// Props for Radial Chart That Will Add Hover - Not Used
// onValueMouseOver={v => this.setState({value: v})}
// onSeriesMouseOut={v => this.setState({value: {}})}