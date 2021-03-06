import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  InputNumber,
  Modal,
  Form,
  Select,
  Input,
  Row,
  Col,
  Button,
} from 'antd';
import { getListRoomTypeAPI, updateVisible, createRoom } from './actions';
import './styles.scss';
export default class ModalChangeRoom extends Component {
  render() {
    return (
      <div>
        <Modal
          visible={this.props.visibleModal}
          title='CHANGE ROOM'
          onCancel={() => {
            this.props.onCloseModal();
          }}
          footer={[
            <Button key='back' onClick={() => this.props.onCloseModal()}>
              Cancel
            </Button>,
            <Button
              key='submit'
              type='primary'
              onClick={() => {
                this.props.acceptChangeRoom();
              }}
            >
              Accept
            </Button>,
          ]}
        >
          <Form layout='vertical' ref={this.props.valueForm}>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label='Room Name'>
                  <Select
                    placeholder='Select rent room'
                    value={this.props.idRoomCurrent || null}
                    onChange={(value) => {
                      this.props.handleOnChangeRoomCurrent(value);
                    }}
                  >
                    {this.props.listRoomRent.map((type) => (
                      <Select.Option key={type.id} value={type.id}>
                        {type.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label='Room Type'>
                  <Input
                    className='inputDisabled'
                    name='roomType'
                    value={this.props.nameTypeRoom}
                    disabled
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item label='Room Change'>
                  <Select
                    className='inputDisabled'
                    placeholder='Choose room change'
                    onChange={(value) => {
                      this.props.handleOnChangeSelectRoomChange(value);
                    }}
                    disabled={!this.props.idRoomCurrent}
                  >
                    {this.props.listRoomByType.map((type) => (
                      <Select.Option key={type.id} value={type.id}>
                        {type.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label='Price'>
                  <InputNumber
                    value={this.props.price}
                    style={{ width: '100%' }}
                    formatter={(value) =>
                      `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                    }
                    parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                    onChange={this.props.handleOnChangePrice}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              {/* <Col span={12}>
                <Form.Item label='Price/Hour'>
                  <Input
                    name='pricehour'
                    value={this.props.priceHour}
                    disabled
                  />
                </Form.Item>
              </Col> */}
            </Row>
          </Form>
        </Modal>
      </div>
    );
  }
}
