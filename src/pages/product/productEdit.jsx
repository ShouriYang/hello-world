import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Modal, Button, Icon } from 'antd';
import PropTypes from 'prop-types';
import CreateFrom from './components/productForm';
import store from '../../mobx/productStore';
import './css/productCreate.less';
@observer
class Edit extends Component {
  state = {
    visible: false,
    productInfo: {}
  };
  static propTypes = {
    getFormValue: PropTypes.any,
    product: PropTypes.object.isRequired
  };
  showModal = () => {
    const { productInfo } = this.state;
    const { product } = this.props;
    productInfo.productName = product.productName;
    productInfo.productDesc = product.productDesc;
    productInfo.productCategory = {};
    productInfo.productCategory.key = product.productCategory;
    productInfo.productCategory.label = product.productCategory;
    this.setState({
      visible: true,
      productInfo: productInfo
    });
  };

  handleOk = () => {
    const formData = this.getFormValue;
    formData.validateFields(async (err, values) => {
      if (!err) {
        // eslint-disable-next-line no-param-reassign
        values.productCategory = values.productCategory.label;
        // console.log(this.props.product.productId, values);
        const code = await store.editProduct(
          this.props.product.productId,
          values
        );
        if (code === 800) {
          if (store.searchValue === '') {
            await store.getProduct();
          } else {
            await store.searchProduct();
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
      <div>
        <Icon type="edit" theme="twoTone" key="edit" onClick={this.showModal} />
        <Modal
          visible={visible}
          title="编辑产品"
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
            formProps={this.state.productInfo}
            ref={getFormValue => {
              this.getFormValue = getFormValue;
            }}
          />
        </Modal>
      </div>
    );
  }
}

export default Edit;
