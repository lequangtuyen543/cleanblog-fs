import { useEffect, useState } from 'react';
import { posts } from '../../../services/postsServices';
import './index.scss';
import { GoBack } from '../../../components/GoBack';
import postBg from '../../../assets/img/post-bg.jpg';
import { HeroItem } from '../../../components/HeroItem';

export const SamplePost = () => {
  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const res = await posts(1);
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