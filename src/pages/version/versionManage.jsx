import React, { Component } from 'react';
import Content from './components/versionContent';
import { Pagination } from 'antd';
import store from '../../mobx/versionStore';
import { observer } from 'mobx-react';
import './css/index.less';
@observer
class VersionManage extends Component {
  state = {};
  pageChange = async current => {
    store.page = current;
    await store.getVersion();
  };
  render() {
    return (
      <div className="version">
        <div className="version-content">
          <Content />
        </div>
        <div className="version-pagination">
          <Pagination
            defaultPageSize={3}
            onChange={this.pageChange}
            defaultCurrent={1}
            total={store.total}
          />
        </div>
      </div>
    );
  }
}

export default VersionManage;
