import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Menu, Icon } from 'antd';
import logo from '../../assets/images/logo.png';
import './index.less';
const { SubMenu } = Menu;
class LeftNav extends Component {
  //根据menu的数据数组生成对应的标签数组
  // eslint-disable-next-line no-shadow
  // getMenuNodes = menuList => {
  //   return menuList.map(item => {
  //     // {
  //     //   title: '产品',
  //     //   key: '/product',
  //     //   icon: 'switcher'
  //     //   children: []
  //     // }
  //     if (!item.children) {
  //       return (
  //         <Menu.Item key={item.key}>
  //           <Link to={item.key}>
  //             <Icon type={item.icon} />
  //             <span>{item.title}</span>
  //           </Link>
  //         </Menu.Item>
  //       );
  //     } else {
  //       return (
  //         <SubMenu
  //           key={item.key}
  //           title={
  //             <span>
  //               <Icon type={item.icon} />
  //               <span>{item.title}</span>
  //             </span>
  //           }
  //         >
  //           {this.getMenuNodes(item.children)}
  //         </SubMenu>
  //       );
  //     }
  //   });
  // };
  static propTypes = {
    location: PropTypes.any,
    menuList: PropTypes.array.isRequired
  };
  // eslint-disable-next-line no-shadow
  getMenuNodes = menuList => {
    return menuList.reduce((pre, item) => {
      //pre是上次统计的结果
      //向pre中添加<menu.item>/<submenu.item>
      if (!item.children) {
        pre.push(
          <Menu.Item key={item.key}>
            <Link to={item.key}>
              <Icon type={item.icon} />
              <span>{item.title}</span>
            </Link>
          </Menu.Item>
        );
      } else {
        pre.push(
          <SubMenu
            key={item.key}
            title={
              <span>
                <Icon type={item.icon} />
                <span>{item.title}</span>
              </span>
            }
          >
            {this.getMenuNodes(item.children)}
          </SubMenu>
        );
      }
      return pre;
    }, []);
  };
  render() {
    const path = this.props.location.pathname;
    return (
      <div className="left-nav">
        <Link to="/product" className="left-nav-header">
          <img src={logo} alt="logo" />
          <h1>source-map</h1>
        </Link>
        <Menu
          mode="inline"
          theme="dark"
          defaultSelectedKeys={[path === '/' ? '/product' : path]}
        >
          {this.getMenuNodes(this.props.menuList)}
        </Menu>
      </div>
    );
  }
}
//包装非路由组件，返回新组件，向被包装的组件传递 history location match
export default withRouter(LeftNav);
