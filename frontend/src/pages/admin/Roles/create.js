import { Button, Card, Col, Form, Input, message, Row, Switch } from "antd";
import getTimeCurrent from "../../../helpers/time";
import { rolesCreate } from "../../../services/rolesServices";

export const RolesCreate = () => {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  const handleSubmit = async (values) => {
    try {

      // Create user
      // values.createdAt = getTimeCurrent();
      // values.updatedAt = getTimeCurrent();

      const res = await rolesCreate(values);

      console.log(res);

      if (res && res.code === 200) {
        messageApi.success(res.message);
        form.resetFields();
      } else {
        messageApi.error(res.message);
      }
    } catch (error) {
      messageApi.error("Create user failed!");
    }
  }

  return (
    <>
      {contextHolder}
      <Card title="Create Role">
        <Form form={form} layout="vertical" onFinish={handleSubmit} initialValues={{ status: true }}>
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
                <Button type="primary" htmlType="submit">Create</Button>
              </Form.Item>
            </Col>
          </Row>

        </Form>
      </Card>
    </>
  );
}