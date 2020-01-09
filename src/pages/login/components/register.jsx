import React, { Component } from 'react';
import { Modal, message } from 'antd';
import PropTypes from 'prop-types';
import RegisterForm from './registerForm';
import store from '../../../mobx/userStore';
import { observer } from 'mobx-react';
@observer
class Register extends Component {
  state = {
    visible: false
  };
  static propTypes = {
    getFormValue: PropTypes.any
  };
  showModal = () => {
    this.setState({
      visible: true
    });
  };
  handleOk = () => {
    const registerData = this.getFormValue;
    registerData.validateFields(async (err, values) => {
      if (!err) {
        delete values.passwordCheck;
        const res = await store.register(values);
        if (res.code === 1) {
          message.success(res.msg);
          this.setState({ visible: false });
        } else {
          message.error(res.msg);
          this.setState({ visible: true });
        }
      } else {
        this.setState({ visible: true });
      }
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false
    });
  };
  render() {
    return (
      <div>
        <a className="login-form-register" onClick={this.showModal}>
          注册
        </a>
        <Modal
          title="用户注册"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <RegisterForm
            ref={getFormValue => {
              this.getFormValue = getFormValue;
            }}
          />
        </Modal>
      </div>
    );
  }
}

export default Register;
