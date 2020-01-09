import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Select, Input } from 'antd';
const FormItem = Form.Item;
const { Option } = Select;
class CreateFrom extends Component {
  state = {};
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
          {getFieldDecorator('projectName', {
            rules: [{ required: true, message: '项目名不能为空' }],
            initialValue:
              !formProps || !formProps.projectName ? '' : formProps.projectName
          })(<Input style={{ minHeight: 0 }} placeholder="请输入项目名" />)}
        </FormItem>
        <FormItem style={{ marginBottom: 5 }}>
          {getFieldDecorator('projectDesc', {
            rules: [{ required: true, message: '项目描述不能为空' }],
            initialValue:
              !formProps || !formProps.projectDesc ? '' : formProps.projectDesc
          })(<Input style={{ minHeight: 0 }} placeholder="项目描述" />)}
        </FormItem>
        <FormItem label="请选择项目平台">
          {getFieldDecorator('projectApp', {
            rules: [{ required: true, message: '应用平台必须选' }],
            initialValue:
              !formProps || !formProps.projectApp
                ? { key: 'web', label: 'web' }
                : { key: formProps.projectApp, label: formProps.projectApp }
          })(
            <Select
              labelInValue
              style={{ width: '100%' }}
              placeholder="请选择应用平台"
              onChange={this.handleChange}
            >
              <Option value="web">web</Option>
              <Option value="react-native">react-native</Option>
            </Select>
          )}
        </FormItem>
      </Form>
    );
  }
}

export default Form.create()(CreateFrom);
