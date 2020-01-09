import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import store from '../../mobx/projectStore';
import PropTypes from 'prop-types';
import { Table, Divider, Tag, Icon, Modal } from 'antd';
import Edit from './projectEdit';
import { observer } from 'mobx-react';
const { confirm } = Modal;
@observer
class Content extends Component {
  state = {};
  static propTypes = {
    location: PropTypes.any
  };
  componentDidMount() {
    store.productId = this.props.location.pathname.split('/')[2];
    this.getProject();
  }
  getProject = async () => {
    await store.getProject();
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
        if (store.searchValue === '') {
          await store.getProject();
        } else {
          await store.searchProject();
        }
        console.log('ok');
      },
      onCancel() {
        console.log('Cancel');
      }
    });
  };
  pageChange = current => {
    console.log(current);
    store.page = current;
    this.getProject();
  };
  render() {
    const columns = [
      {
        title: '项目名',
        dataIndex: 'projectName',
        key: 'projectName',
        render: (text, record) => {
          // console.log(text, record.projectId);
          return (
            <Link to={`/product/project/${record.projectId}/version`}>
              {text}
            </Link>
          );
        }
      },
      {
        title: '项目Id',
        dataIndex: 'projectId',
        key: 'projectId'
      },
      {
        title: '项目描述',
        dataIndex: 'projectDesc',
        key: 'projectDesc'
      },
      {
        title: '应用平台',
        key: 'projectApp',
        dataIndex: 'projectApp',
        render: projectApp => {
          const color = projectApp.length > 5 ? 'geekblue' : 'green';
          return (
            <span>
              <Tag color={color} key={projectApp}>
                {projectApp.toUpperCase()}
              </Tag>
            </span>
          );
        }
      },
      {
        title: '操作',
        key: 'action',
        render: (text, record) => (
          <span>
            <a>
              {/* {console.log(text.projectId, record.projectId)} */}
              <Icon
                onClick={this.delete.bind(this, record.projectId)}
                twoToneColor="red"
                type="delete"
                theme="twoTone"
                key="delete"
              />
            </a>
            <Divider type="vertical" />
            <a>
              <Edit project={record} />
            </a>
          </span>
        )
      }
    ];
    const data = store.list;
    //table的每行data必须指定一个key
    data.map((project, index) => {
      // eslint-disable-next-line no-param-reassign
      project.key = index;
    });
    return (
      <div>
        {console.log(store.total)}
        <Table
          className="project-table"
          bordered
          columns={columns}
          dataSource={data}
          pagination={{
            defaultPageSize: 7,
            onChange: this.pageChange,
            defaultCurrent: 1,
            total: store.total
          }}
        />
      </div>
    );
  }
}

export default withRouter(Content);
