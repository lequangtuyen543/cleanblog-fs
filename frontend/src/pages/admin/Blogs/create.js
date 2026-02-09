import { Button, Card, Col, Form, Input, message, Row, Select, Switch } from "antd";
import { usersDetail, usersInfo } from "../../../services/usersService";
import getTimeCurrent from "../../../helpers/time";
import TextArea from "antd/es/input/TextArea";
import { getCookie } from "../../../helpers/cookie";
import { postsCreate } from "../../../services/postsServices";

export const CreateBlog = () => {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  const handleSubmit = async (values) => {
    try {
      const userInfo = await usersInfo();

      values.createdAt = getTimeCurrent();
      values.updatedAt = getTimeCurrent();
      values.createdBy = userInfo.fullName;
      values.status = values.status ? "active" : "inactive";

      const res = await postsCreate(values);

      console.log(res);

      if (res.code ==200) {
        messageApi.success(res.message);
        form.resetFields();
      } else {
        messageApi.error(res.message);
      }
    } catch (error) {
      messageApi.error("Create blog failed!");
    }
  }

  return (
    <>
      {contextHolder}
      <Card title="Create Blog">
        <Form form={form} layout="vertical" onFinish={handleSubmit} initialValues={{ status: true }}>
          <Row gutter={[20, 20]}>
            <Col span={24}>
              <Form.Item label="Title:" name='title' rules={[{ required: true, message: 'Please input your title!' }]}>
                <Input />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item label="Subtitle:" name='subtitle' rules={[{ required: true, message: 'Please input your subtitle!' }]}>
                <Input />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item label="Content:" name='content' rules={[{ required: true, message: 'Please input your content!' }]}>
                <TextArea rows={6} />
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