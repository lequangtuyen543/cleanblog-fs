import { useEffect, useState } from "react";
import { Button, Space, Table, Tag, Tooltip } from 'antd';
import { Link } from "react-router-dom";
import { EyeOutlined, PlusOutlined } from "@ant-design/icons";
import { EditUser } from "./EditUser";
import { getListUsers } from "../../../services/usersService";
import { DeleteUser } from "./DeleteUser";

export const UserList = () => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const res = await getListUsers();
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
      title: 'No.',
      key: 'index',
      render: (_, __, index) => index + 1,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    // {
    //   title: 'Email',
    //   dataIndex: 'email',
    //   key: 'email',
    // },
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
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
            <Link to={`/admin/detail-user/${record.id}`}>
              <Button icon={<EyeOutlined />} type="default" />
            </Link>
          </Tooltip>
          <EditUser record={record} onReload={handleReload} />
          <DeleteUser record={record} onReload={handleReload} />
        </Space>
      ),
    },
  ];

  console.log(data);

  return (
    <>
      <h3>User List</h3>
      <Link to="/admin/create-user">
        <Button icon={<PlusOutlined />} type="primary" style={{ marginBottom: 20 }}>Create User
        </Button>
      </Link>

      <Table columns={columns} dataSource={data} />
    </>
  );
}