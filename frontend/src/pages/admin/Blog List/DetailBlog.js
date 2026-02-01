import { useParams } from "react-router-dom";
import { GoBack } from "../../../components/GoBack"
import { useEffect, useState } from "react";
import { getDetailPost } from "../../../services/postsServices";

export const DetailBlog = () => {
  const params = useParams();
  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const res = await getDetailPost(params.id);
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
          <h1>Title: {data.title}</h1>
          <h3>Subtitle: {data.subtitle}</h3>

          <div className="mb-2">
            <span>Created at: </span>
            <strong>{data.createdAt}</strong>
          </div>

          <div className="mb-2">
            <span>Created by: </span>
            <strong>{data.createdBy}</strong>
          </div>

          <div className="mb-2">
            <span>Updated at: </span>
            <strong>{data.updatedAt}</strong>
          </div>

          <div className="mb-2">
            <span>Content: </span>
            <strong>{data.content}</strong>
          </div>
        </>
      )}
    </>
  )
}