import type { GetServerSideProps } from "next";
import { client } from "../lib/api/apolloClient";
import {createClient} from 'contentful';
import styles from "../styles/landingPage.module.scss";
import { LandingPageModel } from "../lib/models/landingPageModel";
import { getLandingPageQuery } from "../lib/api/pages";
import { getSection } from "../lib/utils/sectionPicker";
import Image from "next/image";
import { useEffect } from 'react';
import { useQuery } from "@apollo/client";
import { Parallax,  Background } from 'react-parallax';

type Props = {
  data: LandingPageModel;
};

const LandingPageInfo =  ({ data }: Props) => {
  const { header, introText, heroImage, seoMetadata } = data;

   return (

    <div className={styles.container} >
    <Parallax
      bgImage={heroImage.url}
      strength={75}
      renderLayer={(percentage) => (
        <div>
          <div
            style={{
              position: "absolute",
              background: `rgba(10, 10, 10, ${percentage * 20})`,
              opacity:"50%",
              left: "50%",
              top: "85%",
              borderRadius: "20%",
              transform: "translate(-50%,-50%)",
              width: percentage * 550,
              height: percentage * 100,
            }}
          />
        </div>
      )}
    >
      <div className={styles.image} >
        <div className={styles.insideStyles}><h1 className={styles.heroText}>{header}</h1></div>
      </div>
    </Parallax>
            {/* RENDER SECTIONS */}
            {data.sectionsCollection.items.map((section: any) =>
             getSection(section.__typename, section.sys?.id)
             )}
      </div>

  )
 };


 export const getServerSideProps: GetServerSideProps = async ({ locale, params }) => {
 console.log(params.slug)
  const { data, error } = await client.query({
    query: getLandingPageQuery(`${params.slug}`),
    variables: {
      locale: locale,
    },
  });

  let landing = data.landingPageCollection.items[0] ?? {};

  return {
    props: {
      data: landing as LandingPageModel,
    },
  };
};


export default  LandingPageInfo;