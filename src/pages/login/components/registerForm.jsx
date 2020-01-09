import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Input } from 'antd';
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 19 }
};
class RegisterFrom extends Component {
  state = {};
  static propTypes = {
    form: PropTypes.any
  };
  //再次输入密码中检测是否和初次输入密码相同
  checkRepeatPsd(rule, value, callback) {
    const password = this.props.form.getFieldValue('password');
    if (password && password !== value) {
      callback(new Error('两次密码输入不一致'));
    } else {
      callback();
    }
  }
  //初次输入密码中检测是否和再次输入密码相同
  checkPsd(rule, value, callback) {
    const passwordCheck = this.props.form.getFieldValue('passwordCheck');
    if (passwordCheck && passwordCheck !== value) {
      callback(new Error('两次密码输入不一致'));
    } else {
      callback();
    }
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Form.Item {...formItemLayout} label="用户名">
          {getFieldDecorator('userName', {
            rules: [
              {
                required: true,
                message: '用户名不能为空'
              }
            ]
          })(<Input placeholder="请输入您的用户名" />)}
        </Form.Item>
        <Form.Item {...formItemLayout} label="密码">
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
                message: '密码不能为空'
              },
              {
                validator: (rule, value, callback) => {
                  this.checkPsd(rule, value, callback);
                }
              }
            ],
            validateTrigger: 'onBlur' //校验子节点值的时机
          })(<Input type="password" placeholder="请输入您的密码" />)}
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label="确认密码"
          style={{ marginBottom: 0 }}
        >
          {getFieldDecorator('passwordCheck', {
            rules: [
              {
                required: true,
                message: '确认密码不能为空'
              },
              {
                validator: (rule, value, callback) => {
                  this.checkRepeatPsd(rule, value, callback);
                }
              }
            ],
            validateTrigger: 'onBlur' //校验子节点值的时机
          })(<Input type="password" placeholder="请再次输入您的密码" />)}
        </Form.Item>
      </div>
    );
  }
}

export default Form.create()(RegisterFrom);
