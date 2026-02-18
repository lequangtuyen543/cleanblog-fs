import { Footer } from "./Footer";
import { Header } from "./Header";
import { Main } from "./Main";
import './LayoutAuth.scss'

export const LayoutAuth = () => {
  return (
    <>
      <div className="layout-auth">
        <Header />
        <Main />
        <Footer />
      </div>
    </>
  );
}