import { useEffect, useState } from 'react';
import { getPosts } from '../../../services/postsService';

import homeBg from '../../../assets/img/home-bg.jpg';
import { HeroItem } from '../../../components/HeroItem';
import { Skeleton, Empty } from 'antd';
import { CalendarOutlined, UserOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

export const Posts = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getPosts();
        if (res && res.code === 200) {
          setData(res.data);
        }
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <HeroItem 
        title="Blog Community" 
        subtitle="Khám phá những câu chuyện thú vị và kiến thức bổ ích" 
        thumbnail={homeBg} 
      />
      
      <main className="flex-grow bg-gray-50 py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          {loading ? (
            <div className="space-y-8">
              {[1, 2, 3].map(i => <Skeleton key={i} active avatar paragraph={{ rows: 3 }} />)}
            </div>
          ) : data.length > 0 ? (
            <div className="grid gap-12">
              {data.map((post) => (
                <article key={post._id} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
                  <div className="flex flex-col md:flex-row">
                    {/* Thumbnail placeholder if no image */}
                    <div className="md:w-1/3 h-64 md:h-auto bg-indigo-100 flex items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 group-hover:scale-110 transition-transform duration-500" />
                      <span className="text-4xl">📝</span>
                    </div>

                    <div className="md:w-2/3 p-8 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-4 text-xs text-indigo-600 font-semibold uppercase tracking-wider mb-3">
                          <span className="bg-indigo-50 px-3 py-1 rounded-full">
                            {post.category?.title || 'General'}
                          </span>
                        </div>
                        
                        <Link to={`/posts/${post._id}`}>
                          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors mb-3 leading-tight">
                            {post.title}
                          </h2>
                        </Link>
                        
                        <p className="text-gray-600 line-clamp-2 mb-6 text-lg font-light">
                          {post.subtitle || "Khám phá chi tiết bài viết này để tìm hiểu thêm thông tin thú vị..."}
                        </p>
                      </div>

                      <div className="flex items-center justify-between mt-4 pt-6 border-t border-gray-50">
                        <div className="flex items-center gap-6 text-sm text-gray-500">
                          <div className="flex items-center gap-2">
                            <UserOutlined className="text-indigo-400" />
                            <span className="font-medium text-gray-700">{post.createdBy?.fullName || 'Anonymous'}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CalendarOutlined className="text-indigo-400" />
                            <span>{new Date(post.createdAt).toLocaleDateString('vi-VN')}</span>
                          </div>
                        </div>
                        
                        <Link to={`/posts/${post._id}`} className="flex items-center gap-2 text-indigo-600 font-bold group/link">
                          Đọc thêm 
                          <ArrowRightOutlined className="group-hover/link:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-dashed border-gray-200">
              <Empty description="Hiện chưa có bài viết nào được đăng tải." />
            </div>
          )}
        </div>
      </main>
    </div>
  );
};