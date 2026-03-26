import { Tag, Button, Space, Tooltip } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { DeleteBlog } from "./delete";
import { EditBlog }   from "./edit";

export const blogColumns = (onReload) => [
  { title: "Title",      dataIndex: "title",     sorter: true },
  { title: "Created By", dataIndex: "createdBy",  sorter: true },
  {
    title: "Status", dataIndex: "status",
    render: (status) =>
      status === "active"
        ? <Tag color="green">Active</Tag>
        : <Tag color="red">Inactive</Tag>,
  },
  {
    title: "Action",
    render: (_, record) => (
      <Space size="small">
        <Tooltip title="Detail">
          <Link to={`/admin/blogs/detail/${record._id}`}>
            <Button icon={<EyeOutlined />} />
          </Link>
        </Tooltip>
        <EditBlog   record={record} onReload={onReload} />
        <DeleteBlog record={record} onReload={onReload} />
      </Space>
    ),
  },
];