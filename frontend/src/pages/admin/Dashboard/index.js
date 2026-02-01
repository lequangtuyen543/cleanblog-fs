import { Col, Row } from "antd";
import { UserStatistic } from "./UserStatistic ";
import { BlogStatistic } from "./BlogStatistic";

export const Dashboard = () => {
  return (
    <>
      <h1>Page Dashboard</h1>
      <Row gutter={[20, 20]}>
        <Col span={12}>
          <UserStatistic />
        </Col>
        <Col span={12}>
          <BlogStatistic />
        </Col>
      </Row>
    </>
  )
}