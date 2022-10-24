import type { GetServerSideProps } from "next";
//import Head from "next/head";
import styles from "../styles/home.module.scss"
import { client } from "../lib/api/apolloClient";
import { getHomePageQuery } from "../lib/api/pages";
import { HomePageModel } from "../lib/models/homePageModel";
//import { getSection } from "../lib/utils/sectionPicker";
import { ParallaxBanner } from "react-scroll-parallax";
import Image from "next/image";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

//import { MyHead } from "../lib/components/myHead";

type Props = {
  data: HomePageModel;
};

const Home = ({ data }: Props) => {
  const renderBox = (mobile: boolean) => {
     return(

         <div className={styles.textHero}>
         <h1 className={styles.titleHero}>{header}</h1>
         {introText?.json && documentToReactComponents(introText.json)}
         </div>)
     };


  const { header, image, introText, seoMetadata } = data;


 console.log('Data', data)
  return (
    <section className={styles.container}>

    <div className={styles.wrapper}>

{/*     <div className={styles.textHero}>
    <h1 className={styles.titleHero}>{header}</h1>
    {introText?.json && documentToReactComponents(introText.json)}


    </div> */}
             <div className={styles.imageWrapper} >
                     <ParallaxBanner
                       className={styles.imageHero}
                         layers={[
                           { image: image?.url ?? "", speed: -2 },
                           { children: renderBox(false), speed: 30  },
                         ]}
                         style={{ height: "1100px" }}

                       ></ParallaxBanner>
{/*                <Image className={styles.imageHero}
                 src={image.url}
                 alt="HeroPhoto"
                 width="2700"
                 height="1700"
                 objectFit="contain"
                 loading="eager"
                 quality={100}
                 priority
               /> */}
             </div>
             </div>

    </section>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  const { data, error } = await client.query({
    query: getHomePageQuery(),
    variables: {
      locale: locale,
    },
  });

  let home = data.homePageCollection.items[0] ?? {};

  return {
    props: {
      data: home as HomePageModel,
    },
  };
};

export default Home;
