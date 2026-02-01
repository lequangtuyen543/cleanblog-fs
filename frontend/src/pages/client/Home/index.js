import { useEffect, useState } from 'react';
import { getListPosts } from '../../../services/postsServices';
import './Home.scss';
import homeBg from '../../../assets/img/home-bg.jpg';
import { HeroItem } from '../../../components/HeroItem';

export const Home = () => {
  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const res = await getListPosts();
      if (res) {
        setData(res);
      }
    };
    fetchData();
  }, []);

  console.log('data', data);

  return (
    <>
      <HeroItem title="Clean Blog" subtitle="A Blog Theme by Start Bootstrap" thumbnail={homeBg} />
      <div className='container'>
        <div className="bg-white py-12 sm:py-16 post">
          {data && data.map((post) => (
            <>
              <article className="flex flex-col items-start justify-between border-b border-gray-200 blog-card">
                <div className="group relative grow post-preview">
                  <a href={`/post/${post.id}`}>
                    <h2 className="post-title">
                      {post.title}
                    </h2>
                    <h3 className="post-subtitle">
                      {post.subtitle}
                    </h3>
                  </a>
                </div>
                <div className="flex items-center gap-x-4 text-xs mb-5 post-meta">
                  Posted by <a href="/">{post.createdBy}</a> on {post.createdAt}
                </div>
              </article>
            </>
          ))}
          <div className="d-flex justify-content-end mt-4"><a className="btn btn-primary text-uppercase btn-primary" href="/posts">Older Posts →</a></div>
        </div>
      </div>
    </>
  );
};