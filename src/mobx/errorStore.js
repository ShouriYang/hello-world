import { observable, action } from 'mobx';
import { reqError, dayError, datePickError } from '../api/index';
class Store {
  @observable versionId = 0;
  @observable projectId = 0;
  @observable list = [];
  @observable dayErrList = [];
  @observable datestring;
  @observable page = 1;
  @observable pageSize = 3;
  @observable total;
  @observable startTime = 0;
  @observable endTime = 0;
  @action getError = async () => {
    const res = await reqError(this.versionId, this.page, this.pageSize);
    // console.log(this.versionId);
    this.list = res.data.list;
    this.total = res.data.total
    console.log(res);
    // console.log(this.list[);
  };
  @action dayError = async () => {
    const res = await dayError(this.projectId, this.datestring);
    // console.log(res.data);
    this.dayErrList = res.data;
  };
  @action datePickError = async () => {
    const res = await datePickError(this.versionId, this.startTime, this.endTime, this.page, this.pageSize);
    console.log(res.data);
    // console.log('选择日期')
  }
}
const VersionStore = new Store();
export default VersionStore;
