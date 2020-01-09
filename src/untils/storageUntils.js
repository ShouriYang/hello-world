import store from 'store'
const USER_KEY = 'user';
export default {
  saveUser(user) {
    //localstorage中存储key-value的必须是字符串
    // localStorage.setItem(USER_KEY, JSON.stringify(user))
    store.set(USER_KEY, user)
  },
  getUser() {
    // return JSON.parse(localStorage.getItem(USER_KEY) || '{}');
    return store.get(USER_KEY)
  },
  removeUser() {
    // localStorage.removeItem(USER_KEY)
    store.remove(USER_KEY)
  }

}