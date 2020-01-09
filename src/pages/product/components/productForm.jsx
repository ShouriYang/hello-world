import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Select, Input } from 'antd';
const FormItem = Form.Item;
const { Option } = Select;
class CreateFrom extends Component {
  static propTypes = {
    form: PropTypes.any,
    formProps: PropTypes.object
  };
  handleChange = value => {
    console.log(value);
  };
  componentDidMount() {
    console.log(this.props.formProps);
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { formProps } = this.props;
    return (
      <Form className="create-form">
        <FormItem>
          {getFieldDecorator('productName', {
            rules: [{ required: true, message: '请输入产品名' }],
            initialValue:
              !formProps || !formProps.productName ? '' : formProps.productName
          })(<Input placeholder="请输入产品名" />)}
        </FormItem>
        <FormItem style={{ marginBottom: 5 }}>
          {getFieldDecorator('productDesc', {
            rules: [{ required: true, message: '请输入产品描述' }],
            initialValue:
              !formProps || !formProps.productDesc ? '' : formProps.productDesc
          })(<Input placeholder="请输入产品描述" />)}
        </FormItem>
        <FormItem label="请选择产品类型">
          {getFieldDecorator('productCategory', {
            rules: [{ required: true, message: '请选择产品类型' }],
            initialValue:
              !formProps || !formProps.productCategory
                ? { key: '测试', label: '测试' }
                : formProps.productCategory
          })(
            <Select
              labelInValue
              style={{ width: '100%' }}
              placeholder="请选择产品类型"
              onChange={this.handleChange}
            >
              <Option value="测试">测试</Option>
              <Option value="开发">开发</Option>
            </Select>
          )}
        </FormItem>
      </Form>
    );
  }
}

export default Form.create()(CreateFrom);
