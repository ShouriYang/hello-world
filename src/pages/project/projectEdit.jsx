/* eslint-disable no-param-reassign */
import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Modal, Button, Icon } from 'antd';
import PropTypes from 'prop-types';
import CreateFrom from './components/projectForm';
import store from '../../mobx/projectStore';
@observer
class Edit extends Component {
  state = {
    visible: false
  };
  static propTypes = {
    getFormValue: PropTypes.any,
    project: PropTypes.object.isRequired
  };
  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleOk = () => {
    const formData = this.getFormValue;
    formData.validateFields(async (err, values) => {
      if (!err) {
        values.projectApp = values.projectApp.label;
        values.productId = store.productId;
        console.log(values);
        const code = await store.editProject(
          this.props.project.projectId,
          values
        );
        if (code === 800) {
          if (store.searchValue === '') {
            await store.getProject();
          } else {
            await store.searchProject();
          }
          formData.resetFields();
          this.setState({ visible: false });
        } else {
          this.setState({ visible: true });
        }
      } else {
        this.setState({ visible: true });
      }
    });
  };
  handleCancel = () => {
    this.setState({ visible: false });
  };
  render() {
    const { visible } = this.state;
    return (
      <span>
        <Icon type="edit" theme="twoTone" key="edit" onClick={this.showModal} />
        <Modal
          visible={visible}
          title="编辑项目"
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          bodyStyle={{ paddingBottom: 0 }}
          footer={[
            <Button key="back" onClick={this.handleCancel}>
              取消
            </Button>,
            <Button key="submit" type="primary" onClick={this.handleOk}>
              提交
            </Button>
          ]}
        >
          <CreateFrom
            formProps={this.props.project}
            ref={getFormValue => {
              this.getFormValue = getFormValue;
            }}
          />
        </Modal>
      </span>
    );
  }
}

export default Edit;
