import { Button, Card, Checkbox, Form, Input, message, Typography } from 'antd';
import { setCookie } from '../../../helpers/cookie';
import { loginUser, usersLogin } from '../../../services/usersService';
import { checkLogin } from '../../../actions/login';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useState } from 'react';

const { Text } = Typography;

export const Login = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const dispatchEvent = useDispatch();
  const [loading, setLoading] = useState(false);

  const onFinish = async values => {
    setLoading(true);
    try {
      const res = await usersLogin(values);

      console.log("res: ", res.code);

      if (res.code == 200) {
        
        // login success
        // setCookie("id", res[0].id, 1);
        // setCookie("name", res[0].name, 1);
        // setCookie("username", res[0].username, 1);
        setCookie("token", res.token, 1);

        dispatchEvent(checkLogin(true));
        console.log("Login successfully!");
        setTimeout(() => {
          messageApi.success(res.message);
          navigate("/admin/dashboard");
        }, 1000);
      } else {
        // login fail
        messageApi.error(res.message);
      }
    } catch (error) {
      messageApi.error('Something went wrong!');
    } finally {
      setLoading(false);
    }

  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      {contextHolder}

      <div className='container'>
        <div className="bg-white py-12 sm:py-16">
          <Card title={"Login"} style={{ maxWidth: 300, margin: "0 auto" }}>
            <Form
              name="basic"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
              layout="vertical"
            >
              <Form.Item
                label="Username"
                name="username"
                rules={[{ required: true, message: 'Please input your username!' }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item name="remember" valuePropName="checked" label={null}>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <Form.Item label={null}>
                <Button type="primary" htmlType="submit" loading={loading}>
                  Login
                </Button>
              </Form.Item>

              <Form.Item label={null}>
                <Text>
                  Don't have account? <a href="/register">Create an account</a>
                </Text>
              </Form.Item>
            </Form>
          </Card>
        </div>
      </div>
    </>
  );
}