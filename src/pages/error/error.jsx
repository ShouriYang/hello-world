import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Layout } from 'antd';
import LeftNav from '../../components/left-nav/left-nav';
import Header from '../../components/header/header';
// import errorCharts from './errorCharts';
import errorSearch from './errorSearch';
import getErrorMenu from '../../config/errorConfig';
const { Sider, Content } = Layout;

//管理的路由组件
class ErrorDeatil extends Component {
  state = {};
  static propTypes = {
    location: PropTypes.any
  };
  render() {
    const path = this.props.location.pathname;
    const versionId = path.split('/')[4];
    const errorList = getErrorMenu(versionId);
    return (
      <div>
        <Layout style={{ height: '100%' }}>
          <Sider>
            <LeftNav menuList={errorList} />
          </Sider>
          <Layout>
            <Header menuList={errorList}>head</Header>
            <Content
              style={{
                margin: '1rem 1rem 0 1rem',
                backgroundColor: '#fff',
                minHeight: 'auto'
              }}
            >
              <Switch>
                <Route
                  path="/product/project/version/:versionId/error"
                  component={errorSearch}
                />
              </Switch>
            </Content>
          </Layout>
        </Layout>
      </div>
    );
  }
}

export default ErrorDeatil;
