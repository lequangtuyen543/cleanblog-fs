import { useEffect, useState } from "react";
import { Button, Table, Tooltip, Input, Modal, Form, message, Space, Select, Tag, Popconfirm } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, SafetyCertificateOutlined } from "@ant-design/icons";
import { getRoles, createRole, updateRole, deleteRole } from "../../../services/rolesServices";

export const RolesIndex = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRole, setEditingRole] = useState(null);
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await getRoles();
      if (res?.data) setData(res.data);
    } catch (error) {
      messageApi.error("Không thể tải danh sách vai trò");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const showModal = (role = null) => {
    setEditingRole(role);
    if (role) {
      form.setFieldsValue(role);
    } else {
      form.resetFields();
    }
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingRole(null);
    form.resetFields();
  };

  const handleSubmit = async (values) => {
    try {
      if (editingRole) {
        const res = await updateRole(editingRole._id, values);
        if (res?.code === 200) {
          messageApi.success("Cập nhật thành công!");
          handleModalClose();
          fetchData();
        } else {
          messageApi.error(res?.message || "Lỗi cập nhật");
        }
      } else {
        const res = await createRole(values);
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

  const handleDelete = async (id) => {
    try {
      const res = await deleteRole(id);
      if (res?.code === 200) {
        message.success("Xóa thành công!");
        fetchData();
      } else {
        message.error(res?.message || "Lỗi xóa");
      }
    } catch (error) {
      message.error("Không thể xóa vai trò");
    }
  };

  const columns = [
    {
      title: 'Tên vai trò',
      key: 'title',
      render: (_, record) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
            <SafetyCertificateOutlined />
          </div>
          <span className="font-semibold text-gray-900">{record.title}</span>
        </div>
      )
    },
    {
      title: 'Mô tả',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Quyền hạn',
      key: 'permissions',
      render: (_, record) => (
        <Tag color="cyan">
          {record.permissions?.length || 0} quyền được cấp
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
            <Button type="text" icon={<EditOutlined className="text-blue-600" />} onClick={() => showModal(record)} />
          </Tooltip>
          <Tooltip title="Xóa">
            <Popconfirm
              title="Xóa vai trò"
              description="Bạn có chắc chắn muốn xóa vai trò này? Hành động này không thể hoàn tác."
              onConfirm={() => handleDelete(record._id)}
              okText="Xóa"
              cancelText="Hủy"
              okButtonProps={{ danger: true }}
            >
              <Button type="text" danger icon={<DeleteOutlined />} />
            </Popconfirm>
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
      {contextHolder}
      
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-1">Quản lý Phân quyền (Roles)</h2>
          <p className="text-sm text-gray-500 m-0">Quản lý các nhóm vai trò trong hệ thống.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button 
            type="primary" 
            icon={<PlusOutlined />} 
            onClick={() => showModal()}
            className="bg-[#005daa] hover:bg-[#0075d5]"
          >
            Thêm vai trò
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
        title={editingRole ? "Chỉnh sửa Vai trò" : "Tạo Vai trò mới"}
        open={isModalOpen}
        onCancel={handleModalClose}
        footer={null}
        destroyOnClose
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit} className="mt-4">
          <Form.Item label="Tên vai trò" name='title' rules={[{ required: true, message: 'Vui lòng nhập tên vai trò!' }]}>
            <Input placeholder="Ví dụ: Editor" />
          </Form.Item>

          <Form.Item label="Mô tả" name='description'>
            <Input.TextArea rows={2} placeholder="Mô tả quyền hạn của vai trò này" />
          </Form.Item>

          <Form.Item label="Quyền hạn (Permissions)" name='permissions'>
            <Select 
              mode="multiple" 
              placeholder="Chọn các quyền cho vai trò này"
              options={[
                { label: "Người dùng", options: [
                  { label: "Xem Người dùng", value: "users_view" },
                  { label: "Sửa Người dùng", value: "users_edit" }
                ]},
                { label: "Vai trò", options: [
                  { label: "Xem Vai trò", value: "roles_view" },
                  { label: "Thêm Vai trò", value: "roles_create" },
                  { label: "Sửa Vai trò", value: "roles_edit" },
                  { label: "Xóa Vai trò", value: "roles_delete" }
                ]},
                { label: "Bài viết", options: [
                  { label: "Xem Bài viết", value: "posts_view" },
                  { label: "Thêm Bài viết", value: "posts_create" },
                  { label: "Sửa Bài viết", value: "posts_edit" },
                  { label: "Xóa Bài viết", value: "posts_delete" }
                ]},
                { label: "Danh mục", options: [
                  { label: "Xem Danh mục", value: "categories_view" },
                  { label: "Thêm Danh mục", value: "categories_create" },
                  { label: "Sửa Danh mục", value: "categories_edit" },
                  { label: "Xóa Danh mục", value: "categories_delete" }
                ]},
                { label: "Cài đặt", options: [
                  { label: "Cài đặt Hệ thống", value: "settings_edit" }
                ]}
              ]}
              style={{ width: '100%' }}
              listHeight={300}
            />
          </Form.Item>

          <div className="flex justify-end gap-3 mt-8">
            <Button onClick={handleModalClose}>Hủy</Button>
            <Button type="primary" htmlType="submit" className="bg-[#005daa] hover:bg-[#0075d5]">
              {editingRole ? "Cập nhật" : "Tạo mới"}
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};