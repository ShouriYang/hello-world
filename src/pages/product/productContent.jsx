import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import store from '../../mobx/productStore';
import PropTypes from 'prop-types';
import Edit from './productEdit';
import { Card, Col, Row, Icon, Modal, Tag, Pagination, Empty } from 'antd';
const { confirm } = Modal;
@observer
class Content extends Component {
  static propTypes = {
    store: PropTypes.any
  };
  getProduct = async () => {
    await store.getProduct();
  };
  edit = async id => {
    await store.editProduct(id);
  };
  delete = id => {
    confirm({
      title: '你确定要删除这个产品吗？',
      okText: '是',
      okType: 'danger',
      cancelText: '否',
      async onOk() {
        await store.deleteProduct(id);
        if (store.searchValue === '') {
          await store.getProduct();
        } else {
          await store.searchProduct();
        }
        console.log('ok');
      },
      onCancel() {
        console.log('Cancel');
      }
    });
  };
  componentDidMount = () => {
    this.getProduct();
  };

  onShowSizeChange = async (current, pageSize) => {
    store.page = current;
    store.pageSize = pageSize;
    await store.getProduct();
  };
  pageChange = async current => {
    store.page = current;
    await store.getProduct();
  };

  render() {
    if (store.list.length === 0) {
      return <Empty imageStyle={{ height: '27rem' }} />;
    } else {
      return (
        <div>
          <div
            style={{
              background: 'white',
              padding: '1.5rem 1.5rem 1rem 1.5rem'
            }}
          >
            <Row gutter={[16, 16]}>
              {store.list.map((item, index) => {
                return (
                  <Col span={8} key={index}>
                    <Card
                      bodyStyle={{ padding: '0.7rem 0 0.7rem 24px' }}
                      title={item.productName}
                      actions={[
                        <Icon
                          onClick={this.delete.bind(this, item.productId)}
                          twoToneColor="red"
                          type="delete"
                          theme="twoTone"
                          key="delete"
                        />,
                        <Edit key="edit" product={item} />
                      ]}
                      extra={
                        <Link to={`/product/${item.productId}/project`}>
                          查看项目
                        </Link>
                      }
                    >
                      <p>{item.productDesc}</p>
                      <Tag
                        style={{ fontSize: '14px', marginTop: '0.5rem ' }}
                        color={
                          item.productCategory === '测试' ? 'geekblue' : 'green'
                        }
                        key={item.productCategory}
                      >
                        {item.productCategory}
                      </Tag>
                      {/* <p>{item.productCategory}</p> */}
                    </Card>
                  </Col>
                );
              })}
            </Row>
          </div>
          <div className="product-pagination">
            {/* {console.log(store.list)} */}
            <Pagination
              showSizeChanger
              defaultPageSize={9}
              pageSizeOptions={['9', '12', '15']}
              onShowSizeChange={this.onShowSizeChange}
              onChange={this.pageChange}
              defaultCurrent={1}
              total={store.total}
            />
          </div>
        </div>
      );
    }
  }
}

export default Content;
