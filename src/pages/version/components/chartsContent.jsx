import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
// import { observer } from 'mobx-react';
import { DatePicker, Empty } from 'antd';
import { Chart, Geom, Axis, Tooltip } from 'bizcharts';
import store from '../../../mobx/errorStore';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
@observer
class ChartsContent extends Component {
  state = {};
  static propTypes = {
    location: PropTypes.any
  };
  getToday = () => {
    const d = new Date();
    const mth =
      d.getMonth() + 1 >= 10 ? d.getMonth() + 1 + '' : '0' + (d.getMonth() + 1);
    const day = d.getDate() >= 10 ? d.getDate() + '' : '0' + d.getDate();
    const today = d.getFullYear() + '-' + mth + '-' + day;
    return today;
  };
  componentDidMount = async () => {
    store.projectId = this.props.location.pathname.split('/')[3];
    store.datestring = this.getToday();
    console.log(store.datestring);
    await store.dayError();
  };
  getError = async () => {
    // await store.getError(store.versionId);
    // console.log(store.list);
  };
  onChange = async (date, datestring) => {
    store.datestring = datestring;
    console.log(store.datestring);
    await store.dayError();
  };
  render() {
    // 数据源
    // const data = [
    //   { time: '13:00', err: 15 },
    //   { time: '14:00', err: 3 },
    //   { time: '15:00', err: 20 },
    //   { time: '16:00', err: 11 },
    //   { time: '17:00', err: 1 }
    // ];
    const data = [];
    store.dayErrList.map((err, index) => {
      data[index] = {};
      data[index].time = err.Hours;
      data[index].err = err.Count;
    });
    console.log(data);
    // 定义度量
    const cols = {
      err: { alias: '错误数量' },
      time: { alias: '时间' }
    };
    return (
      <div>
        <div className="charts-header" style={{ margin: '1rem 0 0 1rem' }}>
          <span>
            选择日期:
            <DatePicker onChange={this.onChange} />
          </span>
        </div>
        {data.length === 0 ? (
          <Empty imageStyle={{ height: '25rem' }} />
        ) : (
          <div className="charts-middle" style={{ textAlign: 'center' }}>
            <Chart forceFit={true} height={500} data={data} scale={cols}>
              <Axis name="time" title />
              <Axis name="err" title />
              <Tooltip showTitle={false} />
              <Geom type="interval" position="time*err" color="time" />
            </Chart>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(ChartsContent);
