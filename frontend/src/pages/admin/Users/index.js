import { useEffect, useState } from "react";
import { Button, Space, Table, Tag, Tooltip } from 'antd';
import { Link } from "react-router-dom";
import { EyeOutlined, PlusOutlined } from "@ant-design/icons";
import { EditUser } from "./edit";
import { usersList } from "../../../services/usersService";
import { DeleteUser } from "./delete";

export const UserList = () => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const res = await usersList();
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
      title: 'Full Name',
      dataIndex: 'fullName',
      key: 'fullName',
    },
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Role',
      key: 'role',
      render: (_, record) => {
        return record.role === "admin" ? (
          <Tag color="blue">Admin</Tag>
        ) : (
          <Tag color="red">User</Tag>
        );
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
          <Tooltip title="Detail">
            <Link to={`/admin/detail-user/${record._id}`}>
              <Button icon={<EyeOutlined />} type="default" />
            </Link>
          </Tooltip>
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