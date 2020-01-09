import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Layout } from 'antd';
import LeftNav from '../../components/left-nav/left-nav';
import Header from '../../components/header/header';
import ProjectManage from './projectManage';
import getProjectMenu from '../../config/projectConfig';
const { Sider, Content } = Layout;

//管理的路由组件
class Project extends Component {
  state = {};
  static propTypes = {
    location: PropTypes.any
  };
  render() {
    const path = this.props.location.pathname;
    const productId = path.split('/')[2];
    const projectList = getProjectMenu(productId);
    return (
      <div>
        <Layout style={{ height: '100%' }}>
          <Sider>
            <LeftNav menuList={projectList} />
          </Sider>
          <Layout>
            <Header menuList={projectList}>head</Header>
            <Content
              style={{
                margin: '1rem 1rem 0 1rem',
                backgroundColor: '#fff',
                minHeight: 'auto'
              }}
            >
              <Switch>
                <Route
                  path={`/product/${productId}/project`}
                  component={ProjectManage}
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
