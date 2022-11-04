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

type Props = {
  data: LandingPageModel;
};

const LandingPageInfo =  ({ data }: Props) => {
  const { header, introText, heroImage, seoMetadata } = data;

   return (
      <>

            <div className={styles.container}>

              <div className={styles.textWrapper}>
              <h1 className={styles.header}>{header}</h1>

              <div className={styles.imageWrapper}>
                <Image
                 src={heroImage.url}
                 alt="HeroPhoto"
                 width="2700"
                 height="2700"
                 objectFit="contain"
                 loading="eager"
                 quality={100}
                 priority
                 className={styles.image}
                 />
                </div>
                <p className={styles.text}>{introText}</p>

              </div>

            </div>

            {/* RENDER SECTIONS */}
            {data.sectionsCollection.items.map((section: any) =>
             getSection(section.__typename, section.sys?.id)
             )}

      </>
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