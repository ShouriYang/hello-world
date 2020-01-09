import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import './login.less';
import Register from './components/register';
import ForgetPwd from './components/forgetPwd';
import logo from '../../assets/images/logo.png';
import { Form, Icon, Input, Button, message } from 'antd';
import userStore from '../../mobx/userStore';
import productStore from '../../mobx/productStore';
@observer
//登录的路由组件
class Login extends Component {
  state = {};
  static propTypes = {
    form: PropTypes.any,
    history: PropTypes.any
  };
  handleSubmit = event => {
    event.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        const res = await userStore.login(values);
        if (res.code === 1) {
          console.log(res);
          localStorage.token = res.token;
          localStorage.userName = res.data.userName;
          localStorage.userId = res.data.userId;
          productStore.userId = res.data.userId;
          productStore.createPerson = res.data.userName;
          console.log(res.data);
          message.success(res.msg);
          this.props.history.replace('/product');
        } else {
          message.error(res.msg);
        }
      }
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="login">
        <header className="login-header">
          <img src={logo} alt="logo" />
          <h1>source-map</h1>
        </header>
        <section className="login-content">
          <h2>用户登录</h2>
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Form.Item>
              {getFieldDecorator('userName', {
                rules: [
                  {
                    required: true,
                    whitespace: true,
                    message: '请输入您的用户名'
                  },
                  // { min: 4, message: '用户名最少为4位' },
                  // { max: 12, message: '用户名最多为12位' },
                  {
                    pattern: /^[a-zA-Z0-9_]+$/,
                    message: '用户名必须必英文、数字或者下划线'
                  }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  placeholder="用户名"
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: '请输入你的密码' }]
              })(
                <Input
                  prefix={
                    <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  type="password"
                  placeholder="密码"
                />
              )}
            </Form.Item>
            <Form.Item className="log-in-button">
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                登录
              </Button>
            </Form.Item>
            <Form.Item>
              <div className="login-form-bottom">
                <Register />
                <ForgetPwd />
              </div>
            </Form.Item>
          </Form>
        </section>
      </div>
    );
  }
}
const WrapLogin = Form.create()(Login);
export default WrapLogin;
