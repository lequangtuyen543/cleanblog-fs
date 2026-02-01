import aboutBg from '../../../assets/img/about-bg.jpg';
import { HeroItem } from '../../../components/HeroItem';

export const About = () => {
  return (
    <>
      <HeroItem title="About Me" subtitle="This is what I do." thumbnail={aboutBg} />

      <div className='container'>
        <div className="bg-white py-12 sm:py-16">
          <p className="whitespace-pre-line">
            {`
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Saepe nostrum ullam eveniet pariatur voluptates odit, fuga atque ea nobis sit soluta odio, adipisci quas excepturi maxime quae totam ducimus consectetur?

            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eius praesentium recusandae illo eaque architecto error, repellendus iusto reprehenderit, doloribus, minus sunt. Numquam at quae voluptatum in officia voluptas voluptatibus, minus!

            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aut consequuntur magnam, excepturi aliquid ex itaque esse est vero natus quae optio aperiam soluta voluptatibus corporis atque iste neque sit tempora!
          `}
          </p>
        </div>
      </div>
    </>
  );
};