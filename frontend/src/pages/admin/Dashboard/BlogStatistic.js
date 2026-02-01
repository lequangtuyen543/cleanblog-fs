import { useEffect, useState } from "react";
import { Card } from "antd";
import { getListPosts } from "../../../services/postsServices";
import { Link } from "react-router-dom";

export const BlogStatistic = () => {
  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const res = await getListPosts();
      console.log(res);
      if (res) {
        console.log(res);
        let obj = {
          total: 0,
          statusTrue: 0,
          statusFalse: 0
        }
        obj.total = res.length;
        res.forEach((item) => {
          item.status === 'active' ? obj.statusTrue++ : obj.statusFalse++
        })
        setData(obj);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Card title={<Link to="/admin/blog-list">Blog Statistic</Link>}>
        <p>Blog Total: <strong>{data?.total}</strong></p>
        <p>Status Active: <strong>{data?.statusTrue}</strong></p>
        <p>Status Inactive: <strong>{data?.statusFalse}</strong></p >
      </Card >
    </>
  )
}