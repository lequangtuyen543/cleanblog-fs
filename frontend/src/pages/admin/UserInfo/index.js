import { Button, Card, Col, Form, Input, message, Row, Select } from "antd";
import { useEffect, useState } from "react";
import { editUser, getDetailUser } from "../../../services/usersService";
import { getCookie } from "../../../helpers/cookie";
const { Option } = Select;

export const UserInfo = () => {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const [data, setData] = useState();
  const [isEdit, setIsEdit] = useState(false);

  const fetchData = async () => {
    const id = getCookie("id");
    const res = await getDetailUser(id);
    if (res) {
      setData(res);
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
      const res = await editUser(data.id, values);
      if (res) {
        messageApi.success("Edit company successfully!");
        fetchData();
        setIsEdit(false);
      } else {
        messageApi.error("Edit company failed!");
      }
    } catch (error) {
      messageApi.error("Edit company failed!");
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
      <Card title="Info User" extra={!isEdit ? <Button type="primary" onClick={handleEdit}>Edit</Button> : <Button type="default" onClick={handleCancel}>Cancel</Button>}>
        <Form form={form} layout="vertical" disabled={!isEdit} onFinish={handleSubmit}>
          <Row gutter={[20, 20]}>
            <Col span={24}>
              <Form.Item label="Your Name:" name='name' rules={[{ required: true, message: 'Please input your name!' }]}>
                <Input />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item label="Your Email:" name='email' rules={[{ type: 'email', required: true, message: 'Please input company email!' }]}>
                <Input />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item name="username" label="Username" rules={[{ required: true, message: 'Please input your username!' }]}>
                <Input />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item label="Password:" name='password' rules={[{ required: true, message: 'Please input your password!' }]}>
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