import { Footer } from "./Footer";
import { Header } from "./Header";
import { Main } from "./Main";
import './LayoutClient.scss'

export const LayoutClient = () => {
  return (
    <>
      <div className="layout-client">
        <Header />
        <Main />
        <Footer />
      </div>
    </>
  );
}