import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Layout } from 'antd';
import LeftNav from '../../components/left-nav/left-nav';
import Header from '../../components/header/header';
import versionManage from './versionManage';
import errorCharts from './errorCharts';
import getVersionMenu from '../../config/versionConfig';
const { Sider, Content } = Layout;

//管理的路由组件
class Project extends Component {
  state = {};
  static propTypes = {
    location: PropTypes.any
  };
  render() {
    const path = this.props.location.pathname;
    const projectId = path.split('/')[3];
    const versionList = getVersionMenu(projectId);
    return (
      <div>
        <Layout style={{ height: '100%' }}>
          <Sider>
            <LeftNav menuList={versionList} />
          </Sider>
          <Layout>
            <Header menuList={versionList}>head</Header>
            <Content
              style={{
                margin: '1rem 1rem 0 1rem',
                backgroundColor: '#fff',
                minHeight: 'auto'
              }}
            >
              <Switch>
                <Route
                  path={`/product/project/${projectId}/version`}
                  component={versionManage}
                />
                <Route
                  path={`/product/project/${projectId}/error`}
                  component={errorCharts}
                />
              </Switch>
            </Content>
          </Layout>
        </Layout>
      </div>
    );
  }
}

export default Project;
