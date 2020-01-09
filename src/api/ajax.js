import axios from 'axios'
import { message } from 'antd'
import { httpInterceptor } from './httpInterceptor'
//函数的返回值是一个promise的对象
export default function ajax(url, data = {}, type = 'GET') {
  //http request 拦截器 添加请求拦截
  httpInterceptor()
  return new Promise((resolve) => {
    //1.执行ajax请求
    let promise
    if (type === 'GET') {
      promise = axios.get(url, {
        params: data //指定请求参数
      })
    } else if (type === 'POST') {
      promise = axios.post(url, data)
    } else if (type === 'DELETE') {
      promise = axios.delete(url, {
        params: data
      })
    } else if (type === 'PUT') {
      promise = axios.put(url, data)
    }
    console.log('此次请求的url:' + url)
    //2.如果成功了，调用resolve(value)
    promise.then((res) => {
      resolve(res.data)
      //3.如果失败了，不调用reject(reson),直接打印出来
    }).catch(err => {
      if (err.message.indexOf('401')) {
        message.error('您还未登录，请先登录')
      } else {
        message.error('请求出错了: ' + err.message)

      }
    })
  })
}