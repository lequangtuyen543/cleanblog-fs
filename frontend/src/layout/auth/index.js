import { Footer } from "./Footer";
import { Header } from "./Header";
import { Main } from "./Main";
import './LayoutAuth.scss'

export const LayoutAuth = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />
      <div className="flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden transition-all hover:shadow-2xl">
          <Main />
        </div>
      </div>
      <Footer />
    </div>
  );
}