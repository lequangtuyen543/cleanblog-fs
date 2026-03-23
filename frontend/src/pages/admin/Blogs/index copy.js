import { useEffect, useState } from "react";
import { Button, Space, Table, Tag, Tooltip, Input } from 'antd';
import { Link } from "react-router-dom";
import { AudioOutlined, EyeOutlined, PlusOutlined } from "@ant-design/icons";
import { DeleteBlog } from "./delete";
import { posts } from "../../../services/postsServices";
import { EditBlog } from "./edit";
import { usersInfo } from "../../../services/usersService";

const { Search } = Input;

export const BlogList = () => {
  const [data, setData] = useState([]);
  const [user, setUser] = useState();

  const fetchData = async () => {
    const res = await posts();
    if (res) {
      setData(res.data.reverse());
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchUser = async () => {
    const res = await usersInfo();
    if (res) {
      setUser(res.data);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  const handleReload = () => {
    fetchData();
  }

  const onSearch = (value, _e, info) => console.log(info?.source, value);


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
            <Link to={`/admin/detail-blog/${record._id}`}>
              <Button icon={<EyeOutlined />} type="default" />
            </Link>
          </Tooltip>
          <EditBlog record={record} onReload={handleReload} />
          <DeleteBlog record={record} onReload={handleReload} />
        </Space>
      ),
    },
  ];

  const suffix = <AudioOutlined style={{ fontSize: 16, color: '#1677ff' }} />;

  return (
    <>
      <h3>Blog List</h3>

      <Link to="/admin/create-blog">
        <Button icon={<PlusOutlined />} type="primary" style={{ marginBottom: 20 }}>Create Blog
        </Button>
      </Link>

      <Search
      placeholder="input search text"
      enterButton="Search"
      size="large"
      onSearch={onSearch}
    />

      <Table columns={columns} dataSource={data} />
    </>
  );
}