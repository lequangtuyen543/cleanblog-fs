import { useEffect, useState } from "react";
import { Card } from "antd";
import { usersList } from "../../../services/usersService";
import { Link } from "react-router-dom";

export const UserStatistic = () => {
  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const res = await usersList();
      const resData = res.data;
      if (resData) {
        let obj = {
          total: 0,
          statusTrue: 0,
          statusFalse: 0
        }
        obj.total = resData.length;
        resData.forEach((item) => {
          item.status === 'active' ? obj.statusTrue++ : obj.statusFalse++
        })
        setData(obj);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Card title={<Link to="/admin/user-list">User Statistic</Link>}>
        <p>User Total: <strong>{data?.total}</strong></p>
        <p>Status Active: <strong>{data?.statusTrue}</strong></p>
        <p>Status Inactive: <strong>{data?.statusFalse}</strong></p >
      </Card >
    </>
  )
}