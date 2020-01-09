import React, { Component } from 'react';
import { Empty } from 'antd';
/* 首页路由*/
class Home extends Component {
  state = {};
  render() {
    return (
      <div>
        <Empty imageStyle={{ height: '25rem' }} />
      </div>
    );
  }
}

export default Home;
