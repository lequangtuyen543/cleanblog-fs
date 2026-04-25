import { useEffect, useState } from "react";
import { Button, Space, Table, Tag, Tooltip } from 'antd';
import { Link } from "react-router-dom";
import { EyeOutlined, PlusOutlined } from "@ant-design/icons";
import { EditUser } from "./edit";
import { getUsers } from "../../../services/usersService";
import { DeleteUser } from "./delete";

export const UserList = () => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const res = await getUsers();
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
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Role',
      key: 'roleId',
      render: (_, record) => {
        return <Tag color="blue">{record.role.title}</Tag>;
      },
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
          <EditUser record={record} onReload={handleReload} />
          <DeleteUser record={record} onReload={handleReload} />       
        </Space>
      ),
    },
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