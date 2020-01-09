import React, { Component } from 'react';
import store from '../../mobx/productStore';
import { observer } from 'mobx-react';
import { Input } from 'antd';
import Create from './productCreate';
import Content from './productContent';
import './css/index.less';
const { Search } = Input;
@observer
class Product extends Component {
  state = {};
  componentDidMount() {
    store.searchValue = '';
    console.log(store.userId, store.createPerson);
  }
  onSearch = value => {
    store.searchValue = value;
    console.log(store.searchValue);
    store.searchProduct();
  };
  render() {
    return (
      <div className="product">
        <div className="product-header">
          <div className="product-header-input">
            <Search
              placeholder="查找产品"
              onSearch={this.onSearch}
              enterButton
            />
          </div>
          <div className="product-header-create">
            <Create />
          </div>
        </div>
        <div className="product-content">
          <Content />
        </div>
      </div>
    );
  }
}

export default Product;
