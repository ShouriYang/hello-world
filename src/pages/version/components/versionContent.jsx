import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import store from '../../../mobx/versionStore';
import PropTypes from 'prop-types';
import {
  Descriptions,
  Badge,
  Modal,
  Divider,
  Button,
  Tag,
  Icon,
  Empty
} from 'antd';
import { observer } from 'mobx-react';
const { confirm } = Modal;
@observer
class Content extends Component {
  state = {};
  static propTypes = {
    location: PropTypes.any
  };
  componentDidMount() {
    store.projectId = this.props.location.pathname.split('/')[3];
    console.log(store.projectId);
    this.getVersion();
  }
  getVersion = async () => {
    await store.getVersion(store.projectId);
    console.log(store.list);
  };
  delete = id => {
    confirm({
      title: '你确定要删除这个项目吗？',
      okText: '是',
      okType: 'danger',
      cancelText: '否',
      async onOk() {
        await store.deleteProject(id);
        await store.getProject(store.projectId);
        console.log('ok');
      },
      onCancel() {
        console.log('Cancel');
      }
    });
  };
  render() {
    const list = store.list;
    if (list.length === 0) {
      return <Empty imageStyle={{ height: '25rem' }} />;
    } else {
      return list.map((version, index) => {
        return (
          <Descriptions
            title={<Tag color="geekblue">{version.versionName}</Tag>}
            layout="vertical"
            bordered
            key={index}
          >
            <Descriptions.Item label="版本描述" className="version-desc">
              {version.versionDesc}
            </Descriptions.Item>
            <Descriptions.Item label="版本状态" className="version-status">
              <Badge
                status={index === 0 ? 'processing' : 'default'}
                text={index === 0 ? '新版本' : '旧版本'}
              />
            </Descriptions.Item>
            <Descriptions.Item className="version-atcions" label="版本操作">
              <Link to={`/product/project/version/${version.versionId}/error`}>
                <Button type="primary">
                  <Icon type="line-chart" /> 查看
                </Button>
              </Link>
              <Divider type="vertical" />
              <Button type="danger">
                <Icon type="delete" />
                删除
              </Button>
            </Descriptions.Item>
          </Descriptions>
        );
      });
    }
  }
}
export default withRouter(Content);
