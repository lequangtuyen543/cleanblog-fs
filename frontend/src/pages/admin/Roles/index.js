import { useEffect, useState } from "react";
import { Button, Space, Table, Tag, Tooltip } from 'antd';
import { Link } from "react-router-dom";
import { EyeOutlined, PlusOutlined } from "@ant-design/icons";
import { rolesIndex } from "../../../services/rolesServices";

export const RoleIndex = () => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const res = await rolesIndex();
    if (res) {
      setData(res.data);
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
      title: 'No.',
      key: 'index',
      render: (_, __, index) => index + 1,
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    }
  ];

  return (
    <>
      <h3>User List</h3>
      <Link to="/admin/create-user">
        <Button icon={<PlusOutlined />} type="primary" style={{ marginBottom: 20 }}>Create User
        </Button>
      </Link>

      <Table columns={columns} dataSource={data} rowKey="_id"/>
    </>
  );
}