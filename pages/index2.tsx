/*
import type { GetServerSideProps } from "next";
import Head from "next/head";
import styles from "../styles/home.module.scss"
import { client } from "../lib/api/apolloClient";
import { getHomePageQuery } from "../lib/api/pages";
import { HomePageModel } from "../lib/models/homePageModel";
import { getSection } from "../lib/utils/sectionPicker";
import { Parallax } from "react-parallax";
import Image from "next/image";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import TextAnimation from '../lib/components/TextAnimation.js';
import { MyHead } from "../lib/components/myHead";



type Props = {
  data: HomePageModel;
};

const Home = ({ data }: Props) => {

  const { header,subTitle, image, introText, seoMetadata } = data;

  const insideStyles = {
    background: "black",
    padding: 20,
    position: "absolute",
    top: "70%",
    left: "50%",
    transform: "translate(-50%,-50%)"
  };


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

        <div>

        <Parallax bgImage={image.url} strength={500}>>
       <div style={{ height: 900 }}>

         <div style={insideStyles}>

         <h1 className={styles.titleHero}><TextAnimation/></h1>
         <h2>{subTitle}</h2>
         {introText?.json && documentToReactComponents(introText.json)}

         </div>
       </div>

        </Parallax>
        </div>

    <div className={styles.container}>


    <div className={styles.wrapper}>


{ */
/*     <div className={styles.textHero}>
    <h1 className={styles.titleHero}>{header}</h1>
    {introText?.json && documentToReactComponents(introText.json)}


    </div> *//*
}
             <div className={styles.imageWrapper} >


{ */
/*                <Image className={styles.imageHero}
                 src={image.url}
                 alt="HeroPhoto"
                 width="2700"
                 height="1700"
                 objectFit="contain"
                 loading="eager"
                 quality={100}
                 priority
               /> *//*
}
             </div>
             </div>

    </div>

       { */
/* RENDER SECTIONS *//*
}
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
 */
