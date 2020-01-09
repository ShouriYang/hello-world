import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import store from '../../../mobx/errorStore';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import { Tabs, DatePicker, List, Avatar, Pagination } from 'antd';
import moment from 'moment';
const { TabPane } = Tabs;
const { RangePicker } = DatePicker;
@observer
class SearchContent extends Component {
  state = {};
  static propTypes = {
    location: PropTypes.any
  };
  pageChange = page => {
    store.page = page;
    this.getError();
  };
  componentDidMount() {
    store.versionId = this.props.location.pathname.split('/')[4];
    this.getError();
  }
  getError = async () => {
    await store.getError(store.versionId);
    // console.log(store.list[0].createTime);
    // console.log(Date.parse(store.list[0].createTime.trim().replace(/-/g, '/')));
  };
  onChange = async (time, datestring) => {
    // console.log(time, datestring);
    store.startTime = datestring[0];
    store.endTime = datestring[1];
    // console.log(store.startTime, store.endTime);
    await store.datePickError();
  };
  render() {
    return (
      <div>
        <div className="search-header">
          <span>
            请选择时间：
            <RangePicker
              onChange={this.onChange}
              showTime={{
                hideDisabledOptions: true,
                defaultValue: [
                  moment('00:00:00', 'HH:mm:ss'),
                  moment('11:59:59', 'HH:mm:ss')
                ]
              }}
              format="YYYY-MM-DD HH:mm:ss"
            />
          </span>
        </div>
        <Tabs
          defaultActiveKey="1"
          tabPosition="left"
          style={{ height: '24rem', margin: '0 1rem 1rem 1rem' }}
        >
          {store.list.map((err, index) => {
            return (
              <TabPane tab={err.message} key={index}>
                <h1>异常详情</h1>
                <List itemLayout="horizontal">
                  <List.Item>
                    <List.Item.Meta
                      avatar={
                        <Avatar
                          style={{
                            backgroundColor: '#00a2ae',
                            verticalAlign: 'middle',
                            size: 'large'
                          }}
                        >
                          Time
                        </Avatar>
                      }
                      title="异常生成时间"
                      description={err.createTime}
                    />
                  </List.Item>
                  <List.Item>
                    <List.Item.Meta
                      avatar={
                        <Avatar
                          style={{
                            backgroundColor: '#00a2ae',
                            verticalAlign: 'middle',
                            size: 'large'
                          }}
                        >
                          Id
                        </Avatar>
                      }
                      title="异常Id(可换成上报人)"
                      description={err.errorId}
                    />
                  </List.Item>
                  <List.Item>
                    <List.Item.Meta
                      avatar={
                        <Avatar
                          style={{
                            backgroundColor: '#00a2ae',
                            verticalAlign: 'middle',
                            size: 'large'
                          }}
                        >
                          File
                        </Avatar>
                      }
                      title="异常所属文件"
                      description={err.newfilename}
                    />
                  </List.Item>
                  <List.Item>
                    <List.Item.Meta
                      avatar={
                        <Avatar
                          style={{
                            backgroundColor: '#00a2ae',
                            verticalAlign: 'middle',
                            size: 'large'
                          }}
                        >
                          Loca
                        </Avatar>
                      }
                      title="异常文件行列号"
                      description={`行:${err.lineno} 列:${err.colno}`}
                    />
                  </List.Item>
                  <List.Item>
                    <List.Item.Meta
                      avatar={
                        <Avatar
                          style={{
                            backgroundColor: '#00a2ae',
                            verticalAlign: 'middle',
                            size: 'large'
                          }}
                        >
                          Deta
                        </Avatar>
                      }
                      title="异常概述"
                      description={err.message}
                    />
                  </List.Item>
                </List>
              </TabPane>
            );
          })}
        </Tabs>
        <div className="search-pagination">
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

export default withRouter(SearchContent);
