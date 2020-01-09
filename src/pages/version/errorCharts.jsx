import React, { Component } from 'react';
import Content from './components/chartsContent';
import './css/index.less';
class ErrorCharts extends Component {
  state = {};
  render() {
    return (
      <div className="charts">
        <div className="charts-content">
          <Content />
        </div>
      </div>
    );
  }
}

export default ErrorCharts;
