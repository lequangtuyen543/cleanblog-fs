import { useEffect, useState } from "react";
import { Button, Table, Tag, Tooltip, Input, Modal, Form, message, Select, Switch, Space } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined, UserOutlined } from "@ant-design/icons";
import { getUsers, createUser, updateUserInfo, deleteUser } from "../../../services/usersService";
import { getRoles } from "../../../services/rolesServices";

export const UserList = () => {
  const [data, setData] = useState([]);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(false);
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  const fetchData = async () => {
    setLoading(true);
    try {
      const [usersRes, rolesRes] = await Promise.all([getUsers(), getRoles()]);
      if (usersRes?.data) setData(usersRes.data);
      if (rolesRes?.data) setRoles(rolesRes.data);
    } catch (error) {
      messageApi.error("Không thể tải dữ liệu");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const showModal = (user = null) => {
    setEditingUser(user);
    if (user) {
      form.setFieldsValue({
        ...user,
        status: user.status === 'active'
      });
    } else {
      form.resetFields();
      form.setFieldsValue({ status: true });
    }
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingUser(null);
    form.resetFields();
  };

  const handleSubmit = async (values) => {
    try {
      const payload = {
        ...values,
        status: values.status ? 'active' : 'inactive'
      };

      if (editingUser) {
        const res = await updateUserInfo(editingUser._id, payload);
        if (res?.code === 200) {
          messageApi.success("Cập nhật thành công!");
          handleModalClose();
          fetchData();
        } else {
          messageApi.error(res?.message || "Lỗi cập nhật");
        }
      } else {
        const res = await createUser(payload);
        if (res?.code === 200) {
          messageApi.success("Tạo mới thành công!");
          handleModalClose();
          fetchData();
        } else {
          messageApi.error(res?.message || "Lỗi tạo mới");
        }
      }
    } catch (error) {
      messageApi.error(error.response?.data?.message || "Đã có lỗi xảy ra");
    }
  };

  const handleDelete = (id) => {
    Modal.confirm({
      title: 'Bạn có chắc chắn muốn xóa người dùng này?',
      content: 'Hành động này sẽ áp dụng Soft Delete.',
      okText: 'Xóa',
      okType: 'danger',
      cancelText: 'Hủy',
      onOk: async () => {
        try {
          const res = await deleteUser(id);
          if (res?.code === 200) {
            messageApi.success("Xóa thành công!");
            fetchData();
          } else {
            messageApi.error(res?.message || "Lỗi xóa");
          }
        } catch (error) {
          messageApi.error("Không thể xóa người dùng");
        }
      }
    });
  };

  const columns = [
    {
      title: 'Người dùng',
      key: 'user',
      render: (_, record) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600">
            <UserOutlined />
          </div>
          <div>
            <div className="font-semibold text-gray-900">{record.fullName || record.name || record.username}</div>
            <div className="text-xs text-gray-500">{record.email}</div>
          </div>
        </div>
      )
    },
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Vai trò',
      key: 'role',
      render: (_, record) => {
        const roleInfo = roles.find(r => r._id === record.roleId) || record.role;
        return <Tag color={roleInfo?.title?.toLowerCase() === 'admin' ? 'purple' : 'blue'}>
          {roleInfo?.title || 'Unknown'}
        </Tag>;
      },
    },
    {
      title: 'Trạng thái',
      key: 'status',
      render: (_, record) => (
        <Tag color={record.status === "active" ? "green" : "red"} className="capitalize">
          {record.status}
        </Tag>
      ),
    },
    {
      title: 'Thao tác',
      key: 'action',
      align: 'right',
      render: (_, record) => (
        <Space>
          <Tooltip title="Chỉnh sửa">
            <Button type="text" icon={<EditOutlined className="text-indigo-600" />} onClick={() => showModal(record)} />
          </Tooltip>
          <Tooltip title="Xóa">
            <Button type="text" danger icon={<DeleteOutlined />} onClick={() => handleDelete(record._id)} />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
      {contextHolder}
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-1">Quản lý Người dùng</h2>
          <p className="text-sm text-gray-500 m-0">Quản lý tài khoản và phân quyền truy cập hệ thống.</p>
        </div>
        
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Input 
            placeholder="Tìm kiếm..." 
            prefix={<SearchOutlined className="text-gray-400" />}
            className="w-full sm:w-64"
          />
          <Button 
            type="primary" 
            icon={<PlusOutlined />} 
            onClick={() => showModal()}
            className="bg-[#005daa] hover:bg-[#0075d5]"
          >
            Thêm mới
          </Button>
        </div>
      </div>

      <Table 
        columns={columns} 
        dataSource={data} 
        rowKey="_id" 
        loading={loading}
        pagination={{ pageSize: 10 }}
        className="font-inter"
      />

      <Modal
        title={editingUser ? "Chỉnh sửa Người dùng" : "Tạo Người dùng mới"}
        open={isModalOpen}
        onCancel={handleModalClose}
        footer={null}
        destroyOnClose
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit} className="mt-4">
          <Form.Item label="Họ và tên" name='fullName' rules={[{ required: true, message: 'Vui lòng nhập tên!' }]}>
            <Input placeholder="Nguyễn Văn A" />
          </Form.Item>

          <Form.Item label="Tên đăng nhập" name='username' rules={[{ required: true, message: 'Vui lòng nhập username!' }]}>
            <Input placeholder="nguyenvana" disabled={!!editingUser} />
          </Form.Item>

          <Form.Item label="Email" name='email' rules={[{ required: true, type: 'email', message: 'Vui lòng nhập email hợp lệ!' }]}>
            <Input placeholder="email@example.com" />
          </Form.Item>

          {!editingUser && (
            <Form.Item label="Mật khẩu" name='password' rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}>
              <Input.Password placeholder="••••••••" />
            </Form.Item>
          )}

          <Form.Item label="Vai trò" name='roleId' rules={[{ required: true, message: 'Vui lòng chọn vai trò!' }]}>
            <Select placeholder="Chọn vai trò">
              {roles.map(r => (
                <Select.Option key={r._id} value={r._id}>{r.title}</Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="Trạng thái hoạt động" name='status' valuePropName='checked'>
            <Switch />
          </Form.Item>

          <div className="flex justify-end gap-3 mt-8">
            <Button onClick={handleModalClose}>Hủy</Button>
            <Button type="primary" htmlType="submit" className="bg-[#005daa] hover:bg-[#0075d5]">
              {editingUser ? "Cập nhật" : "Tạo mới"}
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};