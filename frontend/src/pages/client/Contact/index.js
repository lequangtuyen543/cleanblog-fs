import contactBg from '../../../assets/img/contact-bg.jpg';
import { Button, Form, Input, Space } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import './Contact.scss';
import { HeroItem } from '../../../components/HeroItem';

export const Contact = () => {
  const onFinish = values => {
    console.log('Success:', values);
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      <HeroItem title="Contact Me" subtitle="Have questions? I have answers." thumbnail={contactBg} />

      <div className='container'>
        <div className="bg-white py-12 sm:py-16">
          <p className="whitespace-pre-line">
            {
              `Want to get in touch? Fill out the form below to send me a message and I will get back to you as soon as possible!`
            }
          </p>
        </div>

        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          layout='vertical'
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please input your name!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item name={'email'} label="Email address" rules={[{ type: 'email', required: true, message: 'Please input your Email!' }]}>
            <Input />
          </Form.Item>

          <Form.Item
            name="phone"
            label="Phone Number"
            rules={[{ required: true, message: 'Please input your phone number!' }]}
          >
            <Space.Compact block>
              <Input style={{ width: '100%' }} />
            </Space.Compact>
          </Form.Item>

          <Form.Item name="message" label="Message" rules={[{ required: true, message: 'Please input your message!' }]}>
            <TextArea rows={4} />
          </Form.Item>

          <Form.Item label={null}>
            <Button type="primary" htmlType="submit" className='btn-primary text-uppercase'>
              Send
            </Button>
          </Form.Item>
        </Form>
      </div >


    </>
  );
};