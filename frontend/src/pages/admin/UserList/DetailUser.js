import { useParams } from "react-router-dom";
import { GoBack } from "../../../components/GoBack"
import { useEffect, useState } from "react";
import { getDetailUser } from "../../../services/usersService";
import { Tag } from "antd";

export const DetailUser = () => {
  const params = useParams();
  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const res = await getDetailUser(params.id);
      if (res) {
        setData(res);
      }
    };
    fetchData();
  }, [])

  console.log(data);

  return (
    <>
      <GoBack />
      {data && (
        <>
          <div className="mb-2">
            <span>Name: </span>
            <strong>{data.name}</strong>
          </div>

          <div className="mb-2">
            <span>Email: </span>
            <strong>{data.email}</strong>
          </div>

          <div className="mb-2">
            <span>Username: </span>
            <strong>{data.username}</strong>
          </div>

          <div className="mb-2">
            <span>Created at: </span>
            <strong>{data.createdAt}</strong>
          </div>

          <div className="mb-2">
            <span>Updated at: </span>
            <strong>{data.updatedAt}</strong>
          </div>

          <div className="mb-2">
            <span>Status active: </span>
            {data.status ? <Tag color="green">{data.status}</Tag> : <Tag color="red">{data.status}</Tag>}
          </div>
        </>
      )}
    </>
  )
}