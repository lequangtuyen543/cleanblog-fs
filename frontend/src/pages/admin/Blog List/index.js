import { useEffect, useState } from "react";
import { Button, Space, Table, Tag, Tooltip } from 'antd';
import { Link } from "react-router-dom";
import { EyeOutlined, PlusOutlined } from "@ant-design/icons";
import { DeleteBlog } from "./DeleteBlog";
import { getListPosts } from "../../../services/postsServices";
import { EditBlog } from "./EditBlog";

export const BlogList = () => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const res = await getListPosts();
    if (res) {
      setData(res.reverse());
    }
  };

  useEffect(() => {
    fetchData();
  }, [])

  const handleReload = () => {
    fetchData();
  }

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title'
    },
    {
      title: 'Created By',
      dataIndex: 'createdBy',
      key: 'createdBy',
    },
    {
      title: 'Status',
      key: 'status',
      render: (_, record) => {
        return record.status === "active" ? (
          <Tag color="green">Active</Tag>
        ) : (
          <Tag color="red">Inactive</Tag>
        );
      },
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="small">
          <Tooltip title="Detail">
            <Link to={`/admin/detail-blog/${record.id}`}>
              <Button icon={<EyeOutlined />} type="default" />
            </Link>
          </Tooltip>
          <EditBlog record={record} onReload={handleReload} />
          <DeleteBlog record={record} onReload={handleReload} />          
        </Space>
      ),
    },
  ];

  console.log(data);

  return (
    <>
      <h3>Blog List</h3>

      <Link to="/admin/create-blog">
        <Button icon={<PlusOutlined />} type="primary" style={{ marginBottom: 20 }}>Create Blog
        </Button>
      </Link>

      <Table columns={columns} dataSource={data} />
    </>
  );
}