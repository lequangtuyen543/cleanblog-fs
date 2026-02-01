import { Button, Col, Form, Input, message, Modal, Row, Select, Switch, Tooltip } from 'antd';
import { EditOutlined } from "@ant-design/icons";
import { useState } from 'react';
import getTimeCurrent from '../../../helpers/time';
import { editUser } from '../../../services/usersService';

export const EditUser = (props) => {
  const { record, onReload } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async (values) => {
    console.log(values);
    try {
      values.updateAt = getTimeCurrent();
      const res = await editUser(record.id, values);
      if (res) {
        messageApi.success("Update user successfully!");
        setIsModalOpen(false);
        onReload();
      } else {
        messageApi.error("Update user failed!");
      }
    } catch (error) {
      messageApi.error("Update user failed!");
    }
  }

  console.log(record);

  return (
    <>
      {contextHolder}
      <Tooltip title="Edit">
        <Button icon={<EditOutlined />} type="primary" ghost onClick={showModal} />
      </Tooltip>

      <Modal
        title="Edit User"
        closable={{ 'aria-label': 'Custom Close Button' }}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width='100%'
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit} initialValues={record}>
          <Row gutter={[20, 20]}>
            <Col span={24}>
              <Form.Item label="Name:" name='name' rules={[{ required: true, message: 'Please input your name!' }]}>
                <Input />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item label="Username:" name='username' rules={[{ required: true, message: 'Please input your username!' }]}>
                <Input />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item label="Email:" name='email' rules={[{ required: true, message: 'Please input your email!' }]}>
                <Input />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item label="Password:" name='password' rules={[{ required: true, message: 'Please input your password!' }]}>
                <Input.Password />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item label="Status:" name='status' valuePropName='checked'>
                <Switch defaultChecked />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item>
                <Button type="primary" htmlType="submit">Save</Button>
              </Form.Item>
            </Col>
          </Row>

        </Form>
      </Modal>
    </>
  )
}