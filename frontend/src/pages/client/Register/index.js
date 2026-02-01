import { Button, Card, Checkbox, Form, Input, message, Typography } from 'antd';
import { checkExist, createUser } from '../../../services/usersService';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import generateToken from '../../../helpers/generateToken';
import './Register.scss';

const { Text } = Typography;

export const Register = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      values.token = generateToken();

      const checkExistEmail = await checkExist("email", values.email);
      const checkExistUserName = await checkExist("username", values.username);

      if (checkExistEmail.length > 0) {
        messageApi.error('Email already exists!');
        return;
      } else if (checkExistUserName.length > 0) {
        messageApi.error('Username already exists!');
        return
      }

      const res = await createUser(values);

      console.log('res', res);

      if (res) {
        messageApi.success('Create user successfully!');
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      } else {
        messageApi.error('Create user failed!');
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
          <Card title={<>
            <h2 className='text-2xl font-bold py-2'>Create an Account</h2>
            <p>Enter your personal details to create account</p>
          </>} style={{ maxWidth: 400, margin: "0 auto" }}>
            <Form
              name="basic"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
              layout="vertical"
            >
              <Form.Item
                label="Your Name"
                name="name"
                rules={[{ required: true, message: 'Please input your name!' }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Your Email"
                name="email"
                rules={[{ required: true, message: 'Please input your email!', type: 'email' }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Username"
                name="username"
                rules={[{ required: true, message: 'Please input user name!' }]}
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

              <Form.Item
                name="terms"
                valuePropName="checked"
                rules={[
                  {
                    validator: (_, value) =>
                      value
                        ? Promise.resolve()
                        : Promise.reject(new Error('You must agree before submitting.')),
                  },
                ]}
              >
                <Checkbox>
                  I agree and accept the <a href="#">terms and conditions</a>
                </Checkbox>
              </Form.Item>


              <Form.Item label={null}>
                <Button type="primary" htmlType="submit" loading={loading} className='btn-primary'>
                  Create Account
                </Button>
              </Form.Item>

              <Form.Item label={null}>
                <Text>
                  Already have an account? <a href="/login">Log in</a>
                </Text>
              </Form.Item>
            </Form>
          </Card>
        </div>
      </div>

    </>
  );
}