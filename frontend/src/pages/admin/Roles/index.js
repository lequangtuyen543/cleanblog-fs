import { useEffect, useState } from "react";
import { Button, Space, Table } from 'antd';
import { Link } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";
import { rolesIndex } from "../../../services/rolesServices";
import { RolesEdit } from "./edit";
import { RolesDelete } from "./delete";

export const RolesIndex = () => {
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
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="small">
          <RolesEdit record={record} onReload={handleReload} />
          <RolesDelete record={record} onReload={handleReload} />
        </Space>
      ),
    },
  ];

  return (
    <>
      <h3>Role List</h3>
      <Link to="/admin/roles/create">
        <Button icon={<PlusOutlined />} type="primary" style={{ marginBottom: 20 }}>Create Role
        </Button>
      </Link>

      <Table columns={columns} dataSource={data} rowKey="_id" />
    </>
  );
}