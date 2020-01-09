import { action } from 'mobx'
import { register, login } from '../api/index'
class Store {
  @action register = async (user) => {
    console.log(user)
    const result = await register(user);
    console.log(result)
    return result;
  }
  @action login = async (user) => {
    console.log(user);
    const result = await login(user);
    console.log(result);

    return result;
  }
}
const UserStore = new Store();
export default UserStore;