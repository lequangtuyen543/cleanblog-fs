import { useEffect, useState } from "react";
import { Button, Table, Tooltip, Input, Modal, Form, message, Space, Switch, Tag } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined, AppstoreOutlined } from "@ant-design/icons";
import { getCategories, createCategory, updateCategory, deleteCategory } from "../../../services/categoriesService";

export const CategoryList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await getCategories();
      if (res?.data) setData(res.data);
    } catch (error) {
      messageApi.error("Không thể tải danh sách danh mục");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const showModal = (category = null) => {
    setEditingCategory(category);
    if (category) {
      form.setFieldsValue({
        ...category,
        status: category.status === 'active'
      });
    } else {
      form.resetFields();
      form.setFieldsValue({ status: true });
    }
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingCategory(null);
    form.resetFields();
  };

  const handleSubmit = async (values) => {
    try {
      const payload = {
        ...values,
        status: values.status ? 'active' : 'inactive'
      };

      if (editingCategory) {
        const res = await updateCategory(editingCategory._id, payload);
        if (res?.code === 200) {
          messageApi.success("Cập nhật thành công!");
          handleModalClose();
          fetchData();
        } else {
          messageApi.error(res?.message || "Lỗi cập nhật");
        }
      } else {
        const res = await createCategory(payload);
        if (res?.code === 200) {
          messageApi.success("Tạo mới thành công!");
          handleModalClose();
          fetchData();
        } else {
          messageApi.error(res?.message || "Lỗi tạo mới");
        }
      }
    } catch (error) {
      messageApi.error("Đã có lỗi xảy ra");
    }
  };

  const handleDelete = (id) => {
    Modal.confirm({
      title: 'Bạn có chắc chắn muốn xóa danh mục này?',
      content: 'Hành động này sẽ áp dụng Soft Delete.',
      okText: 'Xóa',
      okType: 'danger',
      cancelText: 'Hủy',
      onOk: async () => {
        try {
          const res = await deleteCategory(id);
          if (res?.code === 200) {
            messageApi.success("Xóa thành công!");
            fetchData();
          } else {
            messageApi.error(res?.message || "Lỗi xóa");
          }
        } catch (error) {
          messageApi.error("Không thể xóa danh mục");
        }
      }
    });
  };

  const columns = [
    {
      title: 'Tên danh mục',
      key: 'title',
      render: (_, record) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center text-green-600">
            <AppstoreOutlined />
          </div>
          <span className="font-semibold text-gray-900">{record.title}</span>
        </div>
      )
    },
    {
      title: 'Đường dẫn (Slug)',
      dataIndex: 'slug',
      key: 'slug',
      render: (text) => <span className="text-gray-500 font-mono text-sm">{text || 'N/A'}</span>
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
            <Button type="text" icon={<EditOutlined className="text-blue-600" />} onClick={() => showModal(record)} />
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
      
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-1">Quản lý Danh mục (Categories)</h2>
          <p className="text-sm text-gray-500 m-0">Phân loại và cấu trúc nội dung bài viết.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <Input 
            placeholder="Tìm kiếm..." 
            prefix={<SearchOutlined className="text-gray-400" />}
            className="w-64"
          />
          <Button 
            type="primary" 
            icon={<PlusOutlined />} 
            onClick={() => showModal()}
            className="bg-[#005daa] hover:bg-[#0075d5]"
          >
            Thêm danh mục
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
        title={editingCategory ? "Chỉnh sửa Danh mục" : "Tạo Danh mục mới"}
        open={isModalOpen}
        onCancel={handleModalClose}
        footer={null}
        destroyOnClose
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit} className="mt-4">
          <Form.Item label="Tên danh mục" name='title' rules={[{ required: true, message: 'Vui lòng nhập tên danh mục!' }]}>
            <Input placeholder="Ví dụ: Công nghệ" />
          </Form.Item>

          <Form.Item label="Đường dẫn (Slug)" name='slug' extra="Để trống để tự động tạo từ tên danh mục.">
            <Input placeholder="cong-nghe" />
          </Form.Item>

          <Form.Item label="Trạng thái hiển thị" name='status' valuePropName='checked'>
            <Switch />
          </Form.Item>

          <div className="flex justify-end gap-3 mt-8">
            <Button onClick={handleModalClose}>Hủy</Button>
            <Button type="primary" htmlType="submit" className="bg-[#005daa] hover:bg-[#0075d5]">
              {editingCategory ? "Cập nhật" : "Tạo mới"}
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};
