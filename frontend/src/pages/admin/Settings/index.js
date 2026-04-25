import { useEffect, useState } from "react";
import { Button, Form, Input, message, Skeleton, Divider } from 'antd';
import { SaveOutlined, GlobalOutlined, MailOutlined, PhoneOutlined, PushpinOutlined } from "@ant-design/icons";
import { getSettings, updateSettings } from "../../../services/settingsService";

export const SettingsPage = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const fetchSettings = async () => {
    setLoading(true);
    try {
      const res = await getSettings();
      if (res?.data) {
        form.setFieldsValue(res.data);
      }
    } catch (error) {
      messageApi.error("Không thể tải cài đặt hệ thống");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleSubmit = async (values) => {
    setSaving(true);
    try {
      const res = await updateSettings(values);
      if (res?.code === 200) {
        messageApi.success("Đã lưu cài đặt hệ thống!");
      } else {
        messageApi.error(res?.message || "Lỗi khi lưu cài đặt");
      }
    } catch (error) {
      messageApi.error("Đã có lỗi xảy ra");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {contextHolder}
      
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-1">Cài đặt Hệ thống (Settings)</h2>
        <p className="text-sm text-gray-500 m-0">Quản lý cấu hình chung cho toàn bộ website.</p>
      </div>

      <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
        {loading ? (
          <Skeleton active paragraph={{ rows: 8 }} />
        ) : (
          <Form 
            form={form} 
            layout="vertical" 
            onFinish={handleSubmit}
            className="font-inter"
            size="large"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
              <div className="col-span-1 md:col-span-2">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <GlobalOutlined className="text-indigo-600" /> Cấu hình Website
                </h3>
              </div>

              <Form.Item label="Tên Website" name='websiteName' rules={[{ required: true, message: 'Vui lòng nhập tên website!' }]}>
                <Input placeholder="Clean Blog" />
              </Form.Item>

              <Form.Item label="Mô tả Website (SEO)" name='websiteDescription'>
                <Input placeholder="Mô tả ngắn gọn về blog" />
              </Form.Item>

              <Form.Item label="Đường dẫn Logo (URL)" name='logo' className="col-span-1 md:col-span-2">
                <Input placeholder="https://example.com/logo.png" />
              </Form.Item>

              <div className="col-span-1 md:col-span-2">
                <Divider />
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <PushpinOutlined className="text-indigo-600" /> Thông tin liên hệ
                </h3>
              </div>

              <Form.Item label="Email liên hệ" name='email' rules={[{ type: 'email', message: 'Email không hợp lệ!' }]}>
                <Input prefix={<MailOutlined className="text-gray-400" />} placeholder="contact@example.com" />
              </Form.Item>

              <Form.Item label="Số điện thoại" name='phone'>
                <Input prefix={<PhoneOutlined className="text-gray-400" />} placeholder="+84 123 456 789" />
              </Form.Item>

              <Form.Item label="Địa chỉ" name='address' className="col-span-1 md:col-span-2">
                <Input.TextArea rows={3} placeholder="123 Đường ABC, Quận XYZ, TP.HCM" />
              </Form.Item>

              <div className="col-span-1 md:col-span-2 mt-6 flex justify-end">
                <Button 
                  type="primary" 
                  htmlType="submit" 
                  icon={<SaveOutlined />} 
                  loading={saving}
                  className="bg-[#005daa] hover:bg-[#0075d5] h-10 px-6 font-semibold"
                >
                  Lưu thay đổi
                </Button>
              </div>
            </div>
          </Form>
        )}
      </div>
    </div>
  );
};
