import { observable, action } from 'mobx';
import { reqVersion } from '../api/index';
class Store {
  @observable projectId = 0;
  @observable list = [];
  @observable page = 1;
  @observable pageSize = 3;
  @observable total;
  @action getVersion = async () => {
    const res = await reqVersion(this.projectId, this.page, this.pageSize);
    this.list = res.data.list;
    this.total = res.data.total;
    console.log(res)
  };
  // @action deleteVersion = async id => {
  //   console.log(id);
  //   const res = await deleteVersion(id);
  //   console.log(res);
  // };
}
const VersionStore = new Store();
export default VersionStore;
