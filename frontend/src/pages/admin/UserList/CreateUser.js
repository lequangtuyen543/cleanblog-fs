import { Button, Card, Col, Form, Input, message, Row, Switch } from "antd";
import { checkExist, createUser } from "../../../services/usersService";
import getTimeCurrent from "../../../helpers/time";

export const CreateUser = () => {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  const handleSubmit = async (values) => {
    try {
      // Check Email exist
      const checkEmail = await checkExist("email", values.email);
      const checkUsername = await checkExist("username", values.username);

      console.log("checkEmail:", checkEmail);
      console.log("checkUsername:", checkUsername);

      if (checkEmail && checkEmail.length > 0) {
        messageApi.error("Email already exists!");
        return;
      } else if (checkUsername && checkUsername.length > 0) {
        messageApi.error("Username already exists!");
        return
      }

      // Create user
      values.createdAt = getTimeCurrent();
      values.updatedAt = getTimeCurrent();
      values.status = values.status ? "active" : "inactive";

      const res = await createUser(values);

      console.log(res);

      if (res) {
        messageApi.success("Create job successfully!");
        form.resetFields();
      } else {
        messageApi.error("Create job failed!");
      }
    } catch (error) {
      messageApi.error("Create job failed!");
    }
  }

  return (
    <>
      {contextHolder}
      <Card title="Create User">
        <Form form={form} layout="vertical" onFinish={handleSubmit} initialValues={{ status: true }}>
          <Row gutter={[20, 20]}>
            <Col span={24}>
              <Form.Item label="Your Name:" name='name' rules={[{ required: true, message: 'Please input your name!' }]}>
                <Input />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item label="Your Email:" name='email' rules={[{ required: true, message: 'Please input your email!', type: 'email' }]}>
                <Input />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item label="Username:" name='username' rules={[{ required: true, message: 'Please input your username!' }]}>
                <Input />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item label="Password:" name='password' rules={[{ required: true, message: 'Please input your password!' }]}>
                <Input.Password />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item label="Status active:" name='status' valuePropName="checked" rules={[{ required: true, message: 'Please input your status!' }]}>
                <Switch />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item>
                <Button type="primary" htmlType="submit">Create</Button>
              </Form.Item>
            </Col>
          </Row>

        </Form>
      </Card>
    </>
  );
}