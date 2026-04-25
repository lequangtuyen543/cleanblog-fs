import { Button, Card, Col, Form, Input, message, Row, Select } from "antd";
import { useEffect, useState } from "react";
import { changePassword, getUserInfo } from "../../../services/usersService";

export const UserPreferences = () => {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const [data, setData] = useState();
  const [isEdit, setIsEdit] = useState(false);

  const fetchData = async () => {
    const res = await getUserInfo();
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

  console.log(data);

  const handleSubmit = async (values) => {
    try {
      const res = await changePassword(values);
      if (res.code === 200) {
        messageApi.success(res.message);
        fetchData();
        setIsEdit(false);
      } else {
        messageApi.error(res.message);
      }
    } catch (error) {
      messageApi.error("Change password failed!");
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

      <h3>Preferences</h3>

      <Card title="Password" extra={!isEdit ? <Button type="primary" onClick={handleEdit}>Change</Button> : <Button type="default" onClick={handleCancel}>Cancel</Button>}>
        <Form form={form} layout="vertical" disabled={!isEdit} onFinish={handleSubmit}>
          <Row gutter={[20, 20]}>
            <Col span={24}>
              <Form.Item label="Old Password:" name='oldPassword' rules={[{ required: true, message: 'Please input your old password!' }]}>
                <Input.Password />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="New Password:" name='newPassword' rules={[{ required: true, message: 'Please input your new password!' }]}>
                <Input.Password />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="Confirm Password:" name='confirmPassword' rules={[{ required: true, message: 'Please confirm your password!' }]}>
                <Input.Password />
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