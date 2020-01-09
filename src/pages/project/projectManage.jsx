import React, { Component } from 'react';
import { Input } from 'antd';
import store from '../../mobx/projectStore';
import { observer } from 'mobx-react';
import Create from './projectCreate';
import Content from './projectContent';
import './css/index.less';
const { Search } = Input;
@observer
class ProjectManage extends Component {
  state = {};
  componentDidMount() {
    store.searchValue = '';
  }
  onSearch = async value => {
    store.searchValue = value;
    await store.searchProject();
  };
  render() {
    return (
      <div className="project">
        <div className="project-header">
          <div className="project-header-input">
            <Search
              placeholder="查找项目"
              onSearch={this.onSearch}
              enterButton
            />
          </div>
          <div className="project-header-create">
            <Create />
          </div>
        </div>
        <div className="project-content">
          <Content />
        </div>
      </div>
    );
  }
}

export default ProjectManage;
