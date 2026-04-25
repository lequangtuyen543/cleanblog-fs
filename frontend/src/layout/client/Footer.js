import { FacebookFilled, GithubFilled, TwitterCircleFilled, InstagramFilled } from '@ant-design/icons';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 py-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                C
              </div>
              <span className="text-xl font-bold text-white tracking-tight">CleanBlog</span>
            </Link>
            <p className="max-w-sm leading-relaxed">
              Nền tảng chia sẻ kiến thức công nghệ và đời sống hàng đầu. 
              Mang lại giá trị qua từng bài viết chất lượng.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-bold mb-6">Khám phá</h4>
            <ul className="space-y-4 text-sm">
              <li><Link to="/posts" className="hover:text-indigo-400 transition-colors">Bài viết mới</Link></li>
              <li><Link to="/categories" className="hover:text-indigo-400 transition-colors">Danh mục</Link></li>
              <li><Link to="/about" className="hover:text-indigo-400 transition-colors">Về chúng tôi</Link></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-white font-bold mb-6">Kết nối</h4>
            <div className="flex gap-4 text-2xl">
              <a href="#" className="hover:text-indigo-400 transition-colors"><FacebookFilled /></a>
              <a href="#" className="hover:text-indigo-400 transition-colors"><TwitterCircleFilled /></a>
              <a href="#" className="hover:text-indigo-400 transition-colors"><InstagramFilled /></a>
              <a href="#" className="hover:text-indigo-400 transition-colors"><GithubFilled /></a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          <p>&copy; {new Date().getFullYear()} Clean Blog. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};