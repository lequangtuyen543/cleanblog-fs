import { useEffect, useState } from "react";
import { Button, Table, Tag, Tooltip, Input, Modal, message, Space } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined, FileTextOutlined, EyeOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { getPosts, deletePost } from "../../../services/postsService";

export const BlogList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await getPosts();
      if (res?.data) {
        setData(res.data);
      }
    } catch (error) {
      messageApi.error("Không thể tải danh sách bài viết");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = (id) => {
    Modal.confirm({
      title: 'Bạn có chắc chắn muốn xóa bài viết này?',
      content: 'Hành động này sẽ chuyển bài viết vào thùng rác (Soft Delete).',
      okText: 'Xóa',
      okType: 'danger',
      cancelText: 'Hủy',
      onOk: async () => {
        try {
          const res = await deletePost(id);
          if (res?.code === 200) {
            messageApi.success("Xóa bài viết thành công!");
            fetchData();
          } else {
            messageApi.error(res?.message || "Lỗi xóa bài viết");
          }
        } catch (error) {
          messageApi.error("Không thể xóa bài viết");
        }
      }
    });
  };

  const columns = [
    {
      title: 'Bài viết',
      key: 'title',
      render: (_, record) => (
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg bg-gray-50 flex-shrink-0 overflow-hidden border border-gray-100 flex items-center justify-center">
            {record.thumbnail ? (
              <img src={record.thumbnail} alt="" className="w-full h-full object-cover" />
            ) : (
              <FileTextOutlined className="text-gray-300 text-xl" />
            )}
          </div>
          <div>
            <div className="font-semibold text-gray-900 line-clamp-1 max-w-xs" title={record.title}>
              {record.title}
            </div>
            <div className="text-xs text-gray-400 capitalize">
              {record.category?.title || 'Uncategorized'} • by {record.user?.fullName || record.user?.username || 'Admin'}
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Lượt xem',
      dataIndex: 'views',
      key: 'views',
      render: (views) => <span className="font-medium text-gray-600">{views || 0}</span>,
    },
    {
      title: 'Trạng thái',
      key: 'status',
      render: (_, record) => (
        <Tag color={record.status === "active" ? "green" : "orange"} className="capitalize rounded-full px-3">
          {record.status === "active" ? "Đã xuất bản" : "Bản nháp"}
        </Tag>
      ),
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (date) => <span className="text-gray-500">{new Date(date).toLocaleDateString('vi-VN')}</span>,
    },
    {
      title: 'Thao tác',
      key: 'action',
      align: 'right',
      render: (_, record) => (
        <Space>
          <Tooltip title="Xem trên Website">
            <Link to={`/posts/${record._id}`} target="_blank">
              <Button 
                type="text" 
                icon={<EyeOutlined className="text-green-600" />} 
              />
            </Link>
          </Tooltip>
          <Tooltip title="Chỉnh sửa">
            <Button 
              type="text" 
              icon={<EditOutlined className="text-blue-600" />} 
              onClick={() => navigate(`/admin/posts/edit/${record._id}`)} 
            />
          </Tooltip>
          <Tooltip title="Xóa">
            <Button type="text" danger icon={<DeleteOutlined />} onClick={() => handleDelete(record._id)} />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm animate-in fade-in">
      {contextHolder}
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-1">Quản lý Bài viết (Posts)</h2>
          <p className="text-sm text-gray-500 m-0">Đăng tải, chỉnh sửa và quản lý nội dung blog.</p>
        </div>
        
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Input 
            placeholder="Tìm kiếm bài viết..." 
            prefix={<SearchOutlined className="text-gray-400" />}
            className="w-full sm:w-64 rounded-xl"
          />
          <Link to="/admin/posts/create">
            <Button 
              type="primary" 
              icon={<PlusOutlined />} 
              className="bg-[#005daa] hover:bg-[#0075d5] rounded-xl h-9"
            >
              Viết bài mới
            </Button>
          </Link>
        </div>
      </div>

      <Table 
        columns={columns} 
        dataSource={data} 
        rowKey="_id" 
        loading={loading}
        pagination={{ pageSize: 10 }}
        className="font-inter dashboard-table"
      />
    </div>
  );
};