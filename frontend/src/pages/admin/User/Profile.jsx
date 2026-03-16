import { Button, Card, Col, Form, Input, message, Row, Select } from "antd";
import { useEffect, useState } from "react";
import { usersEdit, usersEditProfile, usersInfo } from "../../../services/usersService";

export const UserProfile = () => {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const [data, setData] = useState();
  const [isEdit, setIsEdit] = useState(false);

  const fetchData = async () => {
    const res = await usersInfo();
    if (res) {
      setData(res.data);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (data) {
      form.setFieldsValue(data);
    }
  }, [data, form]);

  const handleSubmit = async (values) => {
    try {
      const res = await usersEditProfile(values);
      if (res.code === 200) {
        messageApi.success(res.message);
        fetchData();
        setIsEdit(false);
      } else {
        messageApi.error(res.message);
      }
    } catch (error) {
      messageApi.error("Edit profile failed!");
    }
  }

  const handleEdit = () => {
    setIsEdit(true);
  };

  const handleCancel = () => {
    setIsEdit(false);
    form.setFieldsValue(data);
  };

  console.log(data);

  return (
    <>
      {contextHolder}
      <Card title="My Profile" extra={!isEdit ? <Button type="primary" onClick={handleEdit}>Edit</Button> : <Button type="default" onClick={handleCancel}>Cancel</Button>}>
        <Form form={form} layout="vertical" disabled={!isEdit} onFinish={handleSubmit}>
          <Row gutter={[20, 20]}>
            <Col span={24}>
              <Form.Item label="Full Name:" name='fullName' rules={[{ required: true, message: 'Please input your name!' }]}>
                <Input />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item label="Email:" name='email' rules={[{ type: 'email', required: true, message: 'Please input company email!' }]}>
                <Input />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item name="username" label="Username" rules={[{ required: true, message: 'Please input your username!' }]}>
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
      </Card>
    </>
  );
}