import { Table } from "antd";

export const DataTable = ({ columns, data, loading, pagination, onChange }) => (
  <Table
    rowKey="_id"
    columns={columns}
    dataSource={data}
    loading={loading}
    pagination={pagination}
    onChange={onChange}
  />
);