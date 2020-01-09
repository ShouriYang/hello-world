import React, { Component } from 'react';
import Content from './components/searchContent';
import './css/index.less';
class ErrorSearch extends Component {
  state = {};
  render() {
    return (
      <div className="search">
        <div className="search-content">
          <Content />
        </div>
      </div>
    );
  }
}

export default ErrorSearch;
