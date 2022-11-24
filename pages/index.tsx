import type { GetServerSideProps } from "next";
import Head from "next/head";
import styles from "../styles/home.module.scss"
import { client } from "../lib/api/apolloClient";
import { getHomePageQuery } from "../lib/api/pages";
import { HomePageModel } from "../lib/models/homePageModel";
import { getSection } from "../lib/utils/sectionPicker";
import { ParallaxBanner } from "react-scroll-parallax";
import Image from "next/image";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import TextAnimation from '../lib/components/TextAnimation.js';
import { MyHead } from "../lib/components/myHead";
/* import { HowToHelpSection } from "../lib/components/Sections/HowToHelpSection/HowToHelpSection"; */


type Props = {
  data: HomePageModel;
};

const Home = ({ data }: Props) => {
  const renderBox = (mobile: boolean) => {
     return(

         <div className={styles.textHero}>
         <h1 className={styles.titleHero}><TextAnimation/></h1>
         {/* <h1 className={styles.titleHero}>{header}</h1> */}
         <h2>{subTitle}</h2>
         {introText?.json && documentToReactComponents(introText.json)}
         </div>
         )
     };


  const { header,subTitle, image, introText, seoMetadata } = data;


 console.log('HomeData', data)
  return (
      <>
        <MyHead
          title={seoMetadata.title}
          description={seoMetadata.description}
          ogTitle={seoMetadata.ogTitle ?? seoMetadata.title}
          ogDescription={seoMetadata.ogDescription ?? seoMetadata.description}
          ogImage={seoMetadata.ogImage}
          hidePage={seoMetadata.hidePage}
          excludeLinks={seoMetadata.excludeLinks}
        />
    <div className={styles.container}>

    <div className={styles.wrapper}>

{/*     <div className={styles.textHero}>
    <h1 className={styles.titleHero}>{header}</h1>
    {introText?.json && documentToReactComponents(introText.json)}


    </div> */}
             <div className={styles.imageWrapper} >
             <div className={styles.containerHeroMobile}>
                      <ParallaxBanner
                       className={styles.imageHeroMobile}
                         layers={[
                           { image: image?.url ?? "", speed: 2 },
                           { children: renderBox(true), speed: -65  },
                         ]}
                         style={{ height: "430px" }}

                       ></ParallaxBanner>
             </div>
                      <ParallaxBanner

                       className={styles.imageHeroDesktop}
                         layers={[
                           { image: image?.url ?? "", speed: 10 },
                           { children: renderBox(false), speed: 108  },
                         ]}
                         style={{ height: "100vh" }}

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

    </div>
       {/* RENDER SECTIONS */}
       {data.sectionsCollection.items.map((section: any) =>
        getSection(section.__typename, section.sys?.id)
        )}


    </>
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
