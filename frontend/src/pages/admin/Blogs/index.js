import { useEffect, useState } from "react";
import { Button, Space, Table, Tag, Tooltip, Input, Row, Col } from "antd";
import { Link } from "react-router-dom";
import { EyeOutlined, PlusOutlined } from "@ant-design/icons";
import { DeleteBlog } from "./delete";
import { posts } from "../../../services/postsServices";
import { EditBlog } from "./edit";

const { Search } = Input;

export const BlogList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  // 🔥 state control
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5,
    total: 0,
  });

  const [searchText, setSearchText] = useState("");

  const fetchData = async (params = {}) => {
    setLoading(true);

    const res = await posts({
      keyword: params.search || "",
      page: params.pagination?.current || 1,
      limit: params.pagination?.pageSize || 5,
      sortKey: params.sortField || "",
      sortValue:
        params.sortOrder === "ascend"
          ? "asc"
          : params.sortOrder === "descend"
            ? "desc"
            : "",
    });

    if (res) {
      setData(res.data);

      const totalItems =
        res.pagination?.totalPages * res.pagination?.limitItems || res.data.length;
      setPagination({
        current: res.pagination?.currentPage || 1,
        pageSize: res.pagination?.limitItems || 5,
        total: totalItems,
      });
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchData({ pagination });
  }, []);

  // 🔥 Table change (pagination + sort)
  const handleTableChange = (newPagination, filters, sorter) => {
    fetchData({
      pagination: newPagination,
      sortField: sorter.field,
      sortOrder: sorter.order,
      search: searchText,
    });
  };

  // 🔥 Search
  const onSearch = (value) => {
    setSearchText(value);
    fetchData({
      pagination: { ...pagination, current: 1 },
      search: value,
    });
  };

  const handleReload = () => {
    fetchData({ pagination, search: searchText });
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      sorter: true, // bật sort
    },
    {
      title: "Created By",
      dataIndex: "createdBy",
      sorter: true,
    },
    {
      title: "Status",
      dataIndex: "status",
      filters: [
        { text: "Active", value: "active" },
        { text: "Inactive", value: "inactive" },
      ],
      render: (status) =>
        status === "active" ? (
          <Tag color="green">Active</Tag>
        ) : (
          <Tag color="red">Inactive</Tag>
        ),
    },
    {
      title: "Action",
      render: (_, record) => (
        <Space size="small">
          <Tooltip title="Detail">
            <Link to={`/admin/detail-blog/${record._id}`}>
              <Button icon={<EyeOutlined />} />
            </Link>
          </Tooltip>
          <EditBlog record={record} onReload={handleReload} />
          <DeleteBlog record={record} onReload={handleReload} />
        </Space>
      ),
    },
  ];

  return (
    <>
      <h3>Blog List</h3>

      <Row justify="space-between" style={{ marginBottom: 16 }}>
        <Col>
          <Link to="/admin/create-blog">
            <Button icon={<PlusOutlined />} type="primary">
              Create Blog
            </Button>
          </Link>
        </Col>

        <Col>
          <Search
            placeholder="Search by title..."
            allowClear
            enterButton="Search"
            onSearch={onSearch}
            style={{ width: 300 }}
          />
        </Col>
      </Row>

      <Table
        rowKey="_id"
        columns={columns}
        dataSource={data}
        loading={loading}
        pagination={pagination}
        onChange={handleTableChange}
      />
    </>
  );
};