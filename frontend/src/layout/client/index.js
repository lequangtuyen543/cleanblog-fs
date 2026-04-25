import { Footer } from "./Footer";
import { Header } from "./Header";
import { Main } from "./Main";
import './LayoutClient.scss'

export const LayoutClient = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Main />
      </main>
      <Footer />
    </div>
  );
}