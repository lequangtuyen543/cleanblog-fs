import { Button, Col, Form, Input, message, Modal, Row, Select, Switch, Tooltip } from 'antd';
import { EditOutlined } from "@ant-design/icons";
import { useState } from 'react';
import TextArea from 'antd/es/input/TextArea';
import getTimeCurrent from '../../../helpers/time';
import { editPost } from '../../../services/postsServices';

export const EditBlog = (props) => {
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
      values.updatedAt = getTimeCurrent();
      const res = await editPost(record.id, values);
      if (res) {
        messageApi.success("Edit blog successfully!");
        setIsModalOpen(false);
        onReload();
      } else {
        messageApi.error("Edit blog failed!");
      }
    } catch (error) {
      messageApi.error("Edit blog failed!");
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
        title="Edit Blog"
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
              <Form.Item label="Sub Title:" name='subtitle' rules={[{ required: true, message: 'Please input your sub title!' }]}>
                <Input />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item label="Content:" name='content' >
                <TextArea rows={8} />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item label="Status:" name='status' valuePropName='checked'>
                <Switch defaultChecked />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item>
                <Button type="primary" htmlType="submit">Submit</Button>
              </Form.Item>
            </Col>
          </Row>

        </Form>
      </Modal>
    </>
  )
}