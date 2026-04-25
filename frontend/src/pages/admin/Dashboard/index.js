import { useEffect, useState } from "react";
import { getPosts } from "../../../services/postsService";
import { getUsers } from "../../../services/usersService";
import { Link } from "react-router-dom";
import { Skeleton } from "antd";

export const Dashboard = () => {
  const [stats, setStats] = useState({
    users: { total: 0, active: 0, inactive: 0 },
    posts: { total: 0, active: 0, inactive: 0 },
    loading: true
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [usersRes, postsRes] = await Promise.all([getUsers(), getPosts()]);
        
        const usersList = usersRes?.data || [];
        const postsList = postsRes?.data || [];

        const usersData = {
          total: usersList.length,
          active: usersList.filter(u => u.status === 'active').length,
          inactive: usersList.filter(u => u.status !== 'active').length,
        };

        const postsData = {
          total: postsList.length,
          active: postsList.filter(p => p.status === 'active').length,
          inactive: postsList.filter(p => p.status !== 'active').length,
        };

        setStats({ users: usersData, posts: postsData, loading: false });
      } catch (error) {
        console.error("Failed to fetch dashboard stats", error);
        setStats(prev => ({ ...prev, loading: false }));
      }
    };
    fetchStats();
  }, []);

  if (stats.loading) {
    return <div className="p-4"><Skeleton active paragraph={{ rows: 10 }} /></div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6 font-inter">System Overview</h2>

      {/* Bento Grid Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        
        {/* Total Users */}
        <Link to="/admin/users" className="block">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow cursor-pointer group">
            <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center text-[#005daa] group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>group</span>
            </div>
            <div>
              <div className="text-sm text-gray-500 font-medium">Total Users</div>
              <div className="text-3xl font-bold text-gray-900">{stats.users.total}</div>
            </div>
          </div>
        </Link>

        {/* Active Users */}
        <Link to="/admin/users" className="block">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow cursor-pointer group">
            <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center text-green-600 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified_user</span>
            </div>
            <div>
              <div className="text-sm text-gray-500 font-medium">Active Users</div>
              <div className="text-3xl font-bold text-gray-900">{stats.users.active}</div>
            </div>
          </div>
        </Link>

        {/* Total Posts */}
        <Link to="/admin/posts" className="block">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow cursor-pointer group">
            <div className="w-14 h-14 rounded-full bg-orange-50 flex items-center justify-center text-orange-600 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>article</span>
            </div>
            <div>
              <div className="text-sm text-gray-500 font-medium">Total Posts</div>
              <div className="text-3xl font-bold text-gray-900">{stats.posts.total}</div>
            </div>
          </div>
        </Link>

        {/* Active Posts */}
        <Link to="/admin/posts" className="block">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow cursor-pointer group">
            <div className="w-14 h-14 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>task_alt</span>
            </div>
            <div>
              <div className="text-sm text-gray-500 font-medium">Published Posts</div>
              <div className="text-3xl font-bold text-gray-900">{stats.posts.active}</div>
            </div>
          </div>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            <Link to="/admin/posts/create" className="p-4 rounded-xl bg-gray-50 hover:bg-indigo-50 text-gray-700 hover:text-indigo-600 transition-colors flex items-center gap-3 font-medium border border-gray-100">
              <span className="material-symbols-outlined">edit_square</span> Write a Post
            </Link>
            <Link to="/admin/users/create" className="p-4 rounded-xl bg-gray-50 hover:bg-blue-50 text-gray-700 hover:text-[#005daa] transition-colors flex items-center gap-3 font-medium border border-gray-100">
              <span className="material-symbols-outlined">person_add</span> Add New User
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};