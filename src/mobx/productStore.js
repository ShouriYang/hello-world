import { observable, action } from 'mobx';
import {
  reqProduct,
  addProduct,
  editProduct,
  deleteProduct,
  searchProduct
} from '../api/index';
import { addMessage, editMessage, deleteMessage } from '../api/message';
class Store {
  @observable userId = localStorage.userId;
  @observable createPerson = localStorage.userName;
  @observable searchValue;
  @observable list = [];
  @observable page = 1;
  @observable pageSize = 9;
  @observable total;
  // @computed get desc() {
  //   return `${this.time}还有${this.todos.length}条任务待完成`;
  // }
  @action getProduct = async () => {
    console.log(this.page, this.pageSize);

    const res = await reqProduct(this.userId, this.page, this.pageSize);
    this.list = res.data.list;
    this.total = res.data.total;
    // console.log(this.list);
    console.log(this.total);
  };
  @action searchProduct = async () => {
    // console.log(this.page, this.pageSize);
    const res = await searchProduct(this.userId, this.searchValue, this.page, this.pageSize);
    this.list = res.data.list;
    this.total = res.data.total;
    // console.log(this.list);
    // console.log(this.total);
  };
  @action addProduct = async product => {
    // product.userId = this.userId;
    // console.log(product)
    console.log(this.userId, this.createPerson)
    const res = await addProduct(this.userId, this.createPerson, product);
    addMessage(res.code, res.message);
    return res.code;
  };
  @action editProduct = async (id, product) => {
    const res = await editProduct(id, product);
    // console.log(res.message);
    // console.log(res);
    editMessage(res.code, res.message);
    return res.code;
  };
  @action deleteProduct = async id => {
    const res = await deleteProduct(id);
    deleteMessage(res.code, res.message);
    // console.log(res);
  };
}
const ProductStore = new Store();
export default ProductStore;
