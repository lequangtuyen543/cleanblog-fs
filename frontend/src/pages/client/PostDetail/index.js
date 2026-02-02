import { useEffect, useState } from 'react';
import { getDetailPost } from '../../../services/postsServices';
import './PostDetail.scss';
import { GoBack } from '../../../components/GoBack';
import { useParams } from 'react-router-dom';
import postBg from '../../../assets/img/post-bg.jpg';
import { HeroItem } from '../../../components/HeroItem';

export const PostDetail = () => {
  const [data, setData] = useState();
  const param = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const res = await getDetailPost(param.id);
      if (res) {
        setData(res);
      }
    };
    fetchData();
  }, []);

  console.log('data', data);

  return (
    <>
      {data && (
        <>
        <HeroItem title={data.title} subtitle={data.subtitle} thumbnail={postBg} createdBy={data.createdBy} createdAt={data.createdAt}/>
        </>
      )}      

      <div className='container'>
        {data && (
          <>
            <div className="bg-white py-12 sm:py-16">
              <p style={{ whiteSpace: "pre-line" }}>
                {data.content}
              </p>
            </div>
          </>
        )}
        <GoBack />
      </div>
    </>
  );
};