import { Col, Row } from "antd";
import { UserStatistic } from "./UserStatistic ";
import { BlogStatistic } from "./BlogStatistic";
import Title from "antd/es/typography/Title";

export const Dashboard = () => {
  return (
    <>
      <Title level={3}>Dashboard</Title>
      
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