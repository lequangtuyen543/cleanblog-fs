import { Button, Input, Row, Col } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const { Search } = Input;

export const DataToolbar = ({
  onSearch,
  createPath,
  createLabel    = "Create",
  searchPlaceholder = "Search...",
}) => (
  <Row justify="space-between" style={{ marginBottom: 16 }}>
    <Col>
      <Link to={createPath}>
        <Button icon={<PlusOutlined />} type="primary">
          {createLabel}
        </Button>
      </Link>
    </Col>
    <Col>
      <Search
        placeholder={searchPlaceholder}
        allowClear
        enterButton="Search"
        onSearch={onSearch}
        style={{ width: 300 }}
      />
    </Col>
  </Row>
);