import { Button, Col, Form, Input, message, Modal, Row, Tooltip } from 'antd';
import { EditOutlined } from "@ant-design/icons";
import { useState } from 'react';
import { updateRole } from '../../../services/rolesServices';

export const RolesEdit = (props) => {
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
      const res = await updateRole(record._id, values);
      console.log(res);
      if (res && res.code === 200) {
        messageApi.success("Update role successfully!");
        setIsModalOpen(false);
        onReload();
      } else {
        messageApi.error("Update role failed!");
      }
    } catch (error) {
      messageApi.error("Update role failed!");
    }
  }

  return (
    <>
      {contextHolder}
      <Tooltip title="Edit">
        <Button icon={<EditOutlined />} type="primary" ghost onClick={showModal} />
      </Tooltip>

      <Modal
        title="Edit Record"
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
              <Form.Item label="Title:" name='title' rules={[{ required: true, message: 'Please input your title!' }]}>
                <Input />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item label="Description:" name='description'>
                <Input />
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